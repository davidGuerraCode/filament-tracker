import { useRef, useState } from 'react';
import { Dialog, Button } from './ui';
import { supabase } from '../lib/supabase';
import { uuidv4 } from '../lib/uuid';

export function ScanCapture({
  open,
  userId,
  onClose,
  onQueued,
  onError,
}: {
  open: boolean;
  userId: string;
  onClose: () => void;
  onQueued: () => void;
  onError: (message: string) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function reset() {
    setFile(null);
    setUploading(false);
  }

  function handleClose() {
    reset();
    onClose();
  }

  async function handleQueue() {
    if (!file) return;
    setUploading(true);
    try {
      const ext = file.name.includes('.') ? file.name.split('.').pop() : 'jpg';
      const path = `${userId}/${uuidv4()}.${ext}`;
      const { error } = await supabase.storage.from('spool-photos').upload(path, file, {
        contentType: file.type || 'image/jpeg',
      });
      if (error) {
        onError(error.message);
        return;
      }
      reset();
      onQueued();
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  }

  return (
    <Dialog
      open={open}
      title="Scan spool label"
      onClose={handleClose}
      footer={
        <>
          <Button variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" disabled={!file || uploading} onClick={handleQueue}>
            {uploading ? 'Uploading…' : 'Capture & queue'}
          </Button>
        </>
      }
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />
      <div
        onClick={() => inputRef.current?.click()}
        className={
          'h-[180px] border border-dashed border-border-strong rounded-md flex flex-col items-center justify-center gap-2 cursor-pointer bg-surface-base ' +
          (file ? 'text-accent-primary' : 'text-text-tertiary')
        }
      >
        <span className="text-2xl">{file ? '▣' : '◻'}</span>
        <span className="text-xs">{file ? 'Photo captured — tap to retake' : 'Tap to open camera'}</span>
      </div>
      <p className="text-xs text-text-tertiary mt-3">
        Uploads immediately. Extraction runs in the background — you'll get a "ready to review" card on the
        dashboard.
      </p>
    </Dialog>
  );
}
