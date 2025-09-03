# Git Workflow — GitHub Desktop Friendly

This guide explains, in plain language, how to safely work with Git in this repo using GitHub Desktop. It includes simple definitions, checklists, and step-by-step flows.

## Core Definitions
- **Commit**: A saved snapshot of your changes. Safe point you can return to.
- **Branch**: A named line of work. Keeps experiments separate from `main`.
- **Push**: Send your local commits to GitHub.
- **Pull**: Bring commits from GitHub down to your computer.
- **Pull Request (PR)**: A request to merge one branch into another on GitHub, with a chance to review changes first.
- **Stash**: A temporary shelf for uncommitted changes. Use only if you can’t commit yet; don’t forget to apply later.

## Golden Rules (Safety Checklist)
- Always commit before switching branches. If not ready, commit with a message like "wip: save progress".
- Never keep changes only in a stash for long; apply or commit soon after.
- Confirm which branch you’re on before making changes. Default working branch is `main` unless we agree otherwise for a feature.
- For parallel work on multiple tasks, prefer Git worktrees (see docs/WORKTREES.md) so each task has its own folder.

## Standard Flow — Edit on `main`
1) Open GitHub Desktop → Current repository: bree-lowdermilk-site
2) Current branch: `main` (confirm in the top bar)
3) Make changes in your editor
4) In Desktop: review the Changed files panel
5) Write a commit summary (e.g., "fix(hero): adjust dimensions") → Click "Commit to main"
6) Click "Push origin" to send the commit to GitHub

## Feature Flow — Use a Feature Branch
Use this when changes are significant or experimental.
1) Desktop → Branch menu → "New Branch"
   - Name: `feat/<short-name>` or `fix/<short-name>` (e.g., `feat/glightbox-media-gallery`)
   - Base branch: `main`
2) Click "Create Branch"
3) Make changes → Commit in Desktop (same as above)
4) Click "Publish branch" (first push) or "Push origin"
5) Click "Create Pull Request" (Desktop will open GitHub)
6) On GitHub, review the diff and click "Create pull request"
7) When ready, click "Merge pull request" (or ask for review first). This merges your feature into `main`.
8) Back in Desktop, switch back to `main` and click "Fetch origin" then "Pull origin"

## Switching Branches (Safely)
If Desktop says you have uncommitted changes:
- Preferred: Commit them (even as WIP). Then switch.
- Only if necessary: "Stash changes" → remember to apply later from the Branch menu "Stashes".

## Resolving Conflicts (High-Level)
When merging, if both branches changed the same lines, Desktop will show conflicts:
- Click each conflicted file → choose which changes to keep or edit the file to combine both.
- Mark as resolved → Commit merge → Push.
- If unsure, stop and ask for help before finalizing the merge.

## When To Open a PR
- Any feature branch that changes multiple files or adds dependencies.
- Any change you want to review before merging.

## Conventional Commit Messages (Short Cheatsheet)
- `feat(media): implement GLightbox for gallery`
- `fix(hero): reduce carousel width`
- `docs(workflow): add GitHub Desktop guide`

## Quick Recovery Tips
- Lost or overwritten? Check Git history: Desktop → History tab.
- Need an older version: Right‑click a file in the History → "Revert changes in commit".
- Stash lingering? Desktop → Branch → "View Stashes" → Apply or delete.

