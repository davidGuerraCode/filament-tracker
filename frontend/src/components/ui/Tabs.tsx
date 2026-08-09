import { cn } from '../../lib/cn';

export interface TabItem {
  value: string;
  label: string;
}

export interface TabsProps {
  items: TabItem[];
  active: string;
  onChange?: (value: string) => void;
}

export function Tabs({ items = [], active, onChange }: TabsProps) {
  return (
    <div className="flex gap-1 border-b border-border-subtle font-mono">
      {items.map((it) => {
        const isActive = it.value === active;
        return (
          <button
            key={it.value}
            onClick={() => onChange?.(it.value)}
            className={cn(
              'bg-transparent border-none border-b-2 cursor-pointer px-1 py-2 -mb-px text-sm',
              isActive ? 'text-accent-primary border-accent-primary font-semibold' : 'text-text-tertiary border-transparent font-normal',
            )}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}
