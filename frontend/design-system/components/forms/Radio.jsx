import React from 'react';

export function Radio({ label, checked, onChange, name, disabled = false }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-primary)', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1 }}>
      <span style={{
        width: 16, height: 16, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        border: `1px solid ${checked ? 'var(--accent-primary)' : 'var(--border-default)'}`,
      }}>
        {checked && <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-primary)' }} />}
      </span>
      <input type="radio" name={name} checked={checked} disabled={disabled} onChange={onChange} style={{ display: 'none' }} />
      {label}
    </label>
  );
}
