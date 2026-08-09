import React from 'react';

export function Tooltip({ children, label, side = 'top' }) {
  const [show, setShow] = React.useState(false);
  const pos = side === 'top' ? { bottom: '100%', marginBottom: 6 } : { top: '100%', marginTop: 6 };
  return (
    <span style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <span style={{
          position: 'absolute', left: '50%', transform: 'translateX(-50%)', ...pos,
          background: 'var(--gray-950)', color: 'var(--text-primary)', border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-sm)', padding: '4px 8px', fontSize: 'var(--text-2xs)', fontFamily: 'var(--font-mono)',
          whiteSpace: 'nowrap', zIndex: 20, boxShadow: 'var(--shadow-panel)',
        }}>{label}</span>
      )}
    </span>
  );
}
