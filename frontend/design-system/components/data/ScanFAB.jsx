import React from 'react';

export function ScanFAB({ onClick, label = 'Scan' }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
      position: 'fixed', bottom: 24, right: 24, display: 'inline-flex', alignItems: 'center', gap: 8,
      background: hover ? 'var(--accent-primary-strong)' : 'var(--accent-primary)', color: 'var(--text-on-accent)',
      border: '1px solid var(--accent-primary)', borderRadius: 'var(--radius-md)', padding: '12px 18px',
      fontFamily: 'var(--font-mono)', fontWeight: 'var(--weight-semibold)', fontSize: 'var(--text-sm)',
      cursor: 'pointer', boxShadow: 'var(--glow-accent)', letterSpacing: 'var(--tracking-wide)',
    }}>
      <span aria-hidden style={{ fontSize: 'var(--text-md)' }}>◉</span>
      {label}
    </button>
  );
}
