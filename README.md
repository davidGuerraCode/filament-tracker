# Filament Tracker — Product Requirements Document

## 1. Overview

Filament Tracker is a personal, local-only web app for tracking 3D-printer filament inventory. The core idea: point your
phone's camera at a spool's printed label, let the app read the brand/material/color/weight/temp/speed off it, confirm or
correct what it found, and manage the whole collection from a filterable dashboard.

**Status:** MVP not yet built. This document captures the requirements, flow, and technical decisions made during design.

## 2. Problem

Keeping track of filament spools — what you have, how much is left, what temp/speed each one prints at — is normally either
done from memory or via tedious manual data entry into a spreadsheet or another app. Every existing tool researched either:

- requires manual entry or a proprietary NFC/RFID tag to auto-fill spool data (Bambu AMS, OpenPrintTag, SimplyPrint), or
- only re-identifies a spool you already catalogued yourself via a self-generated QR code (Spoolman, OctoPrint SpoolManager), or
- requires a cloud account and isn't local-first (SimplyPrint, Spoolstock, Bambu Handy).

Nobody combines **local-only** ownership of your data with a **scan-first** onboarding flow that works across arbitrary
manufacturer labels. That's the gap this app fills.

## 3. Core feature: label capture → structured data

The single most important flow: **camera → photo of the printed sticker label → structured fields, extracted automatically.**

This is **not** a barcode/QR scan. Manufacturer barcodes/QR codes on filament spools were investigated and found to only ever
encode a SKU or a link to a product page — never the actual print specs. Bambu Lab spools use encrypted RFID, unreadable by a
phone camera at all. So the approach is: read the actual printed text on the label itself (brand, material, color, weight,
print temperature, print speed) using a vision-capable AI model, not a barcode decoder.

Traditional OCR + per-brand regex parsing was considered and rejected — label layouts vary too much across manufacturers to
parse reliably with fixed rules (confirmed against the one existing product that tries this, which scopes it to a single
brand's fixed layout and still calls it "highly experimental"). Sending the photo to a vision-capable LLM with a
schema-constrained prompt collapses OCR and per-brand parsing into a single step and handles layout variance far better.

**Extraction is always best-effort, never assumed complete.** Whatever the model reads is prefilled into a review/edit screen;
any field it couldn't find (most commonly print speed) is left blank for the user to fill in or skip.

## 4. End-to-end flow (architecture)

Chosen shape: **async, queue-and-notify — capture never blocks the user.**

1. User taps **Scan**, points the camera at a spool's label, and captures a photo.
2. The photo uploads directly to storage. The user gets an immediate "queued" confirmation and is dropped straight back on the
   dashboard — free to scan another spool immediately. Multiple spools can be queued back to back.
3. In the background, an upload-triggered function sends the photo to the vision model, gets structured fields back, and
   records the result as a pending item.
4. The dashboard shows a pending card for each item still processing. The moment extraction finishes, that card flips to
   **"Ready to review"** via a live update — no polling, no forced popup.
5. The user opens a ready card **whenever they want** — never interrupted mid-task — and sees the review/edit screen prefilled
   with whatever was found, with any missing fields left blank to fill in.
6. On confirm, the item moves from pending into the real inventory and appears as a normal card on the dashboard.

This was chosen over two simpler alternatives (a synchronous "wait on a spinner for the extraction call" flow, and a variant
where the backend both extracts and creates the inventory row directly) specifically because it never makes the user wait on
a screen and tolerates flaky mobile connections best — the photo is safe the instant it uploads, independent of the model call
or dashboard software.

## 5. Dashboard and inventory management

- Spools are shown as cards in a grid — brand, material, color (as a swatch), remaining amount, print temp, and print speed
  all visible on the card without opening it.
- Search and filter by brand, material, and color.
- Standard CRUD: edit any spool's fields after the fact, delete a spool.
- A floating scan button is always available to add a new spool from any screen.
- Low-remaining spools are visually flagged.

The review/edit screen (opened after a scan, or from an existing dashboard card) is a dense form showing all fields at once,
alongside what the extraction actually found — so it's easy to see what the model read vs. what's been hand-edited.

## 6. Technical stack

| Layer | Choice | Why |
|---|---|---|
| Frontend | React + Vite | Simple, no SSR complexity needed for a local-inventory tool. |
| Hosting | Static frontend (Vercel/Netlify/Cloudflare Pages) | No custom backend server to deploy — the database provider is the entire backend. |
| Database | **Supabase** (Postgres + Auth + Storage) | Free tier: 500 MB storage, 50k MAUs, unlimited API requests — comfortably covers a personal inventory. Postgres fits a filterable/structured dashboard far better than a document store. Bundles mature, GA auth (magic link) so there's no separate auth service to integrate. |
| Vision extraction | **Google Gemini API (Flash / Flash-Lite), free tier** | Free tier is genuinely free-forever (no card, no expiration), matches Claude/GPT-4o on structured-extraction accuracy, and free-tier rate limits are one to two orders of magnitude above what a personal spool collection will ever need. |
| Scanning capture | `<input type="file" accept="image/*" capture="environment">` | Opens the native camera directly on iOS/Android with no custom video-stream handling needed for a single-photo capture. |

**Data model (two tables):**
- `spools` — the real inventory: brand, material, color, weight, print temp, print speed, remaining amount, owner (RLS-scoped).
- `pending_scans` — items mid-processing: photo reference, status (`processing` / `ready`), extracted fields once available.

**Known operational caveat:** Supabase free projects pause after 7 days with no database activity. Data is not lost and resuming
is a login + click + a couple of minutes — not a hard deletion. A free weekly scheduled ping (e.g. GitHub Actions cron) can
prevent the pause from ever triggering; worth wiring up once the app is live, not a blocker before then.

## 7. Non-goals for the MVP

- **NFC/RFID tag reading** (Bambu AMS-style, OpenPrintTag/OpenSpool). This is a hardware problem, not a camera/browser one, and
  iOS has no web path to NFC at all. Explicitly out of scope; revisit only if most of the captain's own spools turn out to be
  NFC-tagged brands.
- **Slicer/printer integration** (Moonraker/Klipper, OctoPrint, automatic weight decrement during a print). This is the single
  feature most likely to be missed by anyone used to Spoolman, but it's a fast-follow, not MVP.
- **Multi-user / sharing.** This is a single-captain personal tool for now.
- **Offline extraction.** The vision-LLM call requires network at scan time; there is no offline fallback for extraction
  itself (manual entry still works offline, since it needs no network call).

## 8. Fast-follow ideas (post-MVP backlog, not required now)

- Community filament-spec database integration (e.g. Spoolman's open `SpoolmanDB` or the Open Filament Database) so temp/speed
  can be looked up by brand+material even without a fresh photo.
- Low-filament threshold alerts.
- Slicer/printer integration for automatic weight decrement during prints.
- Label generation (print your own QR labels for spools with no usable manufacturer label).
- Drying logs.
- Cost/usage analytics.
- Photo attachment per spool (helps distinguish similar colors at a glance).
- OCR fallback mode for labels the vision model can't parse.

## 9. Open risks / things to keep an eye on

- **Gemini free-tier data-use policy:** Google states free-tier inputs/outputs may be used to improve its products — low-stakes
  for photos of filament labels, but worth knowing since it differs from a typical paid-API no-training-on-customer-data policy.
- **Extraction accuracy on damaged/curved/glossy labels** — best-effort by design; the manual-entry fallback always covers a
  failed or partial read.
- **Supabase free-tier pause** — see §6; low-risk but worth the keep-alive ping once live.
