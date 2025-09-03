# Contributing Guide — Dual AI Development

This project is designed for development with both **Claude Code** and **Codex**. This guide ensures consistent collaboration between AI assistants and human developers.

## 🎯 Project Approach

### Parallel Development Workflow
- **Read `.claude.json`** for lane ownership and branch confirmation rules
- **See `PARALLEL_DEVELOPMENT.md`** for complete workflow (now includes worktrees)
- **Use worktrees for parallel branches** (see `docs/WORKTREES.md`)
- **Work in assigned development lanes** to avoid conflicts
- **Use GitHub PRs** for cross-lane coordination

### Blueprint-Driven Development
- **Always reference blueprint docs** (01-30) for specifications
- Follow the **phased implementation plan** (12_Implementation_Plan.md)
- Use **30_Codex_Prompts.md** for common development tasks
- Check **agent roles** in 18_Agent_Orchestration.md for specialization

### Current Phase Status
- ✅ **Phase 0**: Foundation (Astro + AstroWind + schema)
- 🔄 **Phase 1**: Core content (songs index, detail pages, search)
- ⏳ **Phase 2**: Extended content (shows, events, press)

## 🤖 AI Assistant Guidelines

### For Claude Code
**Strengths**: File operations, git management, comprehensive analysis
- Use for complex multi-file refactoring
- Handle git operations and version control
- Manage dependencies and build processes
- Perform accessibility and performance audits
 - Confirm the target branch with the user before switching or committing
 - Prefer worktrees for simultaneous tasks; avoid juggling uncommitted changes

### For Codex
**Strengths**: Component implementation, rapid prototyping
- Use for individual component development
- Implement UI features and interactions
- Handle content ingestion scripts
- Build specific page templates
 - Confirm the current branch with the user; default to `main` unless stated

### Shared Responsibilities
Both assistants should:
- Reference blueprint documents before starting work
- Maintain existing code patterns and conventions
- Test changes with `npm run dev` and `npm run build`
- Follow the content model schema (04_Content_Model.md)
- Ensure accessibility and performance standards

## 📋 Development Workflow

### 1. Before Starting Work
```bash
# Check current status
git status
cd site && npm run dev

# Reference relevant blueprint docs
# - 01_Product_Vision.md for objectives
# - 08_Components_Spec.md for UI requirements
# - 07_Search_Spec.md for search features
```

Confirm branch status (Desktop or CLI)
- Desktop: ensure the branch selector shows `main` or the requested feature branch
- CLI: `git branch --show-current`

### 2. During Development
- **Follow existing patterns**: Check similar files for conventions
- **Use TypeScript**: Maintain type safety in `.astro` and `.ts` files
- **Test incrementally**: Verify changes in browser during development
- **Check collections**: Ensure content changes match `/src/content/config.ts`

### 3. After Changes
```bash
# Run quality checks
npm run check      # Astro + ESLint + Prettier
npm run build      # Verify build success

# Test search (if content changed)
npx pagefind --source dist

# Check performance
npm run build && npm run preview
# Open dev tools, check Lighthouse scores
```

### 4. GitHub Desktop Quick Flow
- Open GitHub Desktop → Confirm repository and branch
- Make changes → Commit with a clear message
- Push to origin
- For feature branches → Create Pull Request from Desktop → Merge when ready

See `docs/GIT_WORKFLOW_DESKTOP.md` for detailed, step-by-step instructions and definitions.
Also see `docs/DESKTOP_PROMPTING_POLICY.md` for when assistants should prompt the user with Desktop steps (short, explicit instructions).

## 🏗 Code Standards

### File Organization
```
site/src/
├── components/
│   ├── ui/              # Base UI components
│   ├── widgets/         # Page sections
│   └── common/          # Shared components
├── content/
│   ├── songs/          # Song MDX files
│   ├── shows/          # Show data
│   └── config.ts       # Schema definitions
├── pages/
│   ├── songs/          # Song-related pages
│   └── [...].astro     # Dynamic routes
└── utils/              # Helper functions
```

### Naming Conventions
- **Components**: PascalCase (`SongCard.astro`)
- **Pages**: kebab-case (`song-detail.astro`)
- **Content**: kebab-case slugs (`my-party-dress.mdx`)
- **Utilities**: camelCase (`getPermalink.ts`)

### Component Patterns
```typescript
// Astro component structure
---
export interface Props {
  song: Song;
  showFilters?: boolean;
}

const { song, showFilters = false } = Astro.props;
---

<article class="song-card">
  <!-- Component markup -->
</article>

<style>
  /* Component-scoped styles */
</style>
```

## 📄 Content Guidelines

### Song Content
```yaml
---
title: "Song Title"
slug: "url-friendly-slug"
voiceTypes: ["Soprano", "Alto", "Tenor", "Bass"]
keys:
  - { name: "F Major", range: "A3–C5", isOriginal: true }
moods: ["ballad", "up-tempo", "comic", "dramatic"]
published: true
---
```

### Required Fields
- `title`, `slug`, `voiceTypes`, `keys`, `published`
- See `05_Content_Collections.ts` for complete schema

### Optional Enhancements
- `media.youtubeId` for video embeds
- `sheetMusic.url` for purchase links
- `lyrics` for full searchable text
- `credits[]` for composer/lyricist info

## 🔍 Search Integration

### Adding Search to Pages
```javascript
// Import Pagefind UI
import { PagefindUI } from "@pagefind/default-ui";

// Initialize after page load
new PagefindUI({ 
  element: "#search",
  showImages: false 
});
```

### Content Indexing
- Songs are automatically indexed by Pagefind
- Add `data-pagefind-body` to searchable content
- Use `data-pagefind-filter` for faceted search

## 🎨 UI/UX Guidelines

### Design System
- **Colors**: Defined in `tailwind.config.js`
- **Typography**: Inter variable font
- **Icons**: Tabler icons via `astro-icon`
- **Components**: Follow AstroWind patterns

### Responsive Design
- **Mobile-first**: Start with mobile layouts
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch targets**: Minimum 44px for interactive elements

### Accessibility
- **Semantic HTML**: Use proper heading hierarchy
- **Alt text**: All images need descriptive alt text
- **Keyboard nav**: All interactive elements must be keyboard accessible
- **Color contrast**: Minimum 4.5:1 for normal text

## ⚡ Performance

### Core Web Vitals Targets
- **LCP**: < 2.5s (homepage, songs index)
- **INP**: < 200ms
- **CLS**: < 0.1

### Best Practices
- **Images**: Use `<Image>` component with optimization
- **Fonts**: Preload critical fonts
- **JavaScript**: Minimize client-side code
- **CSS**: Use Tailwind utilities, avoid custom CSS when possible

## 🚀 Deployment

### Pre-Deploy Checklist
- [ ] All builds successful (`npm run build`)
- [ ] Search index generated (`npx pagefind --source dist`)
- [ ] Performance scores acceptable (Lighthouse)
- [ ] Accessibility tests passing
- [ ] Content validation complete

### Environment Variables
```bash
# Production
PUBLIC_OFFLINE=false

# Development/staging
PUBLIC_OFFLINE=true
```

## 🐛 Troubleshooting

### Common Issues
1. **Build fails**: Check `src/content/config.ts` matches actual content
2. **Search not working**: Run `npx pagefind --source dist` after build
3. **Types errors**: Verify content frontmatter matches schema
4. **Performance issues**: Check image sizes and unused CSS

### Getting Help
1. Check blueprint docs (01-30) first
2. Review sample content in `06_Sample_Content/`
3. Use prompts from `30_Codex_Prompts.md`
4. Reference existing similar files for patterns

## 📝 Git Workflow

### Commit Messages
Follow conventional commits:
- `feat:` new features
- `fix:` bug fixes
- `docs:` documentation changes
- `style:` formatting changes
- `refactor:` code restructuring
- `chore:` maintenance tasks

### Before Committing
```bash
# Check what's changed
git status
git diff

# Run quality checks
npm run check

# Stage and commit
git add .
git commit -m "feat(songs): add song filtering by voice type"
```

This workflow ensures both AI assistants and human developers can collaborate effectively on the Bree Lowdermilk website project.
