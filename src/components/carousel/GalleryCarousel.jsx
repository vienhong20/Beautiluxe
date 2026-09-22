import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import './GalleryCarousel.css';

const AUTOPLAY_MS = 3200;

// Items stay in a fixed, real order (all of them — nothing is hidden to
// fake an "infinite" list); only each item's *distance* from the active
// index drives its width/filter, so the whole strip settles into the
// familiar "compress the far ones, expand the active one" shape without
// needing to physically reorder the DOM to keep a taper illusion aligned.
export default function GalleryCarousel({ items }) {
  const count = items.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const paused = useRef(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return undefined;
    const id = setInterval(() => {
      if (!paused.current) setActiveIndex((i) => (i + 1) % count);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [reduce, count]);

  const pause = () => {
    paused.current = true;
  };
  const resume = () => {
    paused.current = false;
  };

  const step = (direction) => setActiveIndex((i) => (i + direction + count) % count);

  const onKeyDown = (e, i) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      step(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      step(-1);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveIndex(i);
    }
  };

  return (
    <div className="gallery-carousel" onMouseEnter={pause} onMouseLeave={resume} onTouchStart={pause} onTouchEnd={resume}>
      <ul className="gallery-carousel__list" aria-label="Nail art gallery, browse with the arrow keys">
        {items.map((item, i) => {
          const raw = Math.abs(i - activeIndex);
          const dist = Math.min(raw, count - raw);
          const isActive = dist === 0;
          return (
            <li
              key={item.title}
              tabIndex={0}
              role="button"
              aria-label={`Show ${item.title}`}
              aria-pressed={isActive}
              data-active={isActive ? '' : undefined}
              data-dist={dist === 1 ? '1' : undefined}
              className="gallery-carousel__item"
              onClick={() => setActiveIndex(i)}
              onFocus={() => {
                pause();
                setActiveIndex(i);
              }}
              onBlur={resume}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              <img
                className="gallery-carousel__img"
                src={item.src}
                alt={item.alt}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
              <span className="gallery-carousel__scrim" aria-hidden="true" />
              <span className="gallery-carousel__caption">
                <span className="gallery-carousel__title">{item.title}</span>
                <span className="gallery-carousel__subtitle">{item.subtitle}</span>
              </span>
            </li>
          );
        })}
      </ul>

      <div className="mt-5 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => step(-1)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-seaglass text-jade transition-colors hover:bg-jade hover:text-foam"
          aria-label="Previous photo"
        >
          <ArrowLeft size={18} strokeWidth={1.5} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-seaglass text-jade transition-colors hover:bg-jade hover:text-foam"
          aria-label="Next photo"
        >
          <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
