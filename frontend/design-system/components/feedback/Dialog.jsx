import React from 'react';

export function Dialog({ open, title, children, onClose, footer }) {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'var(--surface-overlay)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 50, fontFamily: 'var(--font-mono)',
    }}>
      <div style={{
        width: 420, maxWidth: '92vw', background: 'var(--surface-card)', border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-overlay)',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--border-subtle)',
        }}>
          <span style={{ color: 'var(--text-primary)', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-semibold)' }}>{title}</span>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', fontSize: 'var(--text-md)' }}>×</button>
        </div>
        <div style={{ padding: 'var(--space-4)', color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>{children}</div>
        {footer && <div style={{ padding: 'var(--space-3) var(--space-4)', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-2)' }}>{footer}</div>}
      </div>
    </div>
  );
}
