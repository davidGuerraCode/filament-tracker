import React from 'react';

export function Input({ label, placeholder, value, onChange, type = 'text', prefix, error, disabled = false }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', fontFamily: 'var(--font-mono)' }}>
      {label && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)' }}>{label}</span>}
      <span style={{
        display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
        background: 'var(--surface-base)', border: `1px solid ${error ? 'var(--status-error)' : focus ? 'var(--border-focus)' : 'var(--border-default)'}`,
        borderRadius: 'var(--radius-sm)', padding: '7px 10px',
        boxShadow: focus && !error ? 'var(--glow-focus)' : 'none', opacity: disabled ? 0.5 : 1,
      }}>
        {prefix && <span style={{ color: 'var(--text-tertiary)' }}>{prefix}</span>}
        <input type={type} value={value} placeholder={placeholder} disabled={disabled}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          onChange={onChange}
          style={{
            flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)',
            fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', caretColor: 'var(--caret)',
          }} />
      </span>
      {error && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--status-error)' }}>{error}</span>}
    </label>
  );
}
