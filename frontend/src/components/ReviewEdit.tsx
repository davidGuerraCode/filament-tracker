import { useState } from 'react';
import type { ReactNode } from 'react';
import type { ExtractedFields, PendingScan, Spool } from '../types';
import { Dialog, Input, Select, Badge, Button, ColorSwatch } from './ui';
import { supabase } from '../lib/supabase';

export type ReviewTarget = { mode: 'scan'; scan: PendingScan } | { mode: 'edit'; spool: Spool };

const BRAND_OPTIONS = ['SUNLU', 'BambuLab', 'Elegoo'];
const MATERIAL_OPTIONS = ['PLA', 'PETG', 'ABS', 'TPU'];

function Field({
  label,
  value,
  detected,
  onChange,
  type = 'text',
  prefix,
}: {
  label: string;
  value: string;
  detected: boolean;
  onChange: (v: string) => void;
  type?: string;
  prefix?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <Input
        label={label}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={detected ? undefined : '— not detected, enter manually —'}
        prefix={prefix}
      />
      {detected ? <Badge tone="info">detected</Badge> : <Badge tone="neutral">manual</Badge>}
    </div>
  );
}

export function ReviewEdit({
  target,
  onCancel,
  onSaved,
}: {
  target: ReviewTarget | null;
  onCancel: () => void;
  onSaved: (spool: Spool, opts: { removePendingScanId?: string }) => void;
}) {
  const isEdit = target?.mode === 'edit';
  const detected: Partial<ExtractedFields> = target?.mode === 'scan' ? target.scan.extracted ?? {} : {};
  const source: Partial<Spool> = target?.mode === 'edit' ? target.spool : {};

  const [brand, setBrand] = useState(String(source.brand ?? detected.brand ?? ''));
  const [material, setMaterial] = useState(String(source.material ?? detected.material ?? ''));
  const [color, setColor] = useState(String(source.color ?? detected.color ?? ''));
  const colorHex = source.color_hex ?? detected.color_hex ?? null;
  const [weight, setWeight] = useState(String(source.weight_grams ?? detected.weight_grams ?? ''));
  const [remaining, setRemaining] = useState(String(source.remaining_grams ?? source.weight_grams ?? ''));
  const [temp, setTemp] = useState(String(source.print_temp_c ?? detected.print_temp_c ?? ''));
  const [speed, setSpeed] = useState(String(source.print_speed_mm_s ?? detected.print_speed_mm_s ?? ''));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!target) return null;
  const t = target;

  const brandOptions = [
    ...BRAND_OPTIONS.map((b) => ({ value: b, label: b })),
    ...(brand && !BRAND_OPTIONS.includes(brand) ? [{ value: brand, label: brand }] : []),
    { value: '', label: '— select —' },
  ];

  const materialOptions = [
    ...MATERIAL_OPTIONS.map((m) => ({ value: m, label: m })),
    ...(material && !MATERIAL_OPTIONS.includes(material) ? [{ value: material, label: material }] : []),
    { value: '', label: '— select —' },
  ];

  async function handleConfirm() {
    setSaving(true);
    setError(null);
    const payload = {
      brand: brand || null,
      material: material || null,
      color: color || null,
      color_hex: colorHex,
      weight_grams: weight ? Number(weight) : null,
      remaining_grams: remaining ? Number(remaining) : null,
      print_temp_c: temp ? Number(temp) : null,
      print_speed_mm_s: speed ? Number(speed) : null,
    };

    if (t.mode === 'edit') {
      const { data, error: updateError } = await supabase
        .from('spools')
        .update(payload)
        .eq('id', t.spool.id)
        .select()
        .single();
      setSaving(false);
      if (updateError || !data) {
        setError(updateError?.message ?? 'Failed to save changes');
        return;
      }
      onSaved(data as Spool, {});
      return;
    }

    const { data, error: insertError } = await supabase.from('spools').insert(payload).select().single();
    if (insertError || !data) {
      setSaving(false);
      setError(insertError?.message ?? 'Failed to add to inventory');
      return;
    }
    await supabase.from('pending_scans').delete().eq('id', t.scan.id);
    setSaving(false);
    onSaved(data as Spool, { removePendingScanId: t.scan.id });
  }

  return (
    <Dialog
      open={!!target}
      title={isEdit ? 'Edit spool' : 'Review scan'}
      onClose={onCancel}
      footer={
        <>
          <Button variant="ghost" onClick={onCancel}>
            {isEdit ? 'Cancel' : 'Discard'}
          </Button>
          <Button variant="primary" disabled={saving} onClick={handleConfirm}>
            {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Confirm & add to inventory'}
          </Button>
        </>
      }
    >
      {!isEdit && (
        <div className="flex gap-3 mb-3.5">
          <div
            className="w-[72px] h-[72px] shrink-0 rounded-sm border border-border-subtle flex items-center justify-center text-text-tertiary text-[9px]"
            style={{
              background:
                'repeating-conic-gradient(var(--color-surface-raised) 0% 25%, var(--color-surface-hover) 0% 50%) 50% / 12px 12px',
            }}
          >
            [photo]
          </div>
          <p className="text-xs text-text-tertiary m-0">
            Fields the model found are prefilled and marked <b>detected</b>. Blank fields are marked{' '}
            <b>manual</b> — fill in or leave blank.
          </p>
        </div>
      )}
      {error && <p className="text-xs text-status-error mb-3">{error}</p>}
      <div className="grid grid-cols-2 gap-3">
        <Select label="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} options={brandOptions} />
        <Select label="Material" value={material} onChange={(e) => setMaterial(e.target.value)} options={materialOptions} />
        <Field
          label="Color name"
          value={color}
          detected={!isEdit && !!detected.color}
          onChange={setColor}
          prefix={<ColorSwatch color={colorHex ?? 'var(--color-gray-600)'} size={14} />}
        />
        <Field
          label="Weight (g)"
          value={weight}
          detected={!isEdit && detected.weight_grams != null}
          onChange={setWeight}
          type="number"
        />
        <Field label="Remaining (g)" value={remaining} detected={false} onChange={setRemaining} type="number" />
        <Field
          label="Print temp (°C)"
          value={temp}
          detected={!isEdit && detected.print_temp_c != null}
          onChange={setTemp}
          type="number"
        />
        <Field
          label="Print speed (mm/s)"
          value={speed}
          detected={!isEdit && detected.print_speed_mm_s != null}
          onChange={setSpeed}
          type="number"
        />
      </div>
    </Dialog>
  );
}
