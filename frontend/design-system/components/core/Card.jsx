import React from 'react';

export function Card({ children, padded = true, interactive = false, style }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => interactive && setHover(true)}
      onMouseLeave={() => interactive && setHover(false)}
      style={{
        background: 'var(--surface-card)',
        border: `1px solid ${interactive && hover ? 'var(--border-strong)' : 'var(--border-subtle)'}`,
        borderRadius: 'var(--radius-md)', padding: padded ? 'var(--space-4)' : 0,
        transition: 'border-color var(--duration-fast) var(--ease-standard)',
        cursor: interactive ? 'pointer' : 'default',
        fontFamily: 'var(--font-mono)', color: 'var(--text-primary)',
        ...style,
      }}>
      {children}
    </div>
  );
}
