-- spools: the real inventory (see README.md section 6 "Data model").
-- Owner-scoped via RLS; single-user today (owner = the one Supabase Auth user),
-- but written as a real per-row policy rather than disabled RLS so it holds up
-- if multi-user is ever revisited.

create table if not exists public.spools (
  id uuid primary key default gen_random_uuid(),
  owner uuid not null default auth.uid() references auth.users (id) on delete cascade,
  brand text,
  material text,
  color text,
  weight_grams numeric,
  remaining_grams numeric,
  print_temp_c integer,
  print_speed_mm_s integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists spools_owner_idx on public.spools (owner);

alter table public.spools enable row level security;

create policy "spools_select_own" on public.spools
  for select using (auth.uid() = owner);

create policy "spools_insert_own" on public.spools
  for insert with check (auth.uid() = owner);

create policy "spools_update_own" on public.spools
  for update using (auth.uid() = owner) with check (auth.uid() = owner);

create policy "spools_delete_own" on public.spools
  for delete using (auth.uid() = owner);

-- Shared by every table with an updated_at column (see pending_scans migration too).
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger spools_set_updated_at
  before update on public.spools
  for each row
  execute function public.set_updated_at();
