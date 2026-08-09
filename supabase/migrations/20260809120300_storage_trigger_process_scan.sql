-- Wires photo uploads to the spool-photos bucket to the process-spool-photo
-- Edge Function, using Supabase's built-in Database Webhooks mechanism
-- (the supabase_functions.http_request trigger function, enabled by default
-- on every Supabase project).
--
-- IMPORTANT -- placeholder ahead: <project-ref> below cannot be known until
-- this project is linked to a real Supabase project (`supabase link`). After
-- linking, replace it with the real project ref (Project Settings > General
-- > Reference ID) and re-run this migration, or edit it directly via the
-- Studio SQL editor. See supabase/README.md for the full setup sequence and
-- for the security follow-up noted there re: verify_jwt.

create trigger on_spool_photo_uploaded
  after insert on storage.objects
  for each row
  when (new.bucket_id = 'spool-photos')
  execute function supabase_functions.http_request(
    'https://tepcyuytkwyanfdtnttp.supabase.co/functions/v1/process-spool-photo',
    'POST',
    '{"Content-Type":"application/json"}',
    '{}',
    '5000'
  );
