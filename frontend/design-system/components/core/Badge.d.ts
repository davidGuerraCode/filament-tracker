import { ReactNode } from 'react';
export interface BadgeProps {
  children: ReactNode;
  tone?: 'neutral' | 'success' | 'warning' | 'error' | 'info';
  dot?: boolean;
}
export declare function Badge(props: BadgeProps): JSX.Element;
