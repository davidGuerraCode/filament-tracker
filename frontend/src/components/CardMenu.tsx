import { useEffect, useRef, useState } from 'react';
import { IconButton } from './ui';

export function CardMenu({ onEdit, onDelete }: { onEdit?: () => void; onDelete: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  return (
    <div ref={ref} className="relative" onClick={(e) => e.stopPropagation()}>
      <IconButton label="Card options" size="sm" variant="ghost" onClick={() => setOpen((o) => !o)}>
        ⋯
      </IconButton>
      {open && (
        <div className="absolute top-[110%] right-0 min-w-[120px] z-10 bg-surface-raised border border-border-default rounded-sm shadow-panel overflow-hidden font-mono">
          {onEdit && (
            <button
              onClick={() => {
                setOpen(false);
                onEdit();
              }}
              className="block w-full text-left px-3 py-2 bg-transparent border-none text-text-primary text-xs font-mono cursor-pointer hover:bg-surface-hover"
            >
              Edit
            </button>
          )}
          <button
            onClick={() => {
              setOpen(false);
              onDelete();
            }}
            className="block w-full text-left px-3 py-2 bg-transparent border-none text-status-error text-xs font-mono cursor-pointer hover:bg-surface-hover"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
