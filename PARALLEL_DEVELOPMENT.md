# Parallel Development Workflow - Claude Code & Codex

This document explains how Claude Code and Codex will collaborate using GitHub-based parallel processing with development "lanes."

## 🚀 Overview

The `.claude.json` configuration enables both AI assistants to work simultaneously on different parts of the website without conflicts, using separate Git branches and file ownership rules.

## 🛤️ Development Lanes

### Lane 1: `infra-nav-home`
- **Branch**: `feat/infra-nav-home` 
- **Goal**: Core site functionality, navigation, and homepage
- **Owns**: 
  - `site/src/navigation.ts` - Main navigation structure
  - `site/src/config.yaml` - Site configuration
  - `site/src/pages/index.astro` - Homepage
- **Cannot Touch**: Package files (to avoid dependency conflicts)

### Lane 2: `theme-foundation`
- **Branch**: `feat/theme-foundation`
- **Goal**: Visual styling, colors, typography, component styles
- **Owns**:
  - `site/tailwind.config.js` - Tailwind configuration
  - `site/src/assets/styles/tailwind.css` - Custom styles
  - `site/src/components/CustomStyles.astro` - Style components
- **Cannot Touch**: Navigation or config files

### Lane 3: `shows-pages`
- **Branch**: `feat/shows-pages`
- **Goal**: Display existing show content with list and detail views
- **Owns**:
  - `site/src/pages/shows/index.astro` - Shows listing page
  - `site/src/pages/shows/[slug].astro` - Individual show pages
- **Can Add Files**: Yes (show-related components/styles)
- **Cannot Touch**: Core navigation/config

### Lane 4: `media-page`
- **Branch**: `feat/media-page`
- **Goal**: Media page with audio/video players
- **Owns**:
  - `site/src/pages/media.astro` - Media page
  - `site/src/components/media/**` - Media components
  - `site/src/data/media/**` - Media data
- **Can Add Files**: Yes (media-related files)
- **Cannot Touch**: Core navigation/config

## 🔒 File Protection Rules

### Shared Protected Files
- `site/package.json` - Dependencies (no new packages allowed)
- `site/package-lock.json` - Lock file
- `.codex/config.json` - Contains GitHub token (ignored by git)

### Lane Boundaries
- Each AI assistant must only modify files in their assigned lane
- If a task requires touching a protected file, create a PR comment instead
- Cross-lane coordination happens through GitHub PR reviews

## 🤖 AI Assistant Coordination

### Claude Code Specializations
- Complex multi-file refactoring
- Git management and branch coordination
- Build process and dependency management
- Performance and accessibility audits

### Codex Specializations  
- Individual component implementation
- UI/UX feature development
- Content integration scripts
- Rapid prototyping

### GitHub Polling Strategy
- Both assistants can poll GitHub for PR updates
- Use PR comments to coordinate cross-lane changes
- Merge PRs only after review checklist completion

## ✅ Review Checklist (Before Merging)

For every PR, verify:
- [ ] **Only lane-owned files changed**
- [ ] **`npm run build` passes** (in site/ directory)
- [ ] **`npm run check` clean** (or issues fixed)
- [ ] **No new dependencies added**
- [ ] **Routes load properly**: `/`, `/shows`, `/media` as applicable
- [ ] **Follows conventional commit style**

## 🚦 Development Policies

### Code Quality
- **Format on save**: Prettier formatting required
- **Run checks before commit**: ESLint, TypeScript, Astro validation
- **No new dependencies**: Use existing packages only
- **Security**: No secrets in repo (protected by .gitignore)

### Content Guidelines  
- **Scaffolding only**: This phase focuses on structure, not content
- **Use existing assets**: Images from `site/src/assets/images/`
- **Simple players**: Prefer native `<audio>`/`<video>` or existing `YouTube.astro`
- **No player dependencies**: Avoid adding media player libraries

## 🔄 Workflow Steps

### 1. Lane Assignment
1. Choose an available development lane
2. Create and checkout the lane's feature branch
3. Work only on files within lane ownership

### 2. Development Process
```bash
# Navigate to project
cd site/

# Start development server
npm run dev

# Make changes (only to owned files)
# ...

# Run quality checks
npm run check

# Commit with conventional style
git commit -m "feat(nav): add songs navigation link"
```

### 3. PR Creation
1. Push branch to GitHub
2. Open Pull Request
3. Run through review checklist
4. Request review if cross-lane coordination needed

### 4. Integration
1. Merge approved PRs to main
2. Other lanes can then pull latest main
3. Continue development in parallel

## 🎯 Current Phase Goals

**Scaffolding Phase** - Focus on:
- ✅ Runnable Astro site
- ✅ Proper navigation structure  
- ✅ Basic styling framework
- ✅ Show content display
- ✅ Media page foundation

**Not in scope**:
- Content writing/creation
- Complex media players
- Advanced interactions
- Performance optimization (comes later)

This parallel workflow enables rapid, conflict-free development while maintaining code quality and project coherence.