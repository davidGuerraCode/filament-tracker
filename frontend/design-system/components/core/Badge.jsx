import React from 'react';

const TONES = {
  neutral: { bg: 'var(--surface-raised)', fg: 'var(--text-secondary)', border: 'var(--border-default)' },
  success: { bg: 'var(--status-success-bg)', fg: 'var(--status-success)', border: 'var(--status-success)' },
  warning: { bg: 'var(--status-warning-bg)', fg: 'var(--status-warning)', border: 'var(--status-warning)' },
  error: { bg: 'var(--status-error-bg)', fg: 'var(--status-error)', border: 'var(--status-error)' },
  info: { bg: 'var(--status-info-bg)', fg: 'var(--status-info)', border: 'var(--status-info)' },
};

export function Badge({ children, tone = 'neutral', dot = false }) {
  const t = TONES[tone] || TONES.neutral;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '6px',
      padding: '2px 8px', fontSize: 'var(--text-2xs)', fontWeight: 'var(--weight-semibold)',
      textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)',
      background: t.bg, color: t.fg, border: `1px solid ${t.border}`, borderRadius: 'var(--radius-sm)',
      fontFamily: 'var(--font-mono)',
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: t.fg }} />}
      {children}
    </span>
  );
}
