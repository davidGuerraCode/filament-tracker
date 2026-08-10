import { useEffect, useMemo, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import type { PendingScan, Spool } from '../types';
import { Tabs, Input, ScanFAB, Toast } from '../components/ui';
import { SpoolCard } from '../components/SpoolCard';
import { PendingCard } from '../components/PendingCard';
import { ScanCapture } from '../components/ScanCapture';
import { ReviewEdit } from '../components/ReviewEdit';
import type { ReviewTarget } from '../components/ReviewEdit';

export function Dashboard({ session }: { session: Session }) {
  const userId = session.user.id;

  const [spools, setSpools] = useState<Spool[]>([]);
  const [pending, setPending] = useState<PendingScan[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('all');
  const [query, setQuery] = useState('');
  const [scanOpen, setScanOpen] = useState(false);
  const [reviewTarget, setReviewTarget] = useState<ReviewTarget | null>(null);
  const [toast, setToast] = useState<{ tone: 'success' | 'error' | 'info'; title: string } | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const [spoolsRes, pendingRes] = await Promise.all([
        supabase.from('spools').select('*').order('created_at', { ascending: false }),
        supabase.from('pending_scans').select('*').order('created_at', { ascending: false }),
      ]);
      if (cancelled) return;
      if (spoolsRes.data) setSpools(spoolsRes.data as Spool[]);
      if (pendingRes.data) setPending(pendingRes.data as PendingScan[]);
      setLoading(false);
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  useEffect(() => {
    const channel = supabase
      .channel('pending_scans_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'pending_scans', filter: `owner=eq.${userId}` },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setPending((prev) => [payload.new as PendingScan, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setPending((prev) => prev.map((p) => (p.id === payload.new.id ? (payload.new as PendingScan) : p)));
          } else if (payload.eventType === 'DELETE') {
            setPending((prev) => prev.filter((p) => p.id !== payload.old.id));
          }
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  const filtered = useMemo(() => {
    return spools
      .filter((s) => {
        if (tab !== 'low') return true;
        const max = s.weight_grams ?? 1000;
        const remaining = s.remaining_grams ?? max;
        return max > 0 && remaining / max < 0.2;
      })
      .filter((s) => `${s.brand ?? ''}${s.material ?? ''}${s.color ?? ''}`.toLowerCase().includes(query.toLowerCase()));
  }, [spools, tab, query]);

  function handleSaved(spool: Spool, opts: { removePendingScanId?: string }) {
    setSpools((prev) => {
      const exists = prev.some((s) => s.id === spool.id);
      return exists ? prev.map((s) => (s.id === spool.id ? spool : s)) : [spool, ...prev];
    });
    if (opts.removePendingScanId) {
      setPending((prev) => prev.filter((p) => p.id !== opts.removePendingScanId));
    }
    setReviewTarget(null);
    setToast({ tone: 'success', title: opts.removePendingScanId ? 'Added to inventory' : 'Spool updated' });
  }

  async function handleDelete(id: string) {
    const { error } = await supabase.from('spools').delete().eq('id', id);
    if (error) {
      setToast({ tone: 'error', title: error.message });
      return;
    }
    setSpools((prev) => prev.filter((s) => s.id !== id));
  }

  async function handleDeletePending(item: PendingScan) {
    await supabase.storage.from('spool-photos').remove([item.photo_path]);
    const { error } = await supabase.from('pending_scans').delete().eq('id', item.id);
    if (error) {
      setToast({ tone: 'error', title: error.message });
      return;
    }
    setPending((prev) => prev.filter((p) => p.id !== item.id));
  }

  return (
    <div className="max-w-[980px] mx-auto px-6 pt-7 pb-[100px] font-mono">
      <div className="flex justify-between items-baseline mb-5">
        <div>
          <div className="text-xl text-accent-primary font-bold">$ filament-tracker</div>
          <div className="text-xs text-text-tertiary">{spools.length} spools tracked · local-only</div>
        </div>
        <button
          onClick={() => supabase.auth.signOut()}
          className="bg-transparent border-none text-text-tertiary text-xs font-mono cursor-pointer hover:text-text-primary"
        >
          sign out
        </button>
      </div>

      <div className="flex gap-4 mb-4 flex-wrap items-center">
        <Tabs
          items={[
            { value: 'all', label: 'All' },
            { value: 'low', label: 'Low stock' },
          ]}
          active={tab}
          onChange={setTab}
        />
        <div className="flex-1 min-w-[200px] max-w-[320px]">
          <Input placeholder="grep brand, material, color…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
      </div>

      {pending.length > 0 && (
        <div className="mb-6">
          <div className="text-2xs text-text-tertiary uppercase tracking-wide mb-2.5">Pending scans</div>
          <div className="flex gap-3.5 flex-wrap">
            {pending.map((p) => (
              <PendingCard
                key={p.id}
                item={p}
                onOpen={(scan) => setReviewTarget({ mode: 'scan', scan })}
                onDelete={handleDeletePending}
              />
            ))}
          </div>
        </div>
      )}

      <div className="text-2xs text-text-tertiary uppercase tracking-wide mb-2.5">Inventory</div>
      <div className="flex gap-3.5 flex-wrap">
        {!loading &&
          filtered.map((s) => (
            <SpoolCard
              key={s.id}
              spool={s}
              onOpen={(spool) => setReviewTarget({ mode: 'edit', spool })}
              onEdit={(spool) => setReviewTarget({ mode: 'edit', spool })}
              onDelete={handleDelete}
            />
          ))}
        {!loading && filtered.length === 0 && <div className="text-text-tertiary text-sm">No spools match.</div>}
      </div>

      <ScanFAB onClick={() => setScanOpen(true)} />

      <ScanCapture
        open={scanOpen}
        userId={userId}
        onClose={() => setScanOpen(false)}
        onQueued={() => {
          setScanOpen(false);
          setToast({ tone: 'info', title: 'Photo queued — extraction running in background' });
        }}
        onError={(message) => setToast({ tone: 'error', title: message })}
      />

      <ReviewEdit target={reviewTarget} onCancel={() => setReviewTarget(null)} onSaved={handleSaved} />

      {toast && (
        <div className="fixed bottom-6 left-6 z-[60]">
          <Toast tone={toast.tone} title={toast.title} onClose={() => setToast(null)} />
        </div>
      )}
    </div>
  );
}
