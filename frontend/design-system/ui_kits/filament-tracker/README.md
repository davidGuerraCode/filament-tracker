# Filament Tracker — UI Kit

Interactive click-through recreation of the product's single core surface: a dashboard with the scan → queue → review → confirm flow described in the PRD (`davidGuerraCode/filament-tracker` README).

No code or Figma existed for this product at import time (empty repo, PRD-only) — every screen here is an original design authored from the PRD's requirements, not a recreation of an existing UI. See root `readme.md` → "UX decisions" for the reasoning.

**Files**
- `index.html` — mounts the full interactive flow.
- `Dashboard.jsx` — inventory grid, pending-scan rail, tabs, search, scan FAB.
- `SpoolCard.jsx` / `PendingCard.jsx` — grid cells.
- `ScanCapture.jsx` — capture dialog (simulated camera tap).
- `ReviewEdit.jsx` — dense edit form, detected-vs-manual field badges.

**Try it:** click the green **Scan** button → tap the capture box → **Capture & queue** → wait ~3s for the pending card to flip to "Ready to review" → click it → confirm.
