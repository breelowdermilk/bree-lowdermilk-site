# Routing & SEO
## Slugs
- Songs: `/songs/{slug}`
- Shows: `/works/shows/{slug}`
- Recordings: `/works/recordings/{slug}`
- Events: `/events/{yyyy-mm-dd}-{slug}` (or stable slug)

## Canonicals & Social
- Each key page sets `<link rel="canonical">`.
- OG/Twitter cards with cover image, 1–2 line description.

## JSON‑LD
- Person: on Home & About (Bree).
- MusicRecording (or MusicComposition) on Song detail.
- Event on Event detail.
- Organization for press page if needed.

## Redirects
- Preserve legacy KL URLs where possible; map changes in `22_Redirects.txt`.
