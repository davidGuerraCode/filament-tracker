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

After linking, open `supabase/migrations/20260809120300_storage_trigger_process_scan.sql` and
replace `<project-ref>` with your real project ref (Project Settings > General > Reference ID),
then re-run `supabase db push` (or apply that one statement via the Studio SQL editor). This
can't be filled in ahead of time since it depends on a project that doesn't exist yet.

## Setting the Edge Function secrets

The storage trigger authenticates itself to `process-spool-photo` with a shared secret stored in
Supabase Vault (created by the same migration, value never committed to git). After linking and
pushing migrations, fetch that generated value and set it as the function's own secret so both
sides match:

```bash
supabase secrets set GEMINI_API_KEY=your-key-here
supabase secrets set WEBHOOK_SECRET="$(supabase db execute --project-ref <your-project-ref> \
  --sql "select decrypted_secret from vault.decrypted_secrets where name = 'scan_webhook_secret';" \
  --csv | tail -n1)"
supabase functions deploy process-spool-photo
```

(If `supabase db execute` isn't available in your CLI version, run that `select` in the Studio
SQL editor instead and copy the value manually.)

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
  once linked to catch anything that only surfaces against live Postgres/Storage. In particular,
  the `vault.create_secret` / `net.http_post` trigger in
  `20260809120300_storage_trigger_process_scan.sql` (Vault + pg_net, Supabase's standard pattern
  for authenticated Database Webhooks) is unverified against a real Postgres instance -- confirm
  it fires and the secret round-trips correctly once linked.
- **Gemini model name is a guess at a current Flash-Lite free-tier model** (`gemini-2.0-flash-lite`,
  overridable via the `GEMINI_MODEL` Edge Function secret). Confirm against
  https://ai.google.dev/gemini-api/docs/models once you have a key, and adjust if it's been
  renamed or deprecated.
