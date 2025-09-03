# Implementation Plan (Phased)
## Phase 0 — Repo & Theme
- Create repo; add Astro + AstroWind starter.
- Add `/src/content/config.ts` with collections.
- Add `Pagefind` postbuild script.

## Phase 1 — Content & IA
- Create Songs MDX for 10 flagship songs.
- Build Songs index page with filters + Pagefind search.
- Build Song detail template.

## Phase 2 — Works, Events, Press
- Build Works (shows, recordings) templates.
- Add Events (manual MDX or Bandsintown widget page).
- Build EPK/Press page.

## Phase 3 — SEO, A11y, Perf
- Add JSON‑LD generators; OG templates.
- Run a11y/perf checks; fix regressions.

## Phase 4 — Migration
- Export legacy content → script → MDX.
- Add redirects; smoke test; go live.
