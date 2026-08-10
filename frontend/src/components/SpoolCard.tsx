import { useState } from 'react';
import type { Spool } from '../types';
import { Card, ColorSwatch, ProgressBar, Badge, Dialog, Button } from './ui';
import { CardMenu } from './CardMenu';

const DEFAULT_MAX_GRAMS = 1000;

export function SpoolCard({
  spool,
  onOpen,
  onEdit,
  onDelete,
}: {
  spool: Spool;
  onOpen: (spool: Spool) => void;
  onEdit: (spool: Spool) => void;
  onDelete: (id: string) => void;
}) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const max = spool.weight_grams ?? DEFAULT_MAX_GRAMS;
  const remaining = spool.remaining_grams ?? max;
  const low = max > 0 && remaining / max < 0.2;

  return (
    <Card interactive onClick={() => onOpen(spool)} style={{ width: 220 }} className="flex flex-col gap-2.5">
      <div className="flex justify-between items-center">
        <ColorSwatch color={spool.color_hex || 'var(--color-gray-600)'} size={22} />
        <CardMenu onEdit={() => onEdit(spool)} onDelete={() => setConfirmOpen(true)} />
      </div>
      {low && (
        <Badge tone="warning" dot>
          LOW
        </Badge>
      )}
      <Dialog
        open={confirmOpen}
        title="Delete spool?"
        onClose={() => setConfirmOpen(false)}
        footer={
          <>
            <Button variant="ghost" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                setConfirmOpen(false);
                onDelete(spool.id);
              }}
            >
              Delete
            </Button>
          </>
        }
      >
        <span onClick={(e) => e.stopPropagation()}>
          This removes <b>{spool.brand || 'this spool'} — {spool.color || 'unknown color'}</b> from inventory
          permanently.
        </span>
      </Dialog>
      <div>
        <div className="text-sm font-semibold text-text-primary">{spool.brand || '— no brand —'}</div>
        <div className="text-xs text-text-tertiary">
          {spool.material || '—'} · {spool.color || '—'}
        </div>
      </div>
      <ProgressBar label="Remaining" value={remaining} max={max} low={low} />
      <div className="flex gap-1.5 text-2xs text-text-tertiary">
        <span>{spool.print_temp_c ? `${spool.print_temp_c}°C` : '—°C'}</span>
        <span>·</span>
        <span>{spool.print_speed_mm_s ? `${spool.print_speed_mm_s} mm/s` : 'speed: —'}</span>
      </div>
    </Card>
  );
}
