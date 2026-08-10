// process-spool-photo
//
// Triggered by the `on_spool_photo_uploaded` Database Webhook (see
// supabase/migrations/20260809120300_storage_trigger_process_scan.sql)
// whenever a photo lands in the `spool-photos` storage bucket.
//
// Flow (README.md section 4 "End-to-end flow"):
//   1. Insert a pending_scans row with status "processing".
//   2. Send the photo to Gemini with a JSON-schema-constrained prompt asking
//      for brand/material/color/print temp/print speed.
//   3. Update the row to status "ready" with whatever fields Gemini found.
//      Supabase Realtime pushes that status flip to any listening client --
//      no polling on the client side.
//
// Required secrets (set with `supabase secrets set`, see supabase/README.md):
//   GEMINI_API_KEY
// Auto-provided by the Supabase Edge Runtime, no setup needed:
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY

import { createClient } from "npm:@supabase/supabase-js@2";

const GEMINI_MODEL = Deno.env.get("GEMINI_MODEL") ?? "gemini-flash-latest";

const EXTRACTION_SCHEMA = {
  type: "OBJECT",
  properties: {
    brand: { type: "STRING", nullable: true },
    material: { type: "STRING", nullable: true },
    color: { type: "STRING", nullable: true },
    color_hex: { type: "STRING", nullable: true },
    weight_grams: { type: "NUMBER", nullable: true },
    print_temp_c: { type: "NUMBER", nullable: true },
    print_speed_mm_s: { type: "NUMBER", nullable: true },
  },
  required: [],
};

const EXTRACTION_PROMPT = `You are reading the printed label on a 3D-printer filament spool from a
photo. Extract exactly these fields: brand, material (e.g. PLA, PETG, ABS,
TPU), color, color_hex, net/spool weight in grams, recommended print
temperature in Celsius, recommended print speed in mm/s.

- brand/material/weight/temp/speed: only report a value if -- and only if --
  it is visibly printed on the label as text.
- color: the color name as printed on the label (e.g. "Galaxy Silver",
  "Signal Amber"), not an estimate.
- color_hex: separate from the printed name -- look at the actual filament
  color shown in the photo (the spool itself, not the text) and return your
  best-estimate hex color for it, formatted as "#rrggbb" (e.g. "#c0c0c0").
  Return this even if the printed color name is missing, and return null for
  it only if the photo genuinely doesn't show the filament itself (e.g. it's
  cropped to just the printed text).

Rules:
- If a field is missing, unclear, or not determinable, return null for it.
  Do not guess, infer, or fabricate a value for the text-based fields
  (brand/material/color/weight/temp/speed) -- color_hex is the one field
  that's explicitly a visual estimate, not a literal reading.
- Weight is sometimes printed in grams (e.g. "1000g", "1000 g") and sometimes
  in kilograms (e.g. "1kg", "1 kg net weight") -- always convert to grams and
  return weight_grams as a plain number of grams (e.g. "1kg" -> 1000,
  "0.25kg" -> 250, "250g" -> 250). Do the unit conversion yourself; never
  return a kilogram value unconverted.
- Temperature and speed must be single numbers (if the label prints a range
  like "190-220", pick the midpoint).`;

interface StorageWebhookPayload {
  type: string;
  table: string;
  schema: string;
  record: {
    bucket_id: string;
    name: string;
    [key: string]: unknown;
  };
}

interface ExtractedFields {
  brand: string | null;
  material: string | null;
  color: string | null;
  color_hex: string | null;
  weight_grams: number | null;
  print_temp_c: number | null;
  print_speed_mm_s: number | null;
}

Deno.serve(async (req) => {
  let payload: StorageWebhookPayload;
  try {
    payload = await req.json();
  } catch {
    return new Response("invalid JSON body", { status: 400 });
  }

  const object = payload?.record;
  if (!object?.bucket_id || object.bucket_id !== "spool-photos" || !object.name) {
    // Not a spool-photos upload -- ignore. Keeps this endpoint a no-op for
    // any other webhook accidentally pointed at it.
    return new Response("ignored: not a spool-photos upload", { status: 200 });
  }

  const photoPath = object.name as string;
  const owner = photoPath.split("/")[0];
  if (!owner) {
    return new Response("ignored: unexpected object path", { status: 200 });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const geminiApiKey = Deno.env.get("GEMINI_API_KEY");

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const { data: pendingScan, error: insertError } = await supabase
    .from("pending_scans")
    .insert({ owner, photo_path: photoPath, status: "processing" })
    .select("id")
    .single();

  if (insertError || !pendingScan) {
    console.error("failed to insert pending_scans row", insertError);
    return new Response("failed to create pending scan", { status: 500 });
  }

  if (!geminiApiKey) {
    // No key configured yet -- leave the row in "processing" rather than
    // faking a "ready" result. See supabase/README.md's captain-owned steps.
    console.error("GEMINI_API_KEY is not set; leaving pending_scans row as processing");
    return new Response("GEMINI_API_KEY not configured", { status: 200 });
  }

  try {
    const extracted = await extractFieldsWithGemini(supabase, photoPath, geminiApiKey);

    const { error: updateError } = await supabase
      .from("pending_scans")
      .update({ status: "ready", extracted })
      .eq("id", pendingScan.id);

    if (updateError) {
      console.error("failed to update pending_scans row to ready", updateError);
      return new Response("failed to update pending scan", { status: 500 });
    }

    return new Response("ok", { status: 200 });
  } catch (err) {
    console.error("gemini extraction failed", err);
    // Row stays "processing" -- the client's card just never flips to ready.
    // A future retry/error-status path is a reasonable fast-follow, but the
    // PRD's status enum is only processing/ready for the MVP.
    return new Response("extraction failed", { status: 500 });
  }
});

async function extractFieldsWithGemini(
  supabase: ReturnType<typeof createClient>,
  photoPath: string,
  geminiApiKey: string,
): Promise<ExtractedFields> {
  const { data: photo, error: downloadError } = await supabase.storage
    .from("spool-photos")
    .download(photoPath);

  if (downloadError || !photo) {
    throw new Error(`failed to download photo: ${downloadError?.message}`);
  }

  const mimeType = photo.type || "image/jpeg";
  const base64Photo = arrayBufferToBase64(await photo.arrayBuffer());

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${geminiApiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: EXTRACTION_PROMPT },
              { inline_data: { mime_type: mimeType, data: base64Photo } },
            ],
          },
        ],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: EXTRACTION_SCHEMA,
        },
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`Gemini API error ${response.status}: ${await response.text()}`);
  }

  const result = await response.json();
  const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error("Gemini response had no extractable text part");
  }

  const parsed = JSON.parse(text);
  return {
    brand: parsed.brand ?? null,
    material: parsed.material ?? null,
    color: parsed.color ?? null,
    color_hex: parsed.color_hex ?? null,
    weight_grams: parsed.weight_grams ?? null,
    print_temp_c: parsed.print_temp_c ?? null,
    print_speed_mm_s: parsed.print_speed_mm_s ?? null,
  };
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
