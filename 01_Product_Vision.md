# Product Vision — BreeLowdermilk.com
**Who:** Bree Lowdermilk — songwriter/composer expanding into playwright/screenwriter/novelist (site centers songwriting).  
**Why now:** Consolidate work, make songs easy to discover (by voice type/keys/lyrics), streamline events/press, and reduce platform friction/costs.

## Objectives (North Stars)
1. **Song discovery feels effortless** — filter by voice type, range, show, mood; search by title/lyric.
2. **Press‑ready in two clicks** — EPK with bios (50/150/600), photos, selects, quotes, contact.
3. **Events auto‑update** — Bandsintown widget (or manual entries) + per‑event pages for SEO.
4. **Sheet music is obvious** — structured key/range info, outbound to NMT/Musicnotes where applicable.
5. **$0 infra, minimal debugging** — static site, Markdown content, zero DB, deploy on Cloudflare/Netlify.

## Success Criteria
- LCP < 2.5s on 4G, INP < 200ms, CLS < 0.1 (homepage & Songs index).
- 100% keyboard navigability; conforms to WCAG 2.2 AA critical checks.
- Songs index > 100 items searchable under 100ms client‑side.
- One‑hour content change SLA: edit MDX, push, CI deploys.
