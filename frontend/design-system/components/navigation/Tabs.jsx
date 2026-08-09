import React from 'react';

export function Tabs({ items = [], active, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 'var(--space-1)', borderBottom: '1px solid var(--border-subtle)', fontFamily: 'var(--font-mono)' }}>
      {items.map(it => {
        const isActive = it.value === active;
        return (
          <button key={it.value} onClick={() => onChange && onChange(it.value)} style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            padding: '8px 4px', marginBottom: -1,
            color: isActive ? 'var(--accent-primary)' : 'var(--text-tertiary)',
            borderBottom: `2px solid ${isActive ? 'var(--accent-primary)' : 'transparent'}`,
            fontSize: 'var(--text-sm)', fontWeight: isActive ? 'var(--weight-semibold)' : 'var(--weight-regular)',
          }}>{it.label}</button>
        );
      })}
    </div>
  );
}
