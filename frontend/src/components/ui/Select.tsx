import type { ChangeEvent } from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  label?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  disabled?: boolean;
}

export function Select({ label, value, onChange, options = [], disabled = false }: SelectProps) {
  return (
    <label className="flex flex-col gap-1 font-mono">
      {label && <span className="text-xs text-text-tertiary uppercase tracking-wide">{label}</span>}
      <span
        className={
          'relative flex items-center bg-surface-base border border-border-default rounded-sm ' +
          'focus-within:border-border-focus focus-within:shadow-glow-focus' +
          (disabled ? ' opacity-50' : '')
        }
      >
        <select
          value={value}
          disabled={disabled}
          onChange={onChange}
          className="flex-1 appearance-none bg-transparent border-none outline-none text-text-primary font-mono text-sm py-[7px] pl-2.5 pr-7"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value} className="bg-surface-card">
              {o.label}
            </option>
          ))}
        </select>
        <span className="absolute right-2.5 text-text-tertiary pointer-events-none text-xs">▾</span>
      </span>
    </label>
  );
}
