Overlay for AstroWind: Content, Pages, and Search

This overlay contains ready-to-copy files to drop into a fresh AstroWind project.

How to apply
- Copy `src/` from this folder into your Astro project root.
- Merge package scripts: add `"postbuild": "pagefind --source dist"` to `package.json`.
- Build then index search: `npm run build` (postbuild runs Pagefind).

Included
- `src/content/config.ts` — Astro content collections (songs, shows, recordings, events, press).
- `src/content/songs/*` — sample MDX songs (from blueprint).
- `src/components/*` — `SongCard`, `SongFilters`, `YouTube` helper.
- `src/pages/songs/index.astro` — Songs index with Pagefind UI hook and basic listing.
- `src/pages/songs/[slug].astro` — Song detail with JSON-LD and media block.
- `package.scripts.snippet.json` — `postbuild` script for Pagefind.
- `tools/normalize-images.mjs` — copy + sanitize image filenames into `public/images`.
 - `src/pages/press.astro` — Simple EPK page using `src/data/press.ts`.
 - `src/data/press.ts` — Press hero/headshots/bios, download link, JSON-LD data.
 - `scripts/scrape-kl-songs.mjs` — Puppeteer + Cheerio scraper to export KL songs to MDX.

Notes
- On `dev`, Pagefind assets (`/pagefind`) aren’t present; search UI is for built site.
- The sample songs expect `/images/songs/...` to exist or can be removed.

Images
- Put site images under `public/images/` in your Astro project.
- To copy from your blueprint folder (e.g. `33_images`) and normalize names:
  - `node tools/normalize-images.mjs --src=/absolute/path/to/33_images --dest=/absolute/path/to/astro-project/public/images`
  - Check the generated `image-map.json` (next to `public/`) for the final public paths to use in content/components.

Press Kit
- Add your EPK ZIP to `public/press/Bree-Lowdermilk-PressKit.zip` in your Astro project.
- Update `src/data/press.ts` with final bios, contact email, and social links.

Scraper (KL songs → MDX)
- Install deps in your Astro project: `npm i -D puppeteer cheerio`
- Copy `scripts/scrape-kl-songs.mjs` into your project `scripts/`
- Run: `node scripts/scrape-kl-songs.mjs --start="<KL Songs index URL>"`
  - Optional: `--selector='a[href*="/songs/"]'` to help link discovery
  - Optional: `--max=50` to cap pages
- Output:
  - MDX: `src/content/songs/{slug}.mdx`
  - CSV: `migration/song_export_summary.csv`
