import type { ChangeEvent } from 'react';
import { cn } from '../../lib/cn';

export interface CheckboxProps {
  label?: string;
  checked: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export function Checkbox({ label, checked, onChange, disabled = false }: CheckboxProps) {
  return (
    <label
      className={cn(
        'inline-flex items-center gap-2 font-mono text-sm text-text-primary',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      )}
    >
      <span
        className={cn(
          'size-4 inline-flex items-center justify-center rounded-sm border text-[11px] text-text-on-accent',
          checked ? 'bg-accent-primary border-accent-primary' : 'bg-transparent border-border-default',
        )}
      >
        {checked && '✓'}
      </span>
      <input type="checkbox" checked={checked} disabled={disabled} onChange={onChange} className="hidden" />
      {label}
    </label>
  );
}
