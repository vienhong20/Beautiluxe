import { Star } from 'lucide-react';

// Foil Gold stars — dark surfaces (Deep Jade / Lagoon Ink) only.
export default function RatingStars({ value = 5, size = 18, label }) {
  const full = Math.round(value);
  return (
    <span className="inline-flex items-center gap-0.5" role="img" aria-label={label ?? `${value} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={1.5}
          className="text-gold"
          fill={i < full ? 'currentColor' : 'none'}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}
