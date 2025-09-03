# Codex Runbook for This Repo

## Branching & Safety
- Confirm the active branch with the user before any changes. Default is `main`.
- Prefer Git worktrees for parallel tasks; do not switch branches with uncommitted changes.
- Use PRs for multi-file changes or when adding/changing dependencies.

## GitHub Desktop Usage
- User prefers Desktop. Provide clear instructions when asking to:
  - Switch branches
  - Commit and push
  - Create a Pull Request (PR)
  - Resolve merge conflicts

See `docs/GIT_WORKFLOW_DESKTOP.md` and `docs/WORKTREES.md` for details.

## User Instruction Triggers
Follow `docs/DESKTOP_PROMPTING_POLICY.md` to decide when to prompt the user with Desktop steps. Keep prompts short (1–2 sentences), explicit, and branch‑specific. These prompts are for the user; do not treat them as internal steps.

## Scope Boundaries
- Follow lane ownership in `.claude.json`.
- Ask before editing protected files (e.g., `package.json`, lockfiles).

## Communication
- Before running commands, state which branch/folder (worktree) you expect.
- If changes affect deployment, call it out and request a quick manual review.
