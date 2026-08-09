function ScanCapture({ open, onClose, onQueue }) {
  const { Dialog, Button } = window.FilamentTrackerDesignSystem_5636be;
  const [captured, setCaptured] = React.useState(false);
  return (
    <Dialog open={open} title="Scan spool label" onClose={onClose} footer={
      <>
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button variant="primary" disabled={!captured} onClick={() => { onQueue(); setCaptured(false); }}>Capture & queue</Button>
      </>
    }>
      <div onClick={() => setCaptured(true)} style={{
        height: 180, border: '1px dashed var(--border-strong)', borderRadius: 'var(--radius-md)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        color: captured ? 'var(--accent-primary)' : 'var(--text-tertiary)', flexDirection: 'column', gap: 8,
        background: 'var(--surface-base)',
      }}>
        <span style={{ fontSize: 24 }}>{captured ? '▣' : '◻'}</span>
        <span style={{ fontSize: 'var(--text-xs)' }}>{captured ? 'Photo captured — tap to retake' : 'Tap to open camera'}</span>
      </div>
      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 12 }}>
        Uploads immediately. Extraction runs in the background — you'll get a "ready to review" card on the dashboard.
      </p>
    </Dialog>
  );
}
