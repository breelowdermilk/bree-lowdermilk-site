# bree-lowdermilk-site

Personal website for Bree Lowdermilk at **breelowdermilk.com**

## Tech Stack
- **Framework:** Astro 5 with AstroWind theme
- **Styling:** Tailwind CSS
- **Hosting:** GitHub Pages (via GitHub Actions)
- **Domain:** GoDaddy DNS → GitHub Pages

## Local Development
```bash
cd site
npm install
npm run dev     # localhost:4321
npm run build   # builds to site/dist/
```

## Deployment
Push to `main` triggers `.github/workflows/deploy.yml` which builds and deploys to GitHub Pages automatically.

## Key Files
| File | Purpose |
|------|---------|
| `site/src/config.yaml` | Site config (theme: light:only) |
| `site/src/pages/index.astro` | Homepage with FullBleedHero |
| `site/src/pages/shows/index.astro` | Shows page with GLightbox modals |
| `site/src/components/widgets/FullBleedHero.astro` | Hero component (mobile layout: title top, buttons bottom) |
| `site/public/CNAME` | Custom domain for GitHub Pages |

## Design Notes
- **Light mode only** - no dark mode toggle
- **Show modals:** Black text on white background, full poster images on mobile
- **Mobile hero:** Title/subtitle at top, photo in middle, buttons at bottom

## Mobile Testing
Use `/webapp-testing` skill with Playwright to test responsive layouts:
- **Viewports:** 320px (iPhone SE), 375px (iPhone 12), 414px (iPhone 12 Pro Max)
- **Key checks:** Hero photo not covered by buttons, tap targets ≥44px, modals readable
- Screenshots saved to `/tmp/mobile_screenshots/`
