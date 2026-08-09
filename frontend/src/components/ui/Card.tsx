import type { CSSProperties, MouseEvent, ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface CardProps {
  children: ReactNode;
  padded?: boolean;
  interactive?: boolean;
  style?: CSSProperties;
  className?: string;
  onClick?: (e: MouseEvent) => void;
}

export function Card({ children, padded = true, interactive = false, style, className, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      style={style}
      className={cn(
        'bg-surface-card border border-border-subtle rounded-md font-mono text-text-primary',
        'transition-colors duration-fast ease-standard',
        padded ? 'p-4' : 'p-0',
        interactive ? 'cursor-pointer hover:border-border-strong' : 'cursor-default',
        className,
      )}
    >
      {children}
    </div>
  );
}
