# Agent Orchestration — Codex & Claude Code
- **IA/Schema Agent:** ensure `/src/content/config.ts` matches `04_Content_Model.md`.
- **Content Ingestor:** parse CSV/JSON export → generate MDX files.
- **Component Smith:** implement `SongCard`, `SongFilters`, `YouTube`, `SpotifyEmbed`.
- **Search Agent:** wire Pagefind build step and UI.
- **SEO Agent:** inject JSON‑LD + OG tags; validate with Rich Results.
- **QA Agent:** run Lighthouse/axe/link checker; output reports.
- **Deploy Agent:** set up Cloudflare Pages or Netlify; configure postbuild `pagefind`.

## Branching & Confirmation Rules
- Confirm active branch with the user before switching or committing (default is `main`).
- Prefer Git worktrees for simultaneous branches; open each worktree in GitHub Desktop separately.
- Use PRs for changes that span multiple files or add dependencies.
- If Desktop warns about uncommitted changes, commit (or explicitly stash and re-apply soon).
- Use `docs/DESKTOP_PROMPTING_POLICY.md` to decide when and how to prompt the user with GitHub Desktop steps.
