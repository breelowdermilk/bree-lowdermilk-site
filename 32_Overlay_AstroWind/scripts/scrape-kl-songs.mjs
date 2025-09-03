#!/usr/bin/env node
/**
 * scrape-kl-songs.mjs
 *
 * Crawls the Kerrigan–Lowdermilk Songs index and exports each song page to
 * Astro content MDX files under `src/content/songs/{slug}.mdx`, plus a CSV
 * summary at `migration/song_export_summary.csv`.
 *
 * Requirements (install in your Astro project):
 *   npm i -D puppeteer cheerio
 *
 * Usage:
 *   node scripts/scrape-kl-songs.mjs --start=https://example.com/songs \
 *       [--selector='a[href*="/songs/"]'] [--max=0]
 *
 * Environment:
 *   KL_START_URL  (optional alternative to --start)
 */

import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import url from 'node:url';
import process from 'node:process';
import puppeteer from 'puppeteer';
import cheerio from 'cheerio';

// ---------------------- Config ----------------------
const argv = Object.fromEntries(
  process.argv.slice(2).map(arg => {
    const m = arg.match(/^--([^=]+)=(.*)$/);
    return m ? [m[1], m[2]] : [arg.replace(/^--/, ''), true];
  })
);

const START_URL = argv.start || process.env.KL_START_URL || '';
if (!START_URL) {
  console.error('Missing --start URL or KL_START_URL');
  process.exit(1);
}

const SELECTOR_SONG_LINKS = argv.selector || 'a[href*="/song"], a[href*="/songs/"]';
const SAME_ORIGIN = argv.sameOrigin === 'false' ? false : true;
const MAX_PAGES = Number(argv.max || 0); // 0 = unlimited
const RATE_LIMIT_MS = 1000; // 1 req/sec
const PAUSE_EVERY = 40; // pages
const PAUSE_MS = 5000; // 5 seconds
const RETRIES = 3;
const USER_AGENT = argv.ua || 'Mozilla/5.0 (compatible; KL-Scraper/1.0; +https://example.com)';

// Optional site-specific selectors (override heuristics if provided)
const SEL = {
  title: argv.selTitle,
  show: argv.selShow,
  voices: argv.selVoices,
  keys: argv.selKeys,
  credits: argv.selCredits,
  sheet: argv.selSheet,
  date: argv.selDate,
  excerpt: argv.selExcerpt
};

const projectRoot = process.cwd();
const songsDir = path.join(projectRoot, 'src', 'content', 'songs');
const migrationDir = path.join(projectRoot, 'migration');
const csvPath = path.join(migrationDir, 'song_export_summary.csv');

// ---------------------- Utilities ----------------------
const sleep = (ms) => new Promise(res => setTimeout(res, ms));

function toKebabSlug(str) {
  return decodeURIComponent(String(str || ''))
    .trim()
    .toLowerCase()
    .replace(/[#?].*$/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getBasenameSlug(u) {
  try {
    const parsed = new URL(u);
    const parts = parsed.pathname.split('/').filter(Boolean);
    return toKebabSlug(parts[parts.length - 1] || '');
  } catch {
    return toKebabSlug(u.split('/').filter(Boolean).pop());
  }
}

function yamlString(val) {
  // Quote strings containing special chars, colon, or starting with special tokens
  if (val === null || val === undefined) return '""';
  const s = String(val);
  if (s === '' || /[:#\-]|^\s|\s$|["'`]|\n/.test(s)) {
    return '"' + s.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
  }
  return s;
}

function toYAML(obj, indent = 0) {
  const pad = '  '.repeat(indent);
  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]';
    return obj
      .map(item => {
        if (item && typeof item === 'object' && !Array.isArray(item)) {
          const lines = Object.entries(item)
            .filter(([, v]) => v !== undefined)
            .map(([k, v]) => `${'  '.repeat(indent + 1)}${k}: ${render(v, indent + 1, true)}`)
            .join('\n');
          return `${pad}-\n${lines}`;
        }
        return `${pad}- ${render(item, indent + 1, true)}`;
      })
      .join('\n');
  }
  if (obj && typeof obj === 'object') {
    const entries = Object.entries(obj).filter(([, v]) => v !== undefined);
    if (entries.length === 0) return '{}';
    return entries.map(([k, v]) => `${pad}${k}: ${render(v, indent)}`).join('\n');
  }
  return yamlString(obj);
}

function render(v, indent, inline = false) {
  if (Array.isArray(v)) return '\n' + toYAML(v, indent);
  if (v && typeof v === 'object') return '\n' + toYAML(v, indent + 1);
  return yamlString(v);
}

function writeCSVRow(stream, row) {
  const esc = (s) => {
    const v = s === undefined || s === null ? '' : String(s);
    if (/[",\n]/.test(v)) return '"' + v.replace(/"/g, '""') + '"';
    return v;
  };
  stream.write(row.map(esc).join(',') + '\n');
}

// Normalize helpers
const VOICE_ENUM = [
  'Soprano','Mezzo','Alto','Tenor','Baritone','Bass','Duet','Trio','Quartet','Ensemble','Mixed'
];
const VOICE_MAP = new Map([
  ['soprano','Soprano'], ['mezzo','Mezzo'], ['mezzo-soprano','Mezzo'], ['alto','Alto'],
  ['contralto','Alto'], ['tenor','Tenor'], ['baritone','Baritone'], ['bass','Bass'],
  ['duet','Duet'], ['trio','Trio'], ['quartet','Quartet'], ['ensemble','Ensemble'],
  ['mixed','Mixed']
]);

function normalizeVoiceTypes(arr) {
  const out = new Set();
  for (const a of (arr || [])) {
    const t = String(a || '').toLowerCase();
    for (const [k, v] of VOICE_MAP.entries()) {
      if (t.includes(k)) out.add(v);
    }
  }
  return Array.from(out).filter(v => VOICE_ENUM.includes(v));
}

function normalizeKeyName(name) {
  if (!name) return undefined;
  let s = String(name).trim();
  s = s.replace(/(major|minor)/ig, (m) => m[0].toUpperCase() + m.slice(1).toLowerCase());
  s = s.replace(/([A-G])b/g, '$1b').replace(/([A-G])#/g, '$1#');
  // Ensure the root letter is uppercased
  s = s.replace(/^([a-g])/, (m) => m.toUpperCase());
  // Append Major if only note provided
  if (/^[A-G](#|b)?$/.test(s)) s += ' Major';
  return s;
}

function extractYouTubeId($) {
  const iframe = $('iframe[src*="youtube.com"], iframe[src*="youtu.be"]').first().attr('src') || '';
  const link = $('a[href*="youtube.com"], a[href*="youtu.be"]').first().attr('href') || '';
  const src = iframe || link;
  const m1 = src.match(/[?&]v=([A-Za-z0-9_-]{6,})/);
  const m2 = src.match(/youtu\.be\/([A-Za-z0-9_-]{6,})/);
  const m3 = src.match(/embed\/([A-Za-z0-9_-]{6,})/);
  return (m1 && m1[1]) || (m2 && m2[1]) || (m3 && m3[1]) || undefined;
}

function extractSpotifyUrl($) {
  const src = $('iframe[src*="spotify"], a[href*="spotify"]').first().attr('src')
    || $('a[href*="spotify"]').first().attr('href');
  return src || undefined;
}

function deriveMoods($) {
  const txt = $('body').text().toLowerCase();
  const moods = [];
  const pushIf = (kw, label) => { if (txt.includes(kw)) moods.push(label); };
  pushIf('ballad', 'ballad');
  pushIf('up-tempo', 'up-tempo'); pushIf('uptempo', 'up-tempo');
  pushIf('comic', 'comic'); pushIf('funny', 'comic');
  pushIf('romantic', 'romantic'); pushIf('love song', 'romantic');
  return Array.from(new Set(moods));
}

function firstWords(text, min = 30, max = 60) {
  const words = String(text || '').split(/\s+/).filter(Boolean);
  const count = Math.max(min, Math.min(max, words.length));
  return words.slice(0, count).join(' ');
}

// ---------------------- Core ----------------------
async function withRetry(fn, tries = RETRIES) {
  let last;
  for (let i = 0; i < tries; i++) {
    try { return await fn(); } catch (e) { last = e; await sleep(500 * (i + 1)); }
  }
  throw last;
}

async function loadHtml(page, targetUrl) {
  await withRetry(async () => {
    await page.setUserAgent(USER_AGENT);
    await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 45_000 });
  });
  await sleep(RATE_LIMIT_MS);
  return await page.content();
}

function absolutize(href, base) {
  try { return new URL(href, base).toString(); } catch { return href; }
}

function collectSongLinks($, base) {
  const links = new Set();
  $(SELECTOR_SONG_LINKS).each((_, el) => {
    const href = $(el).attr('href');
    if (!href) return;
    const abs = absolutize(href, base);
    // Heuristic: avoid obvious non-detail links
    if (/\.(jpg|png|pdf|zip)$/i.test(abs)) return;
    try {
      const u = new URL(abs, base);
      if (SAME_ORIGIN && new URL(base).origin !== u.origin) return;
      links.add(u.toString().split('#')[0]);
    } catch {
      links.add(abs.split('#')[0]);
    }
  });
  return Array.from(links);
}

function extractDetail($, urlStr) {
  const title = (SEL.title ? $(SEL.title).first().text().trim() : '') || $('h1').first().text().trim() || $('title').text().trim();
  const slug = getBasenameSlug(urlStr);

  // Show: try labeled fields or nearby meta
  let show = SEL.show ? $(SEL.show).first().text().trim() : $('*[class*="show" i]').first().text().trim();
  if (!show) {
    const label = $('*').filter((_, e) => /show\s*:/.test($(e).text().toLowerCase())).first().text();
    const m = label && label.match(/show\s*:\s*(.+)/i);
    if (m) show = m[1].trim();
  }

  // Voice types
  const voiceCandidates = [];
  const voiceScope = SEL.voices ? $(SEL.voices) : $('[class*="voice" i], [class*="vocal" i], li, p');
  voiceScope.each((_, el) => {
    const t = $(el).text();
    if (/soprano|mezzo|alto|contralto|tenor|baritone|bass|duet|trio|quartet|ensemble/i.test(t)) {
      voiceCandidates.push(t);
    }
  });
  const voiceTypes = normalizeVoiceTypes(voiceCandidates);

  // Keys + ranges
  const keys = [];
  const keyScope = SEL.keys ? $(SEL.keys) : $('[class*="key" i], li, p');
  keyScope.each((_, el) => {
    const t = $(el).text();
    const keyMatch = t.match(/\b([A-G](?:#|b)?)(?:\s*(Major|Minor))?\b(?:.*?([A-G][0-8]?\s*[–-]\s*[A-G][0-8]?))?/i);
    if (keyMatch) {
      const name = normalizeKeyName(`${keyMatch[1]} ${keyMatch[2] || 'Major'}`.trim());
      const range = keyMatch[3] ? keyMatch[3].replace(/\s+/g, '') : undefined;
      if (name) keys.push({ name, range });
    }
  });

  // Sheet music URLs
  let sheetMusicUrl = SEL.sheet ? $(SEL.sheet).first().attr('href') : $('a[href*="newmusicaltheatre" i], a[href*="musicnotes" i]').first().attr('href');
  if (!sheetMusicUrl) {
    sheetMusicUrl = $('a').filter((_, a) => /sheet\s*music/i.test($(a).text())).first().attr('href');
  }

  // Media
  const youtubeId = extractYouTubeId($);
  const spotifyUrl = extractSpotifyUrl($);

  // Credits
  const credits = [];
  const creditScope = SEL.credits ? $(SEL.credits) : $('p, li');
  creditScope.each((_, el) => {
    const t = $(el).text().trim();
    if (/music\s+by\s+/i.test(t) || /lyrics\s+by\s+/i.test(t)) credits.push(t);
  });

  // Date
  let date;
  const dateMatch = SEL.date ? $(SEL.date).first().text() : $('time').first().attr('datetime') || $('time').first().text();
  if (dateMatch) date = String(dateMatch).trim();

  // Lyric excerpt — take first substantial paragraph
  let lyricExcerpt;
  const paraScope = SEL.excerpt ? $(SEL.excerpt) : $('p');
  const paras = paraScope.map((_, el) => $(el).text().trim()).get().filter(Boolean);
  if (paras.length) lyricExcerpt = firstWords(paras[0], 30, 60);

  const moods = deriveMoods($);

  const out = {
    title,
    slug,
    show: show || undefined,
    voiceTypes,
    keys,
    moods,
    lyricExcerpt,
    sheetMusic: sheetMusicUrl ? { url: sheetMusicUrl } : undefined,
    media: (youtubeId || spotifyUrl) ? { youtubeId, spotifyUrl } : undefined,
    credits,
    date
  };
  return out;
}

function buildMDX(frontmatter) {
  const fm = toYAML(frontmatter);
  const body = [];
  if (frontmatter.media?.youtubeId) {
    body.push(`\n<YouTube id="${frontmatter.media.youtubeId}" />\n`);
  }
  if (frontmatter.lyricExcerpt) {
    body.push(`\n> ${frontmatter.lyricExcerpt}\n`);
  }
  return `---\n${fm}\n---\n${body.join('\n')}\n`;
}

async function ensureDirs() {
  await fsp.mkdir(songsDir, { recursive: true });
  await fsp.mkdir(migrationDir, { recursive: true });
}

async function writeIfChanged(filePath, content) {
  try {
    const prev = await fsp.readFile(filePath, 'utf8');
    if (prev === content) return false; // unchanged
  } catch {}
  await fsp.writeFile(filePath, content, 'utf8');
  return true;
}

async function main() {
  await ensureDirs();
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setUserAgent(USER_AGENT);

  console.log('Start:', START_URL);
  const html = await loadHtml(page, START_URL);
  const $ = cheerio.load(html);
  let links = collectSongLinks($, START_URL);

  // Optional: try to find pagination "Next" once, then merge links
  const nextHref = $('a[rel="next"], a:contains("Next")').first().attr('href');
  if (nextHref) {
    const nextUrl = absolutize(nextHref, START_URL);
    try {
      const html2 = await loadHtml(page, nextUrl);
      const $2 = cheerio.load(html2);
      links = Array.from(new Set([...links, ...collectSongLinks($2, nextUrl)]));
    } catch {}
  }

  if (MAX_PAGES > 0) links = links.slice(0, MAX_PAGES);
  console.log(`Found ${links.length} candidate song links`);

  const csv = fs.createWriteStream(csvPath, { flags: 'w' });
  writeCSVRow(csv, ['slug','title','show','voiceTypes','keys','moods','sheetMusic.url','youtubeId','spotifyUrl','date','url']);

  let count = 0;
  for (const link of links) {
    try {
      const detailHtml = await loadHtml(page, link);
      const $d = cheerio.load(detailHtml);
      const data = extractDetail($d, link);
      const fm = {
        title: data.title,
        slug: data.slug,
        show: data.show,
        voiceTypes: data.voiceTypes || [],
        keys: (data.keys || []).map(k => ({ name: k.name, range: k.range })),
        moods: data.moods || [],
        lyricExcerpt: data.lyricExcerpt,
        sheetMusic: data.sheetMusic,
        media: data.media,
        credits: data.credits || [],
        date: data.date,
        published: true
      };
      const mdx = buildMDX(fm);
      const outPath = path.join(songsDir, `${data.slug || getBasenameSlug(link)}.mdx`);
      const changed = await writeIfChanged(outPath, mdx);
      if (changed) console.log('Wrote', outPath); else console.log('Unchanged', outPath);

      writeCSVRow(csv, [
        fm.slug,
        fm.title,
        fm.show || '',
        (fm.voiceTypes||[]).join('|'),
        (fm.keys||[]).map(k => k.name + (k.range ? ` (${k.range})` : '')).join('|'),
        (fm.moods||[]).join('|'),
        fm.sheetMusic?.url || '',
        fm.media?.youtubeId || '',
        fm.media?.spotifyUrl || '',
        fm.date || '',
        link
      ]);

      count++;
      if (count % PAUSE_EVERY === 0) {
        console.log(`Polite pause ${PAUSE_MS}ms after ${count} pages...`);
        await sleep(PAUSE_MS);
      }
    } catch (e) {
      console.warn('Failed to process', link, e?.message || e);
    }
  }
  csv.end();
  await browser.close();
  console.log(`Done. Processed ${count} pages. CSV: ${csvPath}`);
}

main().catch(err => { console.error(err); process.exit(1); });
