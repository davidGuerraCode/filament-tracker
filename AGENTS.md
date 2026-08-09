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

Live project (ref `tepcyuytkwyanfdtnttp`) is linked; all migrations including the
storage-upload trigger are applied; `process-spool-photo` is deployed; `GEMINI_API_KEY` secret
is set. End-to-end plumbing (upload to `spool-photos` -> trigger -> `pending_scans` row at
`status=processing`) is verified working. The Gemini extraction call currently fails with
HTTP 429 `RESOURCE_EXHAUSTED` (`limit: 0` for `gemini-2.0-flash-lite` free tier), so rows never
reach `status=ready` -- this is a Gemini API key/billing quota issue on the captain-owned Google
Cloud project, not a bug in this repo. To diagnose edge function failures on the live project:
the installed Supabase CLI has no `functions logs` subcommand, so use the Management API Logs
endpoint instead (`GET /v1/projects/{ref}/analytics/endpoints/logs.all`, sources `function_logs`
for runtime console output / `function_edge_logs` for gateway request-response; pass
`iso_timestamp_start`/`iso_timestamp_end` explicitly or recent rows get dropped). `supabase db
query --linked "<sql>"` queries the live DB directly without Docker (e.g. `net._http_response`
for the raw webhook HTTP response).

No frontend exists yet as of this scaffold -- root `README.md` is the PRD, not app docs.

## Maintaining this file

Keep this file for knowledge useful to almost every future agent session in this project.
Do not repeat what the codebase already shows; point to the authoritative file or command instead.
Prefer rewriting or pruning existing entries over appending new ones.
When updating this file, preserve this bar for all agents and keep entries concise.
