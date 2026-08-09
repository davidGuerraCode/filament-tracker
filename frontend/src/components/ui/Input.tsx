import type { ChangeEvent, ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  name?: string;
  autoComplete?: string;
  prefix?: ReactNode;
  error?: string;
  disabled?: boolean;
}

export function Input({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  name,
  autoComplete,
  prefix,
  error,
  disabled = false,
}: InputProps) {
  return (
    <label className="flex flex-col gap-1 font-mono">
      {label && <span className="text-xs text-text-tertiary uppercase tracking-wide">{label}</span>}
      <span
        className={cn(
          'flex items-center gap-2 bg-surface-base border rounded-sm px-2.5 py-[7px]',
          error
            ? 'border-status-error'
            : 'border-border-default focus-within:border-border-focus focus-within:shadow-glow-focus',
          disabled && 'opacity-50',
        )}
      >
        {prefix && <span className="text-text-tertiary">{prefix}</span>}
        <input
          type={type}
          name={name}
          autoComplete={autoComplete}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          className="flex-1 bg-transparent border-none outline-none text-text-primary font-mono text-sm caret-caret"
        />
      </span>
      {error && <span className="text-xs text-status-error">{error}</span>}
    </label>
  );
}
