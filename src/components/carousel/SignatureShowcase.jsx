import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import './SignatureShowcase.css';
import useTilt from '../../hooks/useTilt.js';

const AUTOPLAY_MS = 5000;

// A 5-slot coverflow ring: previous2 / previous / current / next / next2.
// Ported from a 3-item ("current/next/previous") reference design and
// generalized here for exactly 5 signature services (see the fixed hook
// count below). Each item keeps one stable DOM node (keyed by title); which
// role it plays is a pure function of `currentIndex`, recomputed every
// render — no manual state-swapping needed. That's what lets the CSS
// transform transition animate smoothly as the ring turns.
const ROLE_BY_OFFSET = { 0: 'current', 1: 'next', 2: 'next2', [-1]: 'previous', [-2]: 'previous2' };

function roleFor(itemIndex, currentIndex, count) {
  let offset = (itemIndex - currentIndex) % count;
  if (offset > count / 2) offset -= count;
  if (offset < -count / 2) offset += count;
  return ROLE_BY_OFFSET[offset] ?? null;
}

function SlideSet({ index, role, item, innerRef, infoInnerRef, triggerRef }) {
  const dataAttr = role ? { [`data-${role}`]: '' } : {};
  return (
    <>
      <div className="slide" ref={triggerRef} {...dataAttr}>
        <div className="slide__inner" ref={innerRef}>
          <div className="slide--image__wrapper">
            <img
              className="slide--image"
              src={item.photo.src}
              alt={item.photo.alt}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          </div>
        </div>
      </div>
      <div className="slide__bg" style={{ '--bg': `url(${item.photo.src})` }} {...dataAttr} />
      <div className="slide-info" {...dataAttr}>
        <div className="slide-info__inner" ref={infoInnerRef}>
          <div className="slide-info--text__wrapper">
            <div className="reveal-line">
              <span className="slide-info--badge">Signature</span>
            </div>
            <div className="reveal-line">
              <span className="slide-info--title">{item.title}</span>
            </div>
            <div className="reveal-line">
              <span className="slide-info--tagline">{item.tagline}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function SignatureShowcase({ items }) {
  const count = items.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(null);
  const paused = useRef(false);
  const reduce = useReducedMotion();

  const currentItem = items[currentIndex];

  const change = (direction) => {
    setCurrentIndex((prev) => (prev + direction + count) % count);
  };

  // Auto-advance, same pattern as the Gallery and Reviews carousels: paused
  // (not stopped) while the visitor is hovering, touching, or has focused
  // into the showcase via keyboard, and off entirely under
  // prefers-reduced-motion. Purely a state change (setCurrentIndex) — never
  // touches scroll position, so it can't drag the page around the way the
  // Gallery's old scrollIntoView call once did.
  useEffect(() => {
    if (reduce) return undefined;
    const id = setInterval(() => {
      if (!paused.current) change(1);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, count]);

  const pause = () => {
    paused.current = true;
  };
  const resume = () => {
    paused.current = false;
  };

  // Five fixed slots (matches the current signature count exactly — see the
  // file-level comment). Hardcoded rather than mapped so hook call order
  // stays visibly stable across renders.
  const triggerRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
  const innerRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
  const infoInnerRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

  useTilt(triggerRefs[0], [innerRefs[0], infoInnerRefs[0]]);
  useTilt(triggerRefs[1], [innerRefs[1], infoInnerRefs[1]]);
  useTilt(triggerRefs[2], [innerRefs[2], infoInnerRefs[2]]);
  useTilt(triggerRefs[3], [innerRefs[3], infoInnerRefs[3]]);
  useTilt(triggerRefs[4], [innerRefs[4], infoInnerRefs[4]]);

  const onTouchStart = (e) => {
    pause();
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    resume();
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 40) return;
    change(delta < 0 ? 1 : -1);
  };

  return (
    <div>
      <div
        className="signature-showcase"
        onMouseEnter={pause}
        onMouseLeave={resume}
        onFocus={pause}
        onBlur={resume}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="slider">
          <button type="button" className="slider--btn slider--btn__prev" onClick={() => change(-1)} aria-label="Previous signature">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <div className="slides__wrapper">
            <div className="slides">
              {items.map((item, i) => (
                <SlideSet
                  key={`slide-${item.title}`}
                  index={i}
                  role={roleFor(i, currentIndex, count)}
                  item={item}
                  innerRef={innerRefs[i]}
                  infoInnerRef={infoInnerRefs[i]}
                  triggerRef={triggerRefs[i]}
                />
              ))}
            </div>
          </div>

          <button type="button" className="slider--btn slider--btn__next" onClick={() => change(1)} aria-label="Next signature">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className="flex items-center justify-center gap-2" role="tablist" aria-label="Signature service slides">
          {items.map((item, i) => (
            <button
              key={item.title}
              type="button"
              role="tab"
              aria-selected={i === currentIndex}
              aria-label={`Go to ${item.title}`}
              onClick={() => setCurrentIndex(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === currentIndex ? 'w-7 bg-gold' : 'w-2.5 bg-foam/25 hover:bg-foam/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Description reads clearly on the page's own light background,
          rather than floating over the photo where contrast varies. */}
      <div className="mx-auto mt-8 max-w-xl px-4 text-center sm:px-6">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentItem.title}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-[17px] leading-relaxed text-muted"
          >
            {currentItem.body}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
