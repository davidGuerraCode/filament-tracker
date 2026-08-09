import React from 'react';

export function Switch({ label, checked, onChange, disabled = false }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-primary)', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1 }}>
      <span style={{
        width: 34, height: 18, borderRadius: 'var(--radius-pill)', position: 'relative',
        background: checked ? 'var(--accent-primary-dim)' : 'var(--surface-raised)',
        border: `1px solid ${checked ? 'var(--accent-primary)' : 'var(--border-default)'}`,
        transition: 'background var(--duration-fast) var(--ease-standard)',
      }}>
        <span style={{
          position: 'absolute', top: 1, left: checked ? 17 : 1, width: 14, height: 14, borderRadius: '50%',
          background: checked ? 'var(--accent-primary)' : 'var(--gray-400)',
          transition: 'left var(--duration-fast) var(--ease-standard)',
        }} />
      </span>
      <input type="checkbox" checked={checked} disabled={disabled} onChange={onChange} style={{ display: 'none' }} />
      {label}
    </label>
  );
}
