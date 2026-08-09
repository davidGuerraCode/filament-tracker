import { useState } from 'react';
import type { FormEvent } from 'react';
import { supabase } from '../lib/supabase';
import { Card, Input, Button, Badge } from '../components/ui';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin },
    });
    setLoading(false);
    if (signInError) {
      setError(signInError.message);
      return;
    }
    setSent(true);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-[360px]">
        <div className="mb-6">
          <div className="text-xl text-accent-primary font-bold">$ filament-tracker</div>
          <div className="text-xs text-text-tertiary">sign in to continue</div>
        </div>
        <Card>
          {sent ? (
            <div className="flex flex-col gap-3">
              <Badge tone="success" dot>
                check your email
              </Badge>
              <p className="text-sm text-text-secondary">
                Sent a sign-in link to <b className="text-text-primary">{email}</b>. Click it to continue — this
                tab will pick up the session automatically.
              </p>
              <Button variant="ghost" size="sm" onClick={() => setSent(false)}>
                Use a different email
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                label="Email"
                name="email"
                autoComplete="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={error ?? undefined}
              />
              <Button type="submit" disabled={loading || !email}>
                {loading ? 'Sending…' : 'Send magic link'}
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
