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
`status=processing`) is verified working -- test uploads must use a path of
`<auth.users id>/<filename>` since the trigger derives `owner` from the first path segment and
`pending_scans.owner` has a not-null FK to `auth.users`; a root-level upload fails insert with
`invalid input syntax for type uuid`, not a Gemini error. A pre-existing test user
(`fm-verify-test@example.com`, id `28a6d012-4cb4-4a3f-b18e-948ef3ab4bff`) exists in `auth.users`
for this. The Gemini extraction call still fails with HTTP 429 `RESOURCE_EXHAUSTED`
(`limit: 0` for `gemini-2.0-flash-lite` free tier) as of 2026-08-09 ~21:35 UTC, so rows never
reach `status=ready` -- captain unlinked the Cloud project's billing account expecting this to
restore free-tier quota, but a re-verify immediately after found the identical error, so quota
had not (yet, at least) been restored. Still a captain-owned Gemini API key/billing/quota issue,
not a bug in this repo; a future re-check should confirm whether it was just propagation delay.
To diagnose edge function failures on the live project: the installed Supabase CLI has no
`functions logs` subcommand, so use the Management API Logs endpoint instead (`GET
/v1/projects/{ref}/analytics/endpoints/logs.all`, sources `function_logs` for runtime console
output / `function_edge_logs` for gateway request-response; pass `iso_timestamp_start`/
`iso_timestamp_end` explicitly or recent rows get dropped; the CLI's management API access token
lives in the macOS Keychain under service `"Supabase CLI"`, readable via `security
find-generic-password -s "Supabase CLI" -w`). `supabase db query --linked "<sql>"` queries the
live DB directly without Docker (e.g. `net._http_response` for the raw webhook HTTP response).

No frontend exists yet as of this scaffold -- root `README.md` is the PRD, not app docs.

## Maintaining this file

Keep this file for knowledge useful to almost every future agent session in this project.
Do not repeat what the codebase already shows; point to the authoritative file or command instead.
Prefer rewriting or pruning existing entries over appending new ones.
When updating this file, preserve this bar for all agents and keep entries concise.
