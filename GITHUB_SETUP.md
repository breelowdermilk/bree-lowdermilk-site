# GitHub Setup Instructions

## Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right → "New repository"
3. **Repository name**: `bree-astro-website` (or your preferred name)
4. **Description**: "Bree Lowdermilk songwriter portfolio website built with Astro"
5. **Visibility**: Public or Private (your choice)
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click "Create repository"

## Step 2: Connect Your Local Repository

After creating the GitHub repository, you'll see a page with setup instructions. Use these commands:

```bash
# Add GitHub as remote origin
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push your existing commits to GitHub
git push -u origin main
```

Replace `YOUR_USERNAME` and `REPO_NAME` with your actual GitHub username and repository name.

## Step 3: Verify Setup

```bash
# Check that remote was added successfully
git remote -v

# Should show:
# origin  https://github.com/YOUR_USERNAME/REPO_NAME.git (fetch)
# origin  https://github.com/YOUR_USERNAME/REPO_NAME.git (push)
```

## Step 4: Future Workflow

After initial setup, your workflow will be:

```bash
# Make changes, then:
git add .
git commit -m "your commit message"
git push origin main
```

## Optional: Set Up GitHub Pages or Cloudflare Pages

### For GitHub Pages (if you want free hosting):
1. In your GitHub repo, go to Settings → Pages
2. Source: "GitHub Actions"
3. We'll need to add a workflow file for Astro builds

### For Cloudflare Pages (recommended):
1. Go to [Cloudflare Pages](https://pages.cloudflare.com)
2. Connect your GitHub repository
3. Build settings:
   - **Build command**: `cd site && npm run build`
   - **Build output directory**: `site/dist`
   - **Environment variable**: `PUBLIC_OFFLINE=false`

## Repository Structure After Setup

Your GitHub repository will contain:
- Complete project blueprint (01-30 markdown files)
- Astro website code (`/site/` directory)
- Migration data from legacy site
- Codex configuration (`.codex/instructions.md`)
- Documentation (`README.md`, `CONTRIBUTING.md`)

This setup enables both Claude Code and Codex to collaborate effectively on your website development.