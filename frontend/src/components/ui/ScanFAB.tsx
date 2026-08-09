export interface ScanFABProps {
  onClick?: () => void;
  label?: string;
}

export function ScanFAB({ onClick, label = 'Scan' }: ScanFABProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 inline-flex items-center gap-2 bg-accent-primary hover:bg-accent-primary-strong text-text-on-accent border border-accent-primary rounded-md px-[18px] py-3 font-mono font-semibold text-sm cursor-pointer shadow-glow-accent tracking-wide"
    >
      <span aria-hidden className="text-md">
        ◉
      </span>
      {label}
    </button>
  );
}
