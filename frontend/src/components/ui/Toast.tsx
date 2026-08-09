import { cn } from '../../lib/cn';

export interface ToastProps {
  tone?: 'success' | 'error' | 'info';
  title: string;
  message?: string;
  onClose?: () => void;
}

const TONE_CLASSES: Record<NonNullable<ToastProps['tone']>, { border: string; text: string; icon: string }> = {
  success: { border: 'border-l-status-success', text: 'text-status-success', icon: '✓' },
  error: { border: 'border-l-status-error', text: 'text-status-error', icon: '✕' },
  info: { border: 'border-l-status-info', text: 'text-status-info', icon: 'i' },
};

export function Toast({ tone = 'info', title, message, onClose }: ToastProps) {
  const t = TONE_CLASSES[tone];
  return (
    <div
      className={cn(
        'flex gap-3 items-start bg-surface-card border border-border-subtle border-l-2 rounded-md px-4 py-3 min-w-[260px] font-mono shadow-panel',
        t.border,
      )}
    >
      <span className={cn('font-bold', t.text)}>{t.icon}</span>
      <div className="flex-1">
        <div className="text-text-primary text-sm font-semibold">{title}</div>
        {message && <div className="text-text-tertiary text-xs mt-0.5">{message}</div>}
      </div>
      {onClose && (
        <button onClick={onClose} className="bg-transparent border-none text-text-tertiary cursor-pointer font-mono">
          ×
        </button>
      )}
    </div>
  );
}
