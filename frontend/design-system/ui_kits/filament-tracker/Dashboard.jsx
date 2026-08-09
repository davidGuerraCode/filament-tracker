function Dashboard({ spools, pending, onOpenSpool, onEditSpool, onDeleteSpool, onOpenPending, onScan, tab, setTab, query, setQuery }) {
  const { Tabs, Input, ScanFAB } = window.FilamentTrackerDesignSystem_5636be;
  const filtered = spools.filter(s => tab === 'low' ? (s.remaining / s.max < 0.2) : true)
    .filter(s => (s.brand + s.material + s.colorName).toLowerCase().includes(query.toLowerCase()));
  return (
    <div style={{ maxWidth: 980, margin: '0 auto', padding: '28px 24px 100px', fontFamily: 'var(--font-mono)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 'var(--text-xl)', color: 'var(--accent-primary)', fontWeight: 'var(--weight-bold)' }}>$ filament-tracker</div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{spools.length} spools tracked · local-only</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <Tabs items={[{ value: 'all', label: 'All' }, { value: 'low', label: 'Low stock' }]} active={tab} onChange={setTab} />
        <div style={{ flex: 1, minWidth: 200, maxWidth: 320 }}>
          <Input placeholder="grep brand, material, color…" value={query} onChange={e => setQuery(e.target.value)} />
        </div>
      </div>
      {pending.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)', marginBottom: 10 }}>Pending scans</div>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            {pending.map(p => <PendingCard key={p.id} item={p} onOpen={onOpenPending} />)}
          </div>
        </div>
      )}
      <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)', marginBottom: 10 }}>Inventory</div>
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
        {filtered.map(s => <SpoolCard key={s.id} spool={s} onOpen={onOpenSpool} onEdit={onEditSpool} onDelete={onDeleteSpool} />)}
        {filtered.length === 0 && <div style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-sm)' }}>No spools match.</div>}
      </div>
      <ScanFAB onClick={onScan} />
    </div>
  );
}
