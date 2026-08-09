import React from 'react';

export function ColorSwatch({ color, size = 20, label }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', fontFamily: 'var(--font-mono)' }}>
      <span style={{
        width: size, height: size, background: color, borderRadius: 'var(--radius-sm)',
        border: '1px solid rgba(255,255,255,0.18)', flexShrink: 0,
      }} />
      {label && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>{label}</span>}
    </span>
  );
}
