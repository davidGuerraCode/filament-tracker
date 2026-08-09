import { ReactNode } from 'react';
export interface IconButtonProps {
  children: ReactNode;
  label: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'ghost' | 'solid' | 'outline';
  onClick?: () => void;
  disabled?: boolean;
}
export declare function IconButton(props: IconButtonProps): JSX.Element;
