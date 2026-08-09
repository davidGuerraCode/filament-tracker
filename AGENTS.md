# Project agent memory

This file is the project's committed home for project-intrinsic agent knowledge: build, test, release, architecture, and sharp-edge notes that should travel with the code.

- Add durable project-specific notes here as they are discovered through real work.

## Backend

Supabase CLI project layout under `supabase/` (migrations, `functions/process-spool-photo`,
`config.toml`). See `supabase/README.md` for local dev, applying migrations, setting the
`GEMINI_API_KEY` function secret, and the two captain-owned setup steps (live Supabase project,
Gemini API key) still needed before this runs end-to-end. That doc also lists known scaffold
limitations (untested against a live project, storage-trigger webhook has no shared-secret
check yet, Gemini model name unconfirmed).

No frontend exists yet as of this scaffold -- root `README.md` is the PRD, not app docs.

## Maintaining this file

Keep this file for knowledge useful to almost every future agent session in this project.
Do not repeat what the codebase already shows; point to the authoritative file or command instead.
Prefer rewriting or pruning existing entries over appending new ones.
When updating this file, preserve this bar for all agents and keep entries concise.
