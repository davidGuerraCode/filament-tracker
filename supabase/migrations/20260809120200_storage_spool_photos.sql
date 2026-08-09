-- Storage bucket for spool label photos. Private bucket -- objects are only
-- readable/writable by their owner, scoped by the first path segment being
-- that user's auth uid (upload path convention: "<user_id>/<uuid>.<ext>").

insert into storage.buckets (id, name, public)
values ('spool-photos', 'spool-photos', false)
on conflict (id) do nothing;

create policy "spool_photos_select_own" on storage.objects
  for select using (
    bucket_id = 'spool-photos'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "spool_photos_insert_own" on storage.objects
  for insert with check (
    bucket_id = 'spool-photos'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "spool_photos_update_own" on storage.objects
  for update using (
    bucket_id = 'spool-photos'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "spool_photos_delete_own" on storage.objects
  for delete using (
    bucket_id = 'spool-photos'
    and auth.uid()::text = (storage.foldername(name))[1]
  );
