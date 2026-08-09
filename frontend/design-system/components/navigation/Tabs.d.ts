export interface TabItem { value: string; label: string; }
export interface TabsProps {
  items: TabItem[];
  active: string;
  onChange?: (value: string) => void;
}
export declare function Tabs(props: TabsProps): JSX.Element;
