function PendingCard({ item, onOpen }) {
  const { Card, Badge } = window.FilamentTrackerDesignSystem_5636be;
  const ready = item.status === 'ready';
  return (
    <Card interactive={ready} onClick={() => ready && onOpen(item)} style={{ width: 220, display: 'flex', flexDirection: 'column', gap: 10, borderStyle: ready ? 'solid' : 'dashed' }}>
      <div style={{ width: '100%', height: 80, background: 'repeating-conic-gradient(var(--surface-raised) 0% 25%, var(--surface-hover) 0% 50%) 50% / 16px 16px', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: ready ? 1 : 0.5 }}>
        <span style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-2xs)' }}>[ label photo ]</span>
      </div>
      {ready ? <Badge tone="success" dot>READY TO REVIEW</Badge> : <Badge tone="info" dot>PROCESSING…</Badge>}
      <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-tertiary)' }}>queued {item.queuedAt}</div>
    </Card>
  );
}
