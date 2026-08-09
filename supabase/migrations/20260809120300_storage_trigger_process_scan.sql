-- Wires photo uploads to the spool-photos bucket to the process-spool-photo
-- Edge Function.
--
-- Security: the storage trigger call carries no user JWT (verify_jwt=false
-- on the function, see config.toml), so the function is otherwise a bare
-- unauthenticated POST endpoint. To close that off, the trigger sends a
-- shared secret as a Bearer token, stored in Supabase Vault (never in this
-- committed migration) and checked by the function against its own
-- WEBHOOK_SECRET secret. The trigger also forwards the real storage.objects
-- row -- including its authoritative `owner` column -- so the function
-- trusts the actual uploader, not a path-prefix guess.
--
-- pg_net is enabled by default on Supabase projects; the guard below is a
-- no-op there and only matters for from-scratch local Postgres setups.
create extension if not exists pg_net;

-- IMPORTANT -- placeholder ahead: the secret value below is a per-database
-- random placeholder generated at migration time, not a real shared secret.
-- After linking a real project (`supabase link`), fetch the actual value
-- with:
--   select decrypted_secret from vault.decrypted_secrets where name = 'scan_webhook_secret';
-- and set it as the Edge Function's secret so both sides match:
--   supabase secrets set WEBHOOK_SECRET=<value from the query above>
-- See supabase/README.md for the full sequence.
select vault.create_secret(
  encode(gen_random_bytes(32), 'hex'),
  'scan_webhook_secret',
  'Bearer token the storage trigger sends to process-spool-photo; must match the function''s WEBHOOK_SECRET secret.'
);

-- IMPORTANT -- placeholder ahead: <project-ref> below cannot be known until
-- this project is linked to a real Supabase project. After linking, replace
-- it with the real project ref (Project Settings > General > Reference ID)
-- and re-run this migration, or edit it directly via the Studio SQL editor.
create or replace function public.handle_spool_photo_upload()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  webhook_secret text;
begin
  select decrypted_secret into webhook_secret
  from vault.decrypted_secrets
  where name = 'scan_webhook_secret';

  perform net.http_post(
    url := 'https://<project-ref>.supabase.co/functions/v1/process-spool-photo',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || webhook_secret
    ),
    body := jsonb_build_object(
      'type', 'INSERT',
      'table', 'objects',
      'schema', 'storage',
      'record', to_jsonb(new)
    )
  );
  return new;
end;
$$;

create trigger on_spool_photo_uploaded
  after insert on storage.objects
  for each row
  when (new.bucket_id = 'spool-photos')
  execute function public.handle_spool_photo_upload();
