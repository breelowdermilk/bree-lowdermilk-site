# Git Worktrees — Parallel Branches, Separate Folders

Worktrees let you check out multiple branches at the same time, each in its own folder. This is the safest way to work on two tasks in parallel without mixing changes.

## Why Use Worktrees?
- Each task gets its own directory and branch
- Zero branch switching inside a single folder
- Claude/Codex can run in separate terminals without stepping on each other

## Create a Worktree (New Feature Branch)
Run these in the repo’s parent directory:

```bash
# From the repo root
cd /Users/breelowdermilk/Development/bree-lowdermilk-site

# Create a sibling folder for your feature branch (example)
git worktree add ../bree-site-glightbox -b feat/glightbox-media-gallery

# Now open the new folder
cd ../bree-site-glightbox
```

The new folder is a fully functional checkout on branch `feat/glightbox-media-gallery`.

## Use With GitHub Desktop
1) Desktop → File → Add Local Repository → Choose the new worktree folder (e.g., `../bree-site-glightbox`)
2) Desktop treats it like its own repo. Commit/push from there as usual.
3) You can keep Desktop open for multiple worktrees at once.

## Create a Worktree From Existing Branch
```bash
cd /Users/breelowdermilk/Development/bree-lowdermilk-site

git worktree add ../bree-site-formatting formatting-revisions
cd ../bree-site-formatting
```

## List and Remove Worktrees
```bash
# List active worktrees
git worktree list

# Remove when done (branch must be merged or no longer needed)
# Run from the main repo folder
git worktree remove ../bree-site-glightbox
```

## Tips
- Name folders clearly: `bree-site-<task>`
- Keep each worktree focused on a single branch
- Remove unused worktrees to avoid confusion

