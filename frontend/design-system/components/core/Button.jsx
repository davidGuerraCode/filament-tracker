import React from 'react';

const SIZES = {
  sm: { padding: '4px 10px', fontSize: 'var(--text-xs)' },
  md: { padding: '6px 14px', fontSize: 'var(--text-sm)' },
  lg: { padding: '9px 20px', fontSize: 'var(--text-base)' },
};

const VARIANTS = {
  primary: { background: 'var(--accent-primary)', color: 'var(--text-on-accent)', border: '1px solid var(--accent-primary)' },
  secondary: { background: 'var(--surface-raised)', color: 'var(--text-primary)', border: '1px solid var(--border-default)' },
  ghost: { background: 'transparent', color: 'var(--text-primary)', border: '1px solid transparent' },
  danger: { background: 'var(--status-error)', color: 'var(--text-on-accent)', border: '1px solid var(--status-error)' },
};

export function Button({ children, variant = 'primary', size = 'md', disabled = false, iconLeft = null, iconRight = null, onClick, type = 'button' }) {
  const [hover, setHover] = React.useState(false);
  const v = VARIANTS[variant] || VARIANTS.primary;
  const s = SIZES[size] || SIZES.md;
  const style = {
    display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
    fontFamily: 'var(--font-mono)', fontWeight: 'var(--weight-medium)', letterSpacing: 'var(--tracking-normal)',
    borderRadius: 'var(--radius-sm)', cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard)',
    opacity: disabled ? 0.45 : 1,
    ...s, ...v,
    background: hover && !disabled ? 'var(--surface-hover)' : v.background,
    borderColor: hover && !disabled && variant !== 'primary' ? 'var(--border-strong)' : v.border.split(' ').pop(),
    color: hover && !disabled ? '#ffffff' : v.color,
  };
  return (
    <button type={type} disabled={disabled} onClick={onClick} style={style}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      {iconLeft}
      <span>{children}</span>
      {iconRight}
    </button>
  );
}
