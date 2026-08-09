export interface ColorSwatchProps {
  color: string;
  size?: number;
  label?: string;
}

export function ColorSwatch({ color, size = 20, label }: ColorSwatchProps) {
  return (
    <span className="inline-flex items-center gap-2 font-mono">
      <span
        className="rounded-sm border border-white/18 shrink-0"
        style={{ width: size, height: size, backgroundColor: color }}
      />
      {label && <span className="text-xs text-text-secondary">{label}</span>}
    </span>
  );
}
