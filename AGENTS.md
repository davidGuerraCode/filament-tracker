# Project agent memory

This file is the project's committed home for project-intrinsic agent knowledge: build, test, release, architecture, and sharp-edge notes that should travel with the code.

- Add durable project-specific notes here as they are discovered through real work.

## Backend

Supabase CLI project layout under `supabase/` (migrations, `functions/process-spool-photo`,
`config.toml`). See `supabase/README.md` for local dev, applying migrations, setting the
`GEMINI_API_KEY` function secret, and the captain-owned setup steps still needed before this
runs end-to-end. That doc also lists known scaffold limitations (storage-trigger webhook has
no shared-secret check yet, Gemini model name unconfirmed) and a first-time-only dashboard step
(Database -> Webhooks -> Enable) required before the last migration can apply on a fresh project.

Live project (ref `tepcyuytkwyanfdtnttp`) is linked; migrations for `spools`, `pending_scans`,
and the `spool-photos` storage bucket are pushed; `process-spool-photo` is deployed. The final
migration (storage-upload trigger) is NOT yet applied pending the dashboard step above -- run
`supabase db push` again after enabling webhooks. `GEMINI_API_KEY` secret is still unset
(deliberately, captain-only step).

No frontend exists yet as of this scaffold -- root `README.md` is the PRD, not app docs.

## Maintaining this file

Keep this file for knowledge useful to almost every future agent session in this project.
Do not repeat what the codebase already shows; point to the authoritative file or command instead.
Prefer rewriting or pruning existing entries over appending new ones.
When updating this file, preserve this bar for all agents and keep entries concise.
