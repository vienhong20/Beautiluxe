// Coral Polish is a background-only accent — text on it stays Lagoon Ink.
export default function Badge({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-coral px-3 py-1 font-sans text-[13px] font-medium uppercase tracking-[0.08em] text-ink ${className}`}
    >
      {children}
    </span>
  );
}
