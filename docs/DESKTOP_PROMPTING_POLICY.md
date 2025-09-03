# GitHub Desktop Prompting Policy (For Assistants)

Purpose: Define when and how assistants should prompt the user to perform actions in GitHub Desktop. These are user instructions, not internal AI steps.

## When To Prompt (Triggers)
- Branch confirmation: Before editing files or switching branches.
- Branch switch: Any time a branch change is needed (use worktrees when parallel tasks are active).
- First save: When it’s time to make the first commit in a session.
- Push: After committing changes locally and they need to reach GitHub.
- Pull Request: When a feature branch is ready for review/merge, or when dependency changes occur.
- Merge conflicts: If a merge/rebase reports conflicts that require manual resolution.
- Stash present: If Desktop/CLI indicates uncommitted changes during branch switch; prefer committing, otherwise stash with explicit re‑apply.
- Destructive operations: Before rebases, resets, or deleting branches.

## Prompt Style (How To Say It)
- Keep it short (1–2 sentences) and explicit about the action.
- Name the exact branch and repo the user should select.
- Use clear verbs: “Open GitHub Desktop → Switch to … → Commit … → Push …”.
- Link to `docs/GIT_WORKFLOW_DESKTOP.md` for full steps if needed.

## Prompt Templates (Copyable)
- Branch check: “Open GitHub Desktop and confirm the current branch is `main` (top bar). If not, switch to `main` now.”
- Switch branch: “Open GitHub Desktop → Branch selector → Switch to `feat/glightbox-media-gallery`. If prompted about uncommitted changes, commit them as ‘wip’ before switching.”
- Commit: “In GitHub Desktop, review changes → Write ‘feat(media): implement GLightbox for gallery’ → Click ‘Commit’.”
- Push: “Click ‘Push origin’ in GitHub Desktop to sync your commits to GitHub.”
- Create PR: “In GitHub Desktop, click ‘Create Pull Request’ for `feat/media-wip` → On GitHub, review and ‘Create pull request’.”
- Merge PR: “On GitHub, click ‘Merge pull request’, then back in Desktop switch to `main` and ‘Pull origin’.”
- Resolve conflicts: “GitHub Desktop shows conflicts → Open each file → choose changes or edit to combine → Mark resolved → Commit merge → Push.”
- Stash (only if needed): “Desktop prompts about uncommitted changes → Choose ‘Stash changes’, switch branches, then ‘Apply stash’ right after.”

## Notes
- Prefer worktrees to avoid frequent branch switches: see `docs/WORKTREES.md`.
- Always confirm branch with the user before edits; default branch is `main`.
