const PALETTE = ['bg-jade text-foam', 'bg-gold text-ink', 'bg-coral text-ink'];

function initialsOf(name) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
}

// Fallback avatar for reviewers we don't have a photo on file for — a
// brand-colored initials monogram rather than a stock/placeholder face.
export default function InitialAvatar({ name, size = 52, className = '' }) {
  const sum = Array.from(name).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const tone = PALETTE[sum % PALETTE.length];
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-display font-semibold ring-2 ring-gold/60 ${tone} ${className}`}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.36) }}
      aria-hidden="true"
    >
      {initialsOf(name)}
    </span>
  );
}
