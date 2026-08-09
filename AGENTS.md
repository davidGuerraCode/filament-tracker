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
is set. End-to-end plumbing (upload to `spool-photos` -> trigger -> `pending_scans` row ->
`status=ready`) is verified working end-to-end as of 2026-08-09 ~21:48 UTC -- test uploads must
use a path of `<auth.users id>/<filename>` since the trigger derives `owner` from the first path
segment and `pending_scans.owner` has a not-null FK to `auth.users`; a root-level upload fails
insert with `invalid input syntax for type uuid`, not a Gemini error. A pre-existing test user
(`fm-verify-test@example.com`, id `28a6d012-4cb4-4a3f-b18e-948ef3ab4bff`) exists in `auth.users`
for this.

Gemini quota blocker (was open since PR #2-4) is resolved: it was never specific to
`gemini-2.0-flash-lite` or to billing-account linkage -- every pinned model id tested
(`gemini-2.0-flash`, `gemini-2.0-flash-lite`, `gemini-2.0-flash-lite-001`, `gemini-2.5-pro`)
returns free-tier `limit: 0`, and the newest pinned ids (`gemini-2.5-flash`,
`gemini-2.5-flash-lite`) 404 with "no longer available to new users" for this key, even though
`ListModels` lists them as supporting `generateContent`. The rolling alias `gemini-flash-latest`
works and has real free-tier quota; `process-spool-photo`'s `GEMINI_MODEL` default now points
there. If this key's access shifts again, re-probe with a throwaway `req.url` branch inside the
function that calls `models?key=...` (`ListModels`) and try both pinned ids and the `-latest` /
`-lite-latest` rolling aliases -- don't assume a pinned id will keep working long-term.
To diagnose edge function failures on the live project: the installed Supabase CLI has no
`functions logs` subcommand, so use the Management API Logs endpoint instead (`GET
/v1/projects/{ref}/analytics/endpoints/logs.all`, sources `function_logs` for runtime console
output / `function_edge_logs` for gateway request-response; pass `iso_timestamp_start`/
`iso_timestamp_end` explicitly or recent rows get dropped; the CLI's management API access token
lives in the macOS Keychain under service `"Supabase CLI"`, readable via `security
find-generic-password -s "Supabase CLI" -w`). `supabase db query --linked "<sql>"` queries the
live DB directly without Docker (e.g. `net._http_response` for the raw webhook HTTP response).

No frontend exists yet as of this scaffold -- root `README.md` is the PRD, not app docs.

## Frontend

`frontend/` is a Vite + React + TypeScript app (real code, wired to the live backend above) --
see `frontend/README.md` for how to run it and the magic-link auth flow. `frontend/design-system/`
is a verbatim, unmodified copy of the designer-delivered design system export (tokens, primitive
`.jsx`/`.d.ts` components, and a mocked `ui_kits/filament-tracker/` click-through) -- treat it as a
reference/record, not code to edit or ship. The real primitives live in `frontend/src/components/ui/`,
rebuilt with Tailwind v4 (`@tailwindcss/vite`) instead of the source's inline `style` objects; every
design token is mapped into Tailwind's theme via the CSS-first `@theme` block in `frontend/src/index.css`
-- see that file's leading comment for which keys were overridden vs. left at Tailwind's (matching)
defaults. Gemini's extraction schema (see `process-spool-photo` above) never returns `weight_grams` or
`remaining_grams`, so those two `spools` fields are always manual entry in the review/edit form.

`pending_scans` needed an explicit `alter publication supabase_realtime add table public.pending_scans;`
(migration `20260809170000_pending_scans_realtime.sql`) before the dashboard's `postgres_changes`
subscription would receive anything -- enabling RLS on a table does not put it on the realtime wire,
that's a separate opt-in. `spools` is deliberately not on that publication; the dashboard updates it
from each mutation's own response instead of subscribing.

## Maintaining this file

Keep this file for knowledge useful to almost every future agent session in this project.
Do not repeat what the codebase already shows; point to the authoritative file or command instead.
Prefer rewriting or pruning existing entries over appending new ones.
When updating this file, preserve this bar for all agents and keep entries concise.
