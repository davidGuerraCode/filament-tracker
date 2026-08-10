// crypto.randomUUID() only exists in secure contexts (https, or localhost).
// The LAN dev URL a phone hits is plain http on a non-localhost host, where
// it's undefined -- crypto.getRandomValues() has no such restriction, so
// build a UUID v4 from it instead of relying on randomUUID.
export function uuidv4(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}
