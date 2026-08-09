import type { ChangeEvent } from 'react';
import { cn } from '../../lib/cn';

export interface SwitchProps {
  label?: string;
  checked: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export function Switch({ label, checked, onChange, disabled = false }: SwitchProps) {
  return (
    <label
      className={cn(
        'inline-flex items-center gap-2 font-mono text-sm text-text-primary',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      )}
    >
      <span
        className={cn(
          'w-[34px] h-[18px] rounded-full relative border transition-colors duration-fast ease-standard',
          checked ? 'bg-accent-primary-dim border-accent-primary' : 'bg-surface-raised border-border-default',
        )}
      >
        <span
          className={cn(
            'absolute top-[1px] size-3.5 rounded-full transition-[left] duration-fast ease-standard',
            checked ? 'left-[17px] bg-accent-primary' : 'left-[1px] bg-gray-400',
          )}
        />
      </span>
      <input type="checkbox" checked={checked} disabled={disabled} onChange={onChange} className="hidden" />
      {label}
    </label>
  );
}
