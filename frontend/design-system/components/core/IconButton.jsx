import React from 'react';

export function IconButton({ children, label, size = 'md', variant = 'ghost', onClick, disabled = false }) {
  const [hover, setHover] = React.useState(false);
  const dim = size === 'sm' ? 28 : size === 'lg' ? 44 : 36;
  const bg = variant === 'solid' ? 'var(--accent-primary)' : hover ? 'var(--surface-hover)' : 'transparent';
  const color = variant === 'solid' ? 'var(--text-on-accent)' : 'var(--text-primary)';
  return (
    <button aria-label={label} title={label} disabled={disabled} onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        width: dim, height: dim, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        background: bg, color, border: variant === 'outline' ? '1px solid var(--border-default)' : '1px solid transparent',
        borderRadius: 'var(--radius-sm)', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.4 : 1,
        fontFamily: 'var(--font-mono)', fontSize: 'var(--text-md)', transition: 'background var(--duration-fast) var(--ease-standard)',
      }}>
      {children}
    </button>
  );
}
