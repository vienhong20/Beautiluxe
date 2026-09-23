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
//
// Two things ride on top of that shared distance math:
// - The active `<li>` is centered horizontally inside the list's own
//   scroll container every time it changes, so on a narrow screen the
//   current photo never ends up partially off the edge. This scrolls
//   ONLY that inner container (list.scrollTo), never scrollIntoView —
//   scrollIntoView walks up every scrollable ancestor including the
//   page itself, so combined with autoplay it would drag the whole
//   page back to this section every 3.2s no matter where the visitor
//   had scrolled to. Real bug, not a hypothetical: it shipped once.
// - Each item also gets a directional `data-role` (previous / current /
//   next / next2 / hidden) — same technique as the Signatures and Hero
//   carousels. Desktop ignores it and keeps the full graduated filmstrip;
//   a mobile-only media query in the CSS uses it to keep just those 4
//   slots visible instead of many thin slivers competing for space.
export default function GalleryCarousel({ items }) {
  const count = items.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const paused = useRef(false);
  const reduce = useReducedMotion();
  const listRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    if (reduce) return undefined;
    const id = setInterval(() => {
      if (!paused.current) setActiveIndex((i) => (i + 1) % count);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [reduce, count]);

  useEffect(() => {
    const list = listRef.current;
    const item = itemRefs.current[activeIndex];
    if (!list || !item) return;
    const listRect = list.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const delta = itemRect.left + itemRect.width / 2 - (listRect.left + listRect.width / 2);
    list.scrollTo({ left: list.scrollLeft + delta, behavior: reduce ? 'auto' : 'smooth' });
  }, [activeIndex, reduce]);

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
      <ul ref={listRef} className="gallery-carousel__list" aria-label="Nail art gallery, browse with the arrow keys">
        {items.map((item, i) => {
          const raw = Math.abs(i - activeIndex);
          const dist = Math.min(raw, count - raw);
          const isActive = dist === 0;

          const offset = ((i - activeIndex) % count + count) % count;
          const role =
            offset === 0
              ? 'current'
              : offset === 1
                ? 'next'
                : offset === 2
                  ? 'next2'
                  : offset === count - 1
                    ? 'previous'
                    : 'hidden';

          return (
            <li
              key={item.title}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              tabIndex={0}
              role="button"
              aria-label={`Show ${item.title}`}
              aria-pressed={isActive}
              data-active={isActive ? '' : undefined}
              data-dist={dist === 1 ? '1' : undefined}
              data-role={role}
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
