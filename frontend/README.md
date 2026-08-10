# Filament Tracker — Frontend

Vite + React + TypeScript app for the [Filament Tracker](../README.md) PRD, wired to the live Supabase
backend described in [`../AGENTS.md`](../AGENTS.md).

## Run it

```sh
npm install
npm run dev
```

`.env.local` already contains the project's `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` (anon key is
public-safe by design). `.env.example` documents the same two keys with no values, for reference.

## Auth: magic link

There is no password. Sign-in is Supabase Auth's `signInWithOtp`:

1. Enter an email on the sign-in screen and submit — this calls `supabase.auth.signInWithOtp`.
2. The screen switches to a "check your email" state.
3. **Open the emailed link** — it signs the browser in and lands back on this app's origin. The
   dashboard then renders automatically (an `onAuthStateChange` listener picks up the new session; no
   further action needed in this tab or a new one, whichever the link opens in).

Every `spools` / `pending_scans` row is scoped to `auth.uid()` via RLS, so this step is required before
any dashboard data will load.

## What's here

- `src/components/ui/` — design system primitives (`Button`, `Card`, `Dialog`, etc.) ported from
  `../design-system/components/`, rebuilt with Tailwind v4 utility classes instead of the source's inline
  `style` objects. Prop shapes match the sibling `.d.ts` files.
- `src/index.css` — Tailwind v4 entry point. The `@theme` block maps every token from
  `../design-system/tokens/{colors,typography,effects}.css` into Tailwind's theme namespaces (`--color-*`,
  `--text-*`, `--radius-*`, `--shadow-*`, `--ease-*`, `--duration-*`, `--animate-*`), so the same palette
  drives both Tailwind utilities (`bg-surface-card`, `text-status-error`, …) and any one-off inline styles
  that still reference the raw `--color-*` custom properties directly (dynamic per-row values like a
  spool's color swatch). The base spacing scale and font-weight keys already matched Tailwind's defaults
  (4px unit; 400/500/600/700), so those weren't overridden.
- `src/components/` (`SpoolCard`, `PendingCard`, `ScanCapture`, `ReviewEdit`, `CardMenu`) and
  `src/screens/` (`SignIn`, `Dashboard`) — the real screens, following `../design-system/ui_kits/filament-tracker/`'s
  layout but reading/writing the live `spools` / `pending_scans` tables instead of mock data.
- `src/lib/supabase.ts` — the Supabase client (anon key, browser-side).

## Real-backend wiring notes

- **Scan capture** uploads directly to the `spool-photos` bucket at `<auth.uid()>/<uuid>.<ext>`, matching
  the storage RLS policy and the `on_spool_photo_uploaded` trigger. It does not create a `pending_scans`
  row itself — the `process-spool-photo` Edge Function does that server-side once the upload lands.
- **Dashboard** subscribes to `pending_scans` over Supabase Realtime (`postgres_changes`, filtered to the
  signed-in owner) so a card flips `processing` → `ready` live, no polling. This required adding table
  `public.pending_scans` to the `supabase_realtime` publication (migration
  `20260809170000_pending_scans_realtime.sql`) — RLS alone does not put a table on the wire.
  `spools` is not on that publication; edits to it update local state directly from the mutation's
  response instead.
- **Review/edit** writes a real `spools` row on confirm (insert for a scan, update for an existing spool)
  and, for a scan, deletes the now-consumed `pending_scans` row.
- Gemini's extraction schema returns `brand` / `material` / `color` / `weight_grams` / `print_temp_c` /
  `print_speed_mm_s` — never `remaining_grams`. That field is always manual entry in the review form,
  even in scan-review mode (a fresh scan has nothing yet to have "remaining" — it starts equal to the
  full weight).
