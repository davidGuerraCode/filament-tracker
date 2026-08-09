import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface TooltipProps {
  children: ReactNode;
  label: string;
  side?: 'top' | 'bottom';
}

export function Tooltip({ children, label, side = 'top' }: TooltipProps) {
  return (
    <span className="relative inline-flex group">
      {children}
      <span
        className={cn(
          'hidden group-hover:block absolute left-1/2 -translate-x-1/2 whitespace-nowrap z-20',
          'bg-gray-950 text-text-primary border border-border-default rounded-sm px-2 py-1',
          'text-2xs font-mono shadow-panel',
          side === 'top' ? 'bottom-full mb-1.5' : 'top-full mt-1.5',
        )}
      >
        {label}
      </span>
    </span>
  );
}
