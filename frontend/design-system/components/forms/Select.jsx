import React from 'react';

export function Select({ label, value, onChange, options = [], disabled = false }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', fontFamily: 'var(--font-mono)' }}>
      {label && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)' }}>{label}</span>}
      <span style={{
        position: 'relative', display: 'flex', alignItems: 'center',
        background: 'var(--surface-base)', border: `1px solid ${focus ? 'var(--border-focus)' : 'var(--border-default)'}`,
        borderRadius: 'var(--radius-sm)', opacity: disabled ? 0.5 : 1,
        boxShadow: focus ? 'var(--glow-focus)' : 'none',
      }}>
        <select value={value} disabled={disabled} onChange={onChange}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{
            flex: 1, appearance: 'none', background: 'transparent', border: 'none', outline: 'none',
            color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)',
            padding: '7px 28px 7px 10px',
          }}>
          {options.map(o => <option key={o.value} value={o.value} style={{ background: 'var(--surface-card)' }}>{o.label}</option>)}
        </select>
        <span style={{ position: 'absolute', right: 10, color: 'var(--text-tertiary)', pointerEvents: 'none', fontSize: 'var(--text-xs)' }}>▾</span>
      </span>
    </label>
  );
}
