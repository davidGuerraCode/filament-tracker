export interface TagProps {
  children: React.ReactNode;
  onRemove?: () => void;
  color?: string;
}
export declare function Tag(props: TagProps): JSX.Element;
