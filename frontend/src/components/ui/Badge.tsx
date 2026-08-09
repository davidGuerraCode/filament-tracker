import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface BadgeProps {
  children: ReactNode;
  tone?: 'neutral' | 'success' | 'warning' | 'error' | 'info';
  dot?: boolean;
}

const TONE_CLASSES: Record<NonNullable<BadgeProps['tone']>, string> = {
  neutral: 'bg-surface-raised text-text-secondary border-border-default',
  success: 'bg-status-success-bg text-status-success border-status-success',
  warning: 'bg-status-warning-bg text-status-warning border-status-warning',
  error: 'bg-status-error-bg text-status-error border-status-error',
  info: 'bg-status-info-bg text-status-info border-status-info',
};

export function Badge({ children, tone = 'neutral', dot = false }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 font-mono text-2xs font-semibold uppercase tracking-wide rounded-sm border',
        TONE_CLASSES[tone],
      )}
    >
      {dot && <span className="size-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
