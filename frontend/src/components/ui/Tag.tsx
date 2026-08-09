import type { ReactNode } from 'react';

export interface TagProps {
  children: ReactNode;
  onRemove?: () => void;
  color?: string;
}

export function Tag({ children, onRemove, color }: TagProps) {
  return (
    <span className="inline-flex items-center gap-1.5 pl-1.5 pr-2 py-[3px] font-mono text-xs text-text-secondary bg-surface-raised border border-border-subtle rounded-sm">
      {color && (
        <span
          className="size-2.5 rounded-[2px] border border-white/15"
          style={{ backgroundColor: color }}
        />
      )}
      {children}
      {onRemove && (
        <button
          onClick={onRemove}
          aria-label="Remove"
          className="bg-transparent border-none text-text-tertiary cursor-pointer font-mono text-xs p-0 leading-none"
        >
          ×
        </button>
      )}
    </span>
  );
}
