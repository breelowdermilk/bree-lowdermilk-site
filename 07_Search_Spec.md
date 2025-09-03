# Search Spec — Pagefind
**Goal:** Full‑text search over titles, lyric excerpts (or full lyrics), shows, moods, voice types — with no external service.

## Integration
1. Build site: `npm run build` → outputs `/dist`.
2. Postbuild index: `npx pagefind --source dist`.
3. Copy `dist/pagefind` assets to the deploy output (Cloudflare/Netlify will serve them).

## UI
- Include Pagefind UI script on **/songs** and **/press** pages.
- Search box with placeholder “Search songs by title or lyric…”.
- Results show: Title → Show → Voice types → Key list → pill for Mood(s).

## Indexing Choices
- If you include **full lyrics** in MDX body, they’ll be indexed automatically.
- If lyrics are private, keep `lyricExcerpt` in front‑matter and render it visibly on the page (still searchable).

## Perf Targets
- First keystroke to results < 150ms on desktop, < 300ms on mid‑range mobile.
