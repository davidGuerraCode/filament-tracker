# Backend (Supabase)

Backend-only scaffold for the flow described in the root `README.md` (PRD), sections 4 and 6.
No frontend lives here yet.

## Layout

- `migrations/` -- `spools`, `pending_scans`, the `spool-photos` storage bucket, and the
  storage-upload trigger, in apply order.
- `functions/process-spool-photo/` -- the Edge Function: storage upload -> Gemini extraction ->
  `pending_scans` status flip.
- `config.toml` -- local dev config (`supabase start`) and function settings.

## Local dev

Requires the [Supabase CLI](https://supabase.com/docs/guides/cli) and Docker.

```bash
supabase start          # boots local Postgres/Auth/Storage/Studio
supabase db reset       # (re)applies every migration in migrations/ from scratch
```

`supabase start` prints local API URL, anon key, and service role key -- use those to fill in
`.env` for local work.

## Applying migrations to a real project

```bash
supabase link --project-ref <your-project-ref>
supabase db push
```

Before pushing, open `supabase/migrations/20260809120300_storage_trigger_process_scan.sql` and
replace `<project-ref>` with your real project ref (Project Settings > General > Reference ID).

**First-time-only prerequisite:** the last migration's trigger calls
`supabase_functions.http_request(...)`, which does not exist until Database Webhooks has been
enabled at least once for the project. On a fresh project `supabase db push` will fail on this
migration with `ERROR: schema "supabase_functions" does not exist`, even though the tables and
storage bucket migrations before it succeed. Fix: in the Supabase dashboard, go to Database ->
Webhooks and click "Enable Webhooks" (a one-time, one-click action; no need to create an actual
webhook there), then re-run `supabase db push` -- the CLI resumes from the failed migration.

## Setting the Edge Function secret

```bash
supabase secrets set GEMINI_API_KEY=your-key-here
supabase functions deploy process-spool-photo
```

`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` don't need to be set manually -- every deployed
Edge Function gets those injected automatically at runtime.

## What's still needed before this runs end-to-end

Both are captain-owned account/credential steps -- nothing to fake or stub here:

1. **A live Supabase project.** Nothing in this repo has been linked or pushed to one. Create a
   project at supabase.com, then run the link/push steps above.
2. **A Gemini API key.** Free tier, no card required: https://aistudio.google.com/apikey. Set it
   as the `GEMINI_API_KEY` Edge Function secret (above) -- not in `.env`, since the function reads
   it from the Edge Runtime's secret store, not a bundled env file.

## Known limitations of this scaffold

- **Not validated against a live project.** No `supabase link` / `supabase db push` / `supabase
  functions deploy` has been run against a real project in building this -- this task was
  explicitly scoped to not require live credentials. Run `supabase db lint` and a real upload
  once linked to catch anything that only surfaces against live Postgres/Storage.
- **Storage-trigger endpoint has no shared-secret check.** `process-spool-photo` runs with
  `verify_jwt = false` (required -- the storage webhook call carries no user JWT), and currently
  only checks that the payload's `bucket_id` is `spool-photos` before proceeding. Reasonable for
  a personal single-user MVP where the function URL isn't published anywhere, but worth hardening
  (e.g. a Vault-stored shared secret sent as a custom header and checked in the function) before
  this is anything but a personal tool.
- **Gemini model name is a guess at a current Flash-Lite free-tier model** (`gemini-2.0-flash-lite`,
  overridable via the `GEMINI_MODEL` Edge Function secret). Confirm against
  https://ai.google.dev/gemini-api/docs/models once you have a key, and adjust if it's been
  renamed or deprecated.
