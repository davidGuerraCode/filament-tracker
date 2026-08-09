import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

const SIZE_CLASSES: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-2.5 py-1 text-xs',
  md: 'px-3.5 py-1.5 text-sm',
  lg: 'px-5 py-[9px] text-base',
};

const VARIANT_CLASSES: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-accent-primary text-text-on-accent border border-accent-primary hover:bg-surface-hover hover:text-white',
  secondary:
    'bg-surface-raised text-text-primary border border-border-default hover:bg-surface-hover hover:border-border-strong hover:text-white',
  ghost: 'bg-transparent text-text-primary border border-transparent hover:bg-surface-hover hover:border-border-strong hover:text-white',
  danger: 'bg-status-error text-text-on-accent border border-status-error hover:bg-surface-hover hover:border-border-strong hover:text-white',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  iconLeft = null,
  iconRight = null,
  onClick,
  type = 'button',
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-2 font-mono font-medium tracking-normal rounded-sm',
        'transition-colors duration-fast ease-standard',
        disabled ? 'opacity-45 cursor-not-allowed' : 'cursor-pointer',
        SIZE_CLASSES[size],
        VARIANT_CLASSES[variant],
      )}
    >
      {iconLeft}
      <span>{children}</span>
      {iconRight}
    </button>
  );
}
