import React from 'react';

export function Checkbox({ label, checked, onChange, disabled = false }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-primary)', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1 }}>
      <span style={{
        width: 16, height: 16, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        border: `1px solid ${checked ? 'var(--accent-primary)' : 'var(--border-default)'}`,
        background: checked ? 'var(--accent-primary)' : 'transparent', borderRadius: 'var(--radius-sm)',
        color: 'var(--text-on-accent)', fontSize: '11px',
      }}>{checked && '✓'}</span>
      <input type="checkbox" checked={checked} disabled={disabled} onChange={onChange} style={{ display: 'none' }} />
      {label}
    </label>
  );
}
