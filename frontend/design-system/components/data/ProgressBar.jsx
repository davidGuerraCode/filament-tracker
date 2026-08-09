import React from 'react';

export function ProgressBar({ value, max = 100, low = false, label }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const color = low ? 'var(--status-warning)' : 'var(--accent-primary)';
  return (
    <div style={{ fontFamily: 'var(--font-mono)' }}>
      {label && (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-2xs)', color: 'var(--text-tertiary)', marginBottom: 4 }}>
          <span>{label}</span><span>{Math.round(pct)}%</span>
        </div>
      )}
      <div style={{ height: 6, background: 'var(--surface-raised)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: pct + '%', background: color, transition: 'width var(--duration-base) var(--ease-standard)' }} />
      </div>
    </div>
  );
}
