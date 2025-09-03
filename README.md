# bree-lowdermilk-site
Bree Lowdermilk's Personal Website
# Bree Lowdermilk — Website Project

A songwriter-forward portfolio website built with Astro and AstroWind, designed to make songs easily discoverable by voice type, range, show, mood, and lyrics.

## 🎵 Project Vision

- **Song discovery feels effortless** — filter by voice type, range, show, mood; search by title/lyric
- **Press-ready in two clicks** — EPK with bios, photos, selects, quotes, contact
- **Events auto-update** — Bandsintown integration + SEO-friendly event pages
- **Sheet music is obvious** — structured key/range info with links to retailers
- **$0 infrastructure** — static site, Markdown content, deploy on Cloudflare/Netlify

## 🚀 Tech Stack

- **Framework**: [Astro 5.0](https://astro.build/) (static site generation)
- **Theme**: [AstroWind](https://github.com/onwidget/astrowind) (MIT)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Content**: MDX with structured frontmatter
- **Search**: [Pagefind](https://pagefind.app/) for fast client-side search
- **Hosting**: Cloudflare Pages or Netlify

## 📁 Project Structure

```
├── site/                    # Main Astro website
│   ├── src/
│   │   ├── content/        # Content collections (songs, shows, etc.)
│   │   ├── pages/          # Page routes
│   │   ├── components/     # Reusable components
│   │   └── layouts/        # Page layouts
│   ├── public/             # Static assets
│   └── dist/               # Built site (after npm run build)
├── migration/              # Legacy data from previous site
├── 06_Sample_Content/      # Example MDX templates
├── 23_JSONLD_Templates/    # SEO structured data
├── 31_Code_Snippets/       # Reusable component code
└── 01-30_*.md             # Complete project blueprint
```

## 🛠 Development Setup

### Prerequisites
- Node.js 18.17.1+ or 20.3.0+ or 21.0.0+
- npm or yarn

### Quick Start
```bash
# Clone and navigate to project
cd site/

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:4321
```

### Available Scripts
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run check        # Run Astro + ESLint + Prettier checks
npm run lint         # Check code style
npm run format       # Fix code formatting
```

### Search Setup (Post-Build)
```bash
# After building, generate search index
npm run build
npx pagefind --source dist
```

## 📝 Content Management

### Adding Songs
Create MDX files in `site/src/content/songs/`:

```mdx
---
title: "Song Title"
slug: "song-title"
show: "Show Name"
voiceTypes: ["Soprano", "Mezzo"]
keys:
  - { name: "F Major", range: "A3–C5", isOriginal: true }
  - { name: "G Major", range: "B3–D5" }
moods: ["ballad", "dramatic"]
tempoBpm: 120
lyricExcerpt: "Opening line of the song..."
media:
  youtubeId: "videoId"
  spotifyUrl: "https://open.spotify.com/..."
sheetMusic:
  provider: "NewMusicalTheatre"
  url: "https://newmusicaltheatre.com/..."
credits:
  - "Music by Bree Lowdermilk"
  - "Lyrics by [Lyricist Name]"
coverImage: "/images/songs/song-title.jpg"
date: "2023-01-01"
published: true
---

Song description and additional content here.

<YouTube id="videoId" />
```

### Content Collections
- **Songs** (`/songs/`): Individual song entries with metadata
- **Shows** (`/shows/`): Musical productions
- **Recordings** (`/recordings/`): Albums, EPs, singles
- **Events** (`/events/`): Performance dates and venues

See `04_Content_Model.md` for complete schema specifications.

## 🎯 Performance Goals

- **LCP** < 2.5s on 4G
- **INP** < 200ms
- **CLS** < 0.1
- **Accessibility**: WCAG 2.2 AA compliance
- **Search**: 100+ songs searchable under 100ms

## 📋 Implementation Phases

### Phase 0 ✅ — Foundation
- ✅ Astro + AstroWind setup
- ✅ Content collections schema
- ✅ Pagefind integration ready

### Phase 1 🔄 — Core Content
- ✅ Songs index page with filtering
- ✅ Song detail template
- 🔄 10+ flagship songs added
- 🔄 Search UI integration

### Phase 2 ⏳ — Extended Content
- ⏳ Shows and recordings pages
- ⏳ Events integration (Bandsintown)
- ⏳ Press kit / EPK page

### Phase 3 ⏳ — Polish
- ⏳ JSON-LD structured data
- ⏳ Performance optimization
- ⏳ Accessibility audit

### Phase 4 ⏳ — Launch
- ⏳ Content migration
- ⏳ URL redirects
- ⏳ Go live

## 🤖 AI Development

This project is designed for dual development with both **Claude Code** and **Codex**:

- Blueprint documents (01-30) provide complete specifications
- Ready-to-use prompts in `30_Codex_Prompts.md`
- Agent roles defined in `18_Agent_Orchestration.md`
- See `CONTRIBUTING.md` for AI workflow guidelines

## 🚀 Deployment

### Cloudflare Pages (Recommended)
```bash
# Build command
npm run build

# Output directory
dist

# Environment variables
PUBLIC_OFFLINE=false
```

### Netlify
```bash
# Build command
npm run build && npx pagefind --source dist

# Publish directory
dist
```

## 📖 Documentation

- **Product Vision**: `01_Product_Vision.md`
- **Content Model**: `04_Content_Model.md` + `05_Content_Collections.ts`
- **Component Specs**: `08_Components_Spec.md`
- **SEO Strategy**: `09_Routing_SEO_Spec.md`
- **Search UX**: `07_Search_Spec.md`
- **Performance**: `10_A11y_Perf_Spec.md`

## 🆘 Support

For questions about implementation, refer to:
1. Blueprint documents (01-30)
2. `30_Codex_Prompts.md` for common tasks
3. Sample content in `06_Sample_Content/`
4. Code examples in `31_Code_Snippets/`

## 📄 License

This project uses the AstroWind theme under MIT license. See `site/LICENSE.md` for details.