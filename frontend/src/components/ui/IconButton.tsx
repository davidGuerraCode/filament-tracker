import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface IconButtonProps {
  children: ReactNode;
  label: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'ghost' | 'solid' | 'outline';
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
}

const SIZE_CLASSES: Record<NonNullable<IconButtonProps['size']>, string> = {
  sm: 'size-7',
  md: 'size-9',
  lg: 'size-11',
};

export function IconButton({ children, label, size = 'md', variant = 'ghost', onClick, disabled = false }: IconButtonProps) {
  return (
    <button
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center rounded-sm font-mono text-md',
        'transition-colors duration-fast ease-standard',
        SIZE_CLASSES[size],
        variant === 'solid' && 'bg-accent-primary text-text-on-accent border border-transparent',
        variant === 'ghost' && 'bg-transparent text-text-primary border border-transparent hover:bg-surface-hover',
        variant === 'outline' && 'bg-transparent text-text-primary border border-border-default hover:bg-surface-hover',
        disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
      )}
    >
      {children}
    </button>
  );
}
