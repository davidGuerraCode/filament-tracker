import { useEffect, useState } from 'react';
import { supabase } from './supabase';

export function useSignedPhotoUrl(photoPath: string | null | undefined): string | null {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    setUrl(null);
    if (!photoPath) return;
    let cancelled = false;
    supabase.storage
      .from('spool-photos')
      .createSignedUrl(photoPath, 3600)
      .then(({ data }) => {
        if (!cancelled && data) setUrl(data.signedUrl);
      });
    return () => {
      cancelled = true;
    };
  }, [photoPath]);

  return url;
}
