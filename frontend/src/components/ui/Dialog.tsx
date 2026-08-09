import type { ReactNode } from 'react';

export interface DialogProps {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose?: () => void;
  footer?: ReactNode;
}

export function Dialog({ open, title, children, onClose, footer }: DialogProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-surface-overlay flex items-center justify-center z-50 font-mono">
      <div className="w-[420px] max-w-[92vw] bg-surface-card border border-border-default rounded-md shadow-overlay">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle">
          <span className="text-text-primary text-sm font-semibold">{title}</span>
          <button onClick={onClose} className="bg-transparent border-none text-text-tertiary cursor-pointer text-md">
            ×
          </button>
        </div>
        <div className="px-4 py-4 text-text-secondary text-sm">{children}</div>
        {footer && <div className="px-4 py-3 border-t border-border-subtle flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
}
