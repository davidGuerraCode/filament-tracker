export interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  prefix?: React.ReactNode;
  error?: string;
  disabled?: boolean;
}
export declare function Input(props: InputProps): JSX.Element;
