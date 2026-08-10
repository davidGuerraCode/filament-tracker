-- Adds a real hex estimate alongside spools.color (the printed label's
-- human-readable color name, e.g. "Galaxy Silver" -- not a valid CSS color
-- for anything except names that happen to also be CSS keywords). The
-- extraction model estimates this from the actual filament color visible in
-- the photo, same vision approach used for every other field; the dashboard
-- swatch (ColorSwatch) renders this instead of the raw name.

alter table public.spools add column if not exists color_hex text;
