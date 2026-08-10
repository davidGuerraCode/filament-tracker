export interface Spool {
  id: string;
  owner: string;
  brand: string | null;
  material: string | null;
  color: string | null;
  color_hex: string | null;
  weight_grams: number | null;
  remaining_grams: number | null;
  print_temp_c: number | null;
  print_speed_mm_s: number | null;
  created_at: string;
  updated_at: string;
}

export type PendingScanStatus = 'processing' | 'ready';

export interface ExtractedFields {
  brand: string | null;
  material: string | null;
  color: string | null;
  color_hex: string | null;
  weight_grams: number | null;
  print_temp_c: number | null;
  print_speed_mm_s: number | null;
}

export interface PendingScan {
  id: string;
  owner: string;
  photo_path: string;
  status: PendingScanStatus;
  extracted: ExtractedFields | null;
  created_at: string;
  updated_at: string;
}
