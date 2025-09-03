# Environment & Deploy
## Local
- Node 18+, pnpm or npm.
- Scripts:
  - `dev`: `astro dev`
  - `build`: `astro build && npx pagefind --source dist`

## Cloudflare Pages
- Build command: `npm run build`
- Output directory: `dist`
- Ensure `dist/pagefind/` exists postbuild.

## Netlify
- Build command: `npm run build`
- Publish directory: `dist`
- Optional: add a `netlify.toml` with redirects.
