function Field({ label, value, detected }) {
  const { Input, Badge } = window.FilamentTrackerDesignSystem_5636be;
  const [v, setV] = React.useState(value || '');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Input label={label} value={v} onChange={e => setV(e.target.value)} placeholder={detected ? undefined : '— not detected, enter manually —'} />
      {value ? <Badge tone="info">detected</Badge> : <Badge tone="neutral">manual</Badge>}
    </div>
  );
}

function ReviewEdit({ item, onCancel, onConfirm }) {
  const { Dialog, Select, Button } = window.FilamentTrackerDesignSystem_5636be;
  if (!item) return null;
  const d = item.extracted || {};
  const isEdit = !!item.editingSpoolId;
  return (
    <Dialog open={!!item} title={isEdit ? 'Edit spool' : 'Review scan'} onClose={onCancel} footer={
      <>
        <Button variant="ghost" onClick={onCancel}>{isEdit ? 'Cancel' : 'Discard'}</Button>
        <Button variant="primary" onClick={() => onConfirm(item)}>{isEdit ? 'Save changes' : 'Confirm & add to inventory'}</Button>
      </>
    }>
      {!isEdit && (
        <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
          <div style={{ width: 72, height: 72, flexShrink: 0, background: 'repeating-conic-gradient(var(--surface-raised) 0% 25%, var(--surface-hover) 0% 50%) 50% / 12px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-tertiary)', fontSize: 9 }}>[photo]</div>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', margin: 0 }}>
            Fields the model found are prefilled and marked <b>detected</b>. Blank fields are marked <b>manual</b> — fill in or leave blank.
          </p>
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Field label="Brand" value={d.brand} detected={!!d.brand} />
        <Select label="Material" value={d.material || ''} onChange={() => {}} options={[{ value: 'PLA', label: 'PLA' }, { value: 'PETG', label: 'PETG' }, { value: 'ABS', label: 'ABS' }, { value: '', label: '— select —' }]} />
        <Field label="Color name" value={d.colorName} detected={!!d.colorName} />
        <Field label="Weight (g)" value={d.weight} detected={!!d.weight} />
        <Field label="Print temp (°C)" value={d.temp} detected={!!d.temp} />
        <Field label="Print speed (mm/s)" value={d.speed} detected={!!d.speed} />
      </div>
    </Dialog>
  );
}
