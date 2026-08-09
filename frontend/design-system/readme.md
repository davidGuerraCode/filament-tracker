# Filament Tracker Design System

Terminal-flavored design system for **Filament Tracker** — a personal, local-only web app for tracking 3D-printer filament inventory (scan a spool's printed label → structured fields via a vision model → review/edit → dashboard).

## Sources

- **Repo:** [davidGuerraCode/filament-tracker](https://github.com/davidGuerraCode/filament-tracker) — `main` branch, `README.md` only. **No app code, Figma file, or existing UI exists yet** — the repo is a PRD-only planning doc for an MVP not yet built. Explore it yourself for the full requirements; sections referenced below are numbered as in that README.
- No design system, brand guide, or asset library was provided. Every visual decision below (palette, type, component shapes, the whole UI kit) is an **original design** built to the user's brief ("terminal look and feel, mono fonts, colors, ligatures") and the PRD's functional requirements — not a recreation of anything pre-existing. Treat this as a v1 starting point, not ground truth to preserve.

## UX decisions (challenging the PRD's implicit structure)

The PRD describes an async "queue and notify" flow (§4) but leaves the actual screen structure open. This system commits to:
- **One primary screen** — a dashboard doing double duty as the inventory grid *and* the pending-scan rail (§5), rather than a separate "queue" page. Pending scans surface as their own row above the inventory grid so nothing needing attention is buried in a routing hierarchy the PRD never asked for.
- **Review-as-dialog, not a route.** Opening a "ready" card or an existing spool overlays the edit form in place — you never lose dashboard scroll position or filter state, which matters most for the confirm-whenever-you-want flow the PRD calls out in §4.5.
- **Detected vs. manual field badges** in review (not in the PRD) — the PRD stresses extraction is "always best-effort, never assumed complete" (§3); making that visible per-field, not just as a blank input, was the missing piece to build trust in what the model actually read.

## Content fundamentals

- **Voice:** terse, technical, second-person when addressing the user directly ("Scan spool", "Confirm & add to inventory"), otherwise field-label noun phrases ("Remaining", "Print temp"). No marketing language, no exclamation points.
- **Casing:** UI labels and buttons are Title Case or plain sentence case for actions ("Confirm & add to inventory"); status badges are UPPERCASE with wide letter-spacing (`READY TO REVIEW`, `LOW STOCK`) — the one place shouting is intentional, mimicking terminal log levels.
- **Numbers/units are always inline with the value** — "220°C", "1000 g", "60 mm/s" — never split across a label and a separate unit field.
- **No emoji.** Status is carried by color + a small glyph (✓ ✕ ▣) or an uppercase badge, never emoji.
- **Empty/placeholder copy is instructional, not cute:** "— not detected, enter manually —", never "Oops, nothing here!".

## Visual foundations

- **Palette:** near-black cool-gray surfaces (`--black` → `--gray-800`) with a single phosphor-green primary accent (`--green-400`) plus cyan/amber/red/magenta for info/warning/error/rare-highlight. Max one accent per interactive element; never stack two accent colors on the same control.
- **Type:** one family everywhere — **Fira Code** (mono, ligatures on via `calt`+`liga`) — see Substitution note below. Sizes run 11–46px on a mostly-linear scale; body copy sits at 14px, never below 12px for real content.
- **Backgrounds:** flat solid color only. No gradients, no photography, no illustration, no texture/grain. The only "pattern" anywhere is the diagonal checkerboard placeholder standing in for an un-uploaded label photo.
- **Shape language:** sharp by default. Radii cap at 6px (`--radius-lg`); most surfaces use 2–4px. The **only** pill/fully-round shapes are the `Switch` track/thumb and `Radio` dot — deliberately rare, so roundness itself carries meaning (a binary toggle or single-select) rather than being decorative.
- **Cards/panels:** flat `--surface-card` fill, single 1px `--border-subtle` border, **no drop shadow**. Border color steps up to `--border-strong` on hover for interactive cards — brightness/contrast carries hover state, not elevation.
- **Depth:** achieved only by border-brightness steps (`surface-app` → `card` → `raised` → `hover` → `pressed`) and, for modals only, a real `--shadow-overlay` drop shadow (the one place true elevation shows up, since a modal must visually separate from the page).
- **Focus/press states:** focus = 1px `--border-focus` (green) + a soft `--glow-focus` ring, styled like a terminal input catching the cursor. Hover = surface steps up one level, border brightens; no color inversion. Press has no distinct state beyond hover (no scale/shrink — terminal UI doesn't "squish").
- **Motion:** fast and linear-leaning (80–280ms, `cubic-bezier(0.2,0,0,1)`, no bounce/spring/overshoot anywhere). A blinking-caret keyframe (`cursor-blink`) is the one decorative animation, reserved for literal cursor/processing indicators.
- **Transparency/blur:** used exactly once — the modal scrim (`--surface-overlay`, translucent black, no blur). No frosted-glass anywhere else.
- **Imagery:** none exists (no photos/screenshots in the source). Placeholder photo slots use a neutral checkerboard pattern + `[ label photo ]` caption rather than any drawn or generated image.

## Iconography

No icon set, icon font, or SVG sprite exists in the source repo. Rather than hand-drawing icons or picking an arbitrary CDN set that would clash with the terminal concept, this system uses **plain Unicode glyphs** as icons throughout — `▣` (scan/camera), `◻`/`▣` (capture states), `▾` (disclosure), `✓`/`✕` (check/close), `✎` (edit), `×` (dismiss), `▓` box-drawing style dots for status. This is a deliberate, terminal-native substitute for an icon font (many real CLIs/TUIs do exactly this). If the product later wants crisper iconography, a monospace-friendly icon font (e.g. Lucide at a fixed pixel grid) is the natural swap — flag this to the user before adding one.

## Font substitution — please confirm

No font files were provided anywhere (empty repo). **Fira Code** (Google Fonts, loaded via `@import` in `tokens/typography.css`) was chosen to match the "mono fonts... ligatures" brief — it's the most widely recognized ligature-enabled coding font. If you have a preferred terminal font (JetBrains Mono, Berkeley Mono, IBM Plex Mono, a custom one), say so and it'll be swapped project-wide in one place.

## Components

Standard primitive set (no source defined an inventory, so this system authored the usual baseline, sized to the product):

**Core** — `Button`, `IconButton`, `Badge`, `Tag`, `Card`
**Forms** — `Input`, `Select`, `Checkbox`, `Radio`, `Switch`
**Navigation** — `Tabs`
**Feedback** — `Toast`, `Tooltip`, `Dialog`

### Intentional additions
Not part of a standard primitive set, but required by the product's actual content — documented per-component in their `.prompt.md`:
- **`ColorSwatch`** (`components/data/`) — square filament-color chip, the dashboard's most load-bearing piece of visual info.
- **`ProgressBar`** (`components/data/`) — remaining-filament meter with low-stock coloring.
- **`ScanFAB`** (`components/data/`) — the persistent floating scan trigger the PRD calls out explicitly (§5).

## UI kits

- **`ui_kits/filament-tracker/`** — the one product this system covers. Interactive dashboard + scan-capture dialog + review/edit dialog, wired end-to-end (scan → queue → auto-ready after a few seconds → review → confirm → appears in inventory). See its own `README.md`.

## Root index

- `styles.css` — entry point, imports everything under `tokens/`.
- `tokens/colors.css`, `typography.css`, `spacing.css`, `effects.css` — all custom properties.
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Foundations groups in the Design System tab).
- `components/core/`, `components/forms/`, `components/navigation/`, `components/feedback/`, `components/data/` — primitives, each with `.jsx` + `.d.ts` + `.prompt.md` + one showcase `.card.html`.
- `ui_kits/filament-tracker/` — the interactive UI kit.
- `thumbnail.html` — homepage tile.
- `github.md` — source-repo sync record.
- `SKILL.md` — Claude Code-compatible skill wrapper for this system.

## Caveats / ask

This whole system is a first pass built from a requirements doc with **no existing UI to ground it in** — palette, type choice, layout, and every screen are original proposals, not extractions. Please react to:
1. Does the phosphor-green terminal direction feel right, or too literal/retro?
2. Fira Code as the font, or a different mono/ligature face?
3. The one-dashboard-does-everything IA (vs. a separate pending-scans page) — does it hold up once there are dozens of spools queued at once?
