# Codex Prompts (Copy/Paste)
## Initialize project
> Create an Astro project using the AstroWind starter. Add the files from this blueprint into the project. Wire `/src/content/config.ts` using `05_Content_Collections.ts`. Confirm `npm run dev` works.

## Build Songs index
> Implement `/src/pages/songs.astro` that lists all Song entries. Add `SongFilters` with client-side filtering by voiceTypes, moods, and show. Include a text input bound to Pagefind UI.

## Pagefind
> After build, run `npx pagefind --source dist`. Include Pagefind UI on `/songs`. Style the results to match SongCard.

## Song detail template
> Create `/src/pages/songs/[slug].astro` that renders key/range, media embeds, lyrics (accordion), sheet-music button, related songs.

## JSON‑LD
> Add per‑page JSON‑LD using templates in `23_JSONLD_Templates/`. Validate with Rich Results.

## Deployment
> Set up Cloudflare Pages (build: `npm run build`, out: `dist`). Ensure `dist/pagefind/` is deployed.
