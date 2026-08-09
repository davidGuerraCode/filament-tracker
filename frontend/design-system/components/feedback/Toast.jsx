import React from 'react';

const TONES = {
  success: { border: 'var(--status-success)', icon: '✓' },
  error: { border: 'var(--status-error)', icon: '✕' },
  info: { border: 'var(--status-info)', icon: 'i' },
};

export function Toast({ tone = 'info', title, message, onClose }) {
  const t = TONES[tone] || TONES.info;
  return (
    <div style={{
      display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start',
      background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderLeft: `2px solid ${t.border}`,
      borderRadius: 'var(--radius-md)', padding: 'var(--space-3) var(--space-4)', minWidth: 260,
      fontFamily: 'var(--font-mono)', boxShadow: 'var(--shadow-panel)',
    }}>
      <span style={{ color: t.border, fontWeight: 'var(--weight-bold)' }}>{t.icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ color: 'var(--text-primary)', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-semibold)' }}>{title}</div>
        {message && <div style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-xs)', marginTop: 2 }}>{message}</div>}
      </div>
      {onClose && <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', fontFamily: 'var(--font-mono)' }}>×</button>}
    </div>
  );
}
