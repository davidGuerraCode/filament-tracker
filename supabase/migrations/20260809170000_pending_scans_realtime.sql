-- Add pending_scans to the supabase_realtime publication so the dashboard's
-- postgres_changes subscription (processing -> ready flip, README.md
-- section 4) actually receives updates. Tables aren't broadcast by default
-- even with RLS policies in place -- they must be explicitly published.

alter publication supabase_realtime add table public.pending_scans;
