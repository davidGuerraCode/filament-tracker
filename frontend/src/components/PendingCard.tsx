import { useState } from 'react';
import type { PendingScan } from '../types';
import { Card, Badge, Dialog, Button } from './ui';
import { useSignedPhotoUrl } from '../lib/useSignedPhotoUrl';
import { CardMenu } from './CardMenu';

export function PendingCard({
  item,
  onOpen,
  onDelete,
}: {
  item: PendingScan;
  onOpen: (item: PendingScan) => void;
  onDelete: (item: PendingScan) => void;
}) {
  const [confirmOpen, setConfirmOpen] = useState(false);
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
      <div className="flex justify-end">
        <CardMenu onDelete={() => setConfirmOpen(true)} />
      </div>
      <Dialog
        open={confirmOpen}
        title="Delete pending scan?"
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
                onDelete(item);
              }}
            >
              Delete
            </Button>
          </>
        }
      >
        <span onClick={(e) => e.stopPropagation()}>
          This removes the queued label photo and discards {ready ? 'its extracted fields' : 'its extraction in progress'}
          . This can't be undone.
        </span>
      </Dialog>
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
