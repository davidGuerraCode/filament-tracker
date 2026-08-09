-- pending_scans: items mid-processing between a label photo upload and the
-- user reviewing extracted fields (see README.md section 4 "End-to-end flow").
-- The process-spool-photo Edge Function inserts a row here with status
-- 'processing' right after a photo lands in the spool-photos bucket, then
-- flips it to 'ready' once Gemini extraction completes -- the status change
-- is what Supabase Realtime pushes to a listening client.

create type public.pending_scan_status as enum ('processing', 'ready');

create table if not exists public.pending_scans (
  id uuid primary key default gen_random_uuid(),
  owner uuid not null default auth.uid() references auth.users (id) on delete cascade,
  photo_path text not null,
  status public.pending_scan_status not null default 'processing',
  -- Best-effort extraction result once status = 'ready'. Shape:
  -- { brand, material, color, print_temp_c, print_speed_mm_s } -- any field
  -- the model couldn't read is omitted/null, never fabricated.
  extracted jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists pending_scans_owner_idx on public.pending_scans (owner);

alter table public.pending_scans enable row level security;

create policy "pending_scans_select_own" on public.pending_scans
  for select using (auth.uid() = owner);

create policy "pending_scans_insert_own" on public.pending_scans
  for insert with check (auth.uid() = owner);

create policy "pending_scans_update_own" on public.pending_scans
  for update using (auth.uid() = owner) with check (auth.uid() = owner);

create policy "pending_scans_delete_own" on public.pending_scans
  for delete using (auth.uid() = owner);

create trigger pending_scans_set_updated_at
  before update on public.pending_scans
  for each row
  execute function public.set_updated_at();
