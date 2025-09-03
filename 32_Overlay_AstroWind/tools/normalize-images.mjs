#!/usr/bin/env node
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';

function sanitizeName(name) {
  const ext = path.extname(name).toLowerCase();
  const base = path.basename(name, path.extname(name))
    .toLowerCase()
    .replace(/&/g, ' ')
    .replace(/[_\s]+/g, '-')
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$|/g, '');
  return `${base}${ext}`;
}

function classify(name) {
  const n = name.toLowerCase();
  if (n.includes('headshot')) return 'press';
  if (n.includes('friends') || n.includes('piano') || n.includes('live')) return 'gallery';
  return 'gallery';
}

async function main() {
  const args = Object.fromEntries(process.argv.slice(2).flatMap(a => {
    const m = a.match(/^--([^=]+)=(.*)$/);
    return m ? [[m[1], m[2]]] : [];
  }));
  const src = args.src;
  const dest = args.dest;
  if (!src || !dest) {
    console.error('Usage: node tools/normalize-images.mjs --src=/path/33_images --dest=/path/astro/public/images');
    process.exit(1);
  }
  const files = (await fsp.readdir(src)).filter(f => !f.startsWith('.'));
  const mapping = [];
  for (const file of files) {
    const abs = path.join(src, file);
    const stat = await fsp.stat(abs);
    if (!stat.isFile()) continue;
    const bucket = classify(file);
    const safe = sanitizeName(file);
    const outDir = path.join(dest, bucket);
    const outPath = path.join(outDir, safe);
    await fsp.mkdir(outDir, { recursive: true });
    await fsp.copyFile(abs, outPath);
    mapping.push({ source: abs, target: outPath, publicPath: `/images/${bucket}/${safe}` });
  }
  const mapPath = path.join(dest, '..', 'image-map.json');
  await fsp.writeFile(mapPath, JSON.stringify(mapping, null, 2));
  console.log(`Copied ${mapping.length} images.`);
  console.log(`Wrote mapping to ${mapPath}`);
}

main().catch(err => { console.error(err); process.exit(1); });

