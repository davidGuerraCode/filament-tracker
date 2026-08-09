import type { PendingScan } from '../types';
import { Card, Badge } from './ui';
import { useSignedPhotoUrl } from '../lib/useSignedPhotoUrl';

export function PendingCard({ item, onOpen }: { item: PendingScan; onOpen: (item: PendingScan) => void }) {
  const ready = item.status === 'ready';
  const photoUrl = useSignedPhotoUrl(item.photo_path);
  const queuedAt = new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <Card
      interactive={ready}
      onClick={() => ready && onOpen(item)}
      style={{ width: 220, borderStyle: ready ? 'solid' : 'dashed' }}
      className="flex flex-col gap-2.5"
    >
      <div
        className="w-full h-20 rounded-sm flex items-center justify-center overflow-hidden"
        style={
          photoUrl
            ? undefined
            : {
                opacity: ready ? 1 : 0.5,
                background:
                  'repeating-conic-gradient(var(--color-surface-raised) 0% 25%, var(--color-surface-hover) 0% 50%) 50% / 16px 16px',
              }
        }
      >
        {photoUrl ? (
          <img src={photoUrl} alt="Spool label" className="w-full h-full object-cover" />
        ) : (
          <span className="text-text-tertiary text-2xs">[ label photo ]</span>
        )}
      </div>
      {ready ? (
        <Badge tone="success" dot>
          READY TO REVIEW
        </Badge>
      ) : (
        <Badge tone="info" dot>
          PROCESSING…
        </Badge>
      )}
      <div className="text-2xs text-text-tertiary">queued {queuedAt}</div>
    </Card>
  );
}
