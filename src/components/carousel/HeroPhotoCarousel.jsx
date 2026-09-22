import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';

const INTERVAL_MS = 5000;

// Ambient auto-crossfade for the Hero photo — no manual controls, it just
// quietly cycles the salon's real interior shots. Pauses on hover/focus so
// a visitor reading the caption doesn't have the image change under them,
// and holds on the first photo under prefers-reduced-motion.
export default function HeroPhotoCarousel({ items, className = '' }) {
  const count = items.length;
  const [index, setIndex] = useState(0);
  const paused = useRef(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || count <= 1) return undefined;
    const id = setInterval(() => {
      if (!paused.current) setIndex((i) => (i + 1) % count);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [reduce, count]);

  const pause = () => {
    paused.current = true;
  };
  const resume = () => {
    paused.current = false;
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
    >
      {items.map((item, i) => (
        <img
          key={item.src}
          src={item.src}
          alt={item.alt}
          width="1086"
          height="1448"
          fetchpriority={i === 0 ? 'high' : 'auto'}
          loading={i === 0 ? 'eager' : 'lazy'}
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1100ms] ease-in-out ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {count > 1 && (
        <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center gap-1.5" aria-hidden="true">
          {items.map((item, i) => (
            <span
              key={item.src}
              className={`h-1.5 rounded-full shadow-sm transition-all duration-300 ${
                i === index ? 'w-5 bg-foam' : 'w-1.5 bg-foam/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
