export interface ProgressBarProps {
  value: number;
  max?: number;
  low?: boolean;
  label?: string;
}

export function ProgressBar({ value, max = 100, low = false, label }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className="font-mono">
      {label && (
        <div className="flex justify-between text-2xs text-text-tertiary mb-1">
          <span>{label}</span>
          <span>{Math.round(pct)}%</span>
        </div>
      )}
      <div className="h-1.5 bg-surface-raised border border-border-subtle rounded-sm overflow-hidden">
        <div
          className={low ? 'h-full bg-status-warning transition-[width] duration-base ease-standard' : 'h-full bg-accent-primary transition-[width] duration-base ease-standard'}
          style={{ width: pct + '%' }}
        />
      </div>
    </div>
  );
}
