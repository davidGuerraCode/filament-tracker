import type { ChangeEvent } from 'react';
import { cn } from '../../lib/cn';

export interface RadioProps {
  label?: string;
  checked: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  disabled?: boolean;
}

export function Radio({ label, checked, onChange, name, disabled = false }: RadioProps) {
  return (
    <label
      className={cn(
        'inline-flex items-center gap-2 font-mono text-sm text-text-primary',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      )}
    >
      <span
        className={cn(
          'size-4 rounded-full inline-flex items-center justify-center border',
          checked ? 'border-accent-primary' : 'border-border-default',
        )}
      >
        {checked && <span className="size-2 rounded-full bg-accent-primary" />}
      </span>
      <input type="radio" name={name} checked={checked} disabled={disabled} onChange={onChange} className="hidden" />
      {label}
    </label>
  );
}
