import React from 'react';

export function Tag({ children, onRemove, color }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '3px 8px 3px 6px',
      fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)',
      background: 'var(--surface-raised)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)',
    }}>
      {color && <span style={{ width: 10, height: 10, borderRadius: '2px', background: color, border: '1px solid rgba(255,255,255,0.15)' }} />}
      {children}
      {onRemove && (
        <button onClick={onRemove} aria-label="Remove" style={{
          background: 'transparent', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer',
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', padding: 0, lineHeight: 1,
        }}>×</button>
      )}
    </span>
  );
}
