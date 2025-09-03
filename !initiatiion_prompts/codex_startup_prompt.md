# Codex Startup Prompt — Bree Lowdermilk Site

You are an AI coding assistant working in the repo `bree-lowdermilk-site`. The main web app lives in `site/` and uses Astro 5 + Tailwind with the AstroWind template.

## What To Know First

- Framework: Astro 5 (static), Tailwind, AstroWind.
- Key config: `site/astro.config.ts`, `site/src/config.yaml` (injects SITE, SEO via vendor integration).
- Content model: Astro Content Collections in `site/src/content` (shows, songs, recordings, events, press). Blog posts are in `site/src/data/post`.
- Theming: Tailwind + custom CSS `site/src/assets/styles/bree-theme.css` imported by the base `Layout.astro`.
- Routing: Pages under `site/src/pages`. Dynamic routes exist for `shows/[slug]` and `songs/[slug]`.
- Media: `site/src/pages/media.astro` with components under `site/src/components/media/*` and data under `site/src/data/media/*`.

## Current Focus (Do This)

- Media page UX polish: `site/src/pages/media.astro`, `site/src/components/media/*`, `site/src/data/media/*`.
- Shows pages polish: `site/src/pages/shows/index.astro`, `site/src/pages/shows/[slug].astro`, content in `site/src/content/shows`.
- Accessibility and performance improvements for Media/Shows.
- SEO cleanups (titles/descriptions/OG, JSON‑LD canonical URLs).

## Deferred (Do NOT Do Now)

- Any “songs database” or backend work (songs use MDX; no DB).
- Search UI integration (Pagefind) or search research.
- Events/Bandsintown integration, EPK/Press buildout.
- Blog migration/polish beyond trivial fixes.

## Git Policy (Important)

- Always create a feature branch; never commit directly to `main`.
- Branch names: `feat/<topic>`, `fix/<topic>`, `docs/<topic>`.
- Open a PR to `main` for every change; prefer squash merge after review.

## Quick Orientation

- Layouts: `site/src/layouts/Layout.astro`, `PageLayout.astro`.
- Navigation: `site/src/navigation.ts`.
- Permalinks/SEO utils: `site/src/utils/permalinks.ts`.
- JSON‑LD: `site/src/lib/jsonld/*` (uses `getCanonical` for absolute URLs).
- Static assets: `site/public/*` (images live here if not imported).

## First Checks

1) Domain: In `site/src/config.yaml`, set `site.site` to the real production domain before deploy.
2) Media CSS: Base layout already imports `bree-theme.css` (don’t add extra links).
3) JSON‑LD: Validate that `song.ts` and `event.ts` use `getCanonical` (already updated).
4) Run quality checks: `cd site && npm run check && npm run build`.

## Guardrails

- Keep changes minimal and targeted; do not introduce new dependencies.
- Follow existing code patterns and content schemas.
- Ensure no new console errors; prioritize a11y and performance.

## Hand‑Off Status

- Current branch policy enforced in docs; PR template in `.github/pull_request_template.md`.
- Implementation plan prioritizes Media & Shows; Songs/Search are deferred.

Proceed to review the Media components and Shows pages, fix any a11y/perf issues, and keep scope within the items above until instructed otherwise.

