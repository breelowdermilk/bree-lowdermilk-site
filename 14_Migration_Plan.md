# Migration Plan — WordPress → MDX
1) Export songs (CSV/JSON). Include: title, slug, show, voice types, keys, moods, lyric excerpt, sheet music URL, media IDs, credits, date.
2) Normalize values (voice types list, key names, ranges).
3) Script to write one `/src/content/songs/{slug}.mdx` per row.
4) Validate against Astro collection schema.
5) Spot‑check 20 songs; fix encoding (smart quotes, en‑dash).
6) Import remaining items; re‑build index; QA.
