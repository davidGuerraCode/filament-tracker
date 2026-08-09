function CardMenu({ onEdit, onDelete }) {
  const { IconButton } = window.FilamentTrackerDesignSystem_5636be;
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);
  return (
    <div ref={ref} style={{ position: 'relative' }} onClick={e => e.stopPropagation()}>
      <IconButton label="Card options" size="sm" variant="ghost" onClick={() => setOpen(o => !o)}>⋯</IconButton>
      {open && (
        <div style={{
          position: 'absolute', top: '110%', right: 0, minWidth: 120, zIndex: 10,
          background: 'var(--surface-raised)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-sm)',
          boxShadow: 'var(--shadow-panel)', overflow: 'hidden', fontFamily: 'var(--font-mono)',
        }}>
          <button onClick={() => { setOpen(false); onEdit(); }} style={{
            display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', background: 'transparent',
            border: 'none', color: 'var(--text-primary)', fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)', cursor: 'pointer',
          }} onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-hover)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>Edit</button>
          <button onClick={() => { setOpen(false); onDelete(); }} style={{
            display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', background: 'transparent',
            border: 'none', color: 'var(--status-error)', fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)', cursor: 'pointer',
          }} onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-hover)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>Delete</button>
        </div>
      )}
    </div>
  );
}

function SpoolCard({ spool, onOpen, onEdit, onDelete }) {
  const { Card, ColorSwatch, ProgressBar, Badge, Dialog, Button } = window.FilamentTrackerDesignSystem_5636be;
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const low = spool.remaining / spool.max < 0.2;
  return (
    <Card interactive onClick={() => onOpen(spool)} style={{ width: 220, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <ColorSwatch color={spool.hex} size={22} />
        <CardMenu onEdit={() => onEdit(spool)} onDelete={() => setConfirmOpen(true)} />
      </div>
      {low && <Badge tone="warning" dot>LOW</Badge>}
      <Dialog open={confirmOpen} title="Delete spool?" onClose={(e) => { setConfirmOpen(false); }} footer={
        <React.Fragment>
          <Button variant="ghost" onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button variant="danger" onClick={() => { setConfirmOpen(false); onDelete(spool.id); }}>Delete</Button>
        </React.Fragment>
      }>
        <span onClick={e => e.stopPropagation()}>This removes <b>{spool.brand} — {spool.colorName}</b> from inventory permanently.</span>
      </Dialog>
      <div>
        <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-semibold)', color: 'var(--text-primary)' }}>{spool.brand}</div>
        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{spool.material} · {spool.colorName}</div>
      </div>
      <ProgressBar label="Remaining" value={spool.remaining} max={spool.max} low={low} />
      <div style={{ display: 'flex', gap: 6, fontSize: 'var(--text-2xs)', color: 'var(--text-tertiary)' }}>
        <span>{spool.temp}°C</span><span>·</span><span>{spool.speed ? spool.speed + ' mm/s' : 'speed: —'}</span>
      </div>
    </Card>
  );
}
