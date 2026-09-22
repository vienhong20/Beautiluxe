import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';

// Shared engine for an infinite-loop, scroll-snap carousel. The caller
// renders its data three times (`[...items, ...items, ...items]`); this
// hook centers the starting slide, exposes `step`/`goToDot` for controls,
// and silently re-centers into the middle copy once a native swipe settles
// so the loop never visibly runs out in either direction.
export default function useLoopCarousel(count) {
  const trackRef = useRef(null);
  const slideRefs = useRef([]);
  const settleTimer = useRef(null);
  const correcting = useRef(false);
  const [active, setActive] = useState(count);
  const reduce = useReducedMotion();

  const scrollToIndex = useCallback((index, behavior) => {
    const el = slideRefs.current[index];
    const track = trackRef.current;
    if (!el || !track) return;
    const target = el.offsetLeft - (track.clientWidth - el.clientWidth) / 2;
    track.scrollTo({ left: target, behavior });
  }, []);

  useEffect(() => {
    scrollToIndex(active, 'instant');
    const onResize = () => scrollToIndex(active, 'instant');
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => () => clearTimeout(settleTimer.current), []);

  const step = useCallback(
    (dir) => {
      setActive((prev) => {
        const next = prev + dir;
        scrollToIndex(next, reduce ? 'instant' : 'smooth');
        return next;
      });
    },
    [reduce, scrollToIndex]
  );

  const goToDot = useCallback(
    (dotIndex) => {
      setActive((prev) => {
        const target = Math.floor(prev / count) * count + dotIndex;
        scrollToIndex(target, reduce ? 'instant' : 'smooth');
        return target;
      });
    },
    [count, reduce, scrollToIndex]
  );

  const handleScroll = useCallback(() => {
    if (correcting.current) return;
    clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => {
      const track = trackRef.current;
      if (!track) return;
      const center = track.scrollLeft + track.clientWidth / 2;
      let nearest = 0;
      let best = Infinity;
      slideRefs.current.forEach((el, i) => {
        if (!el) return;
        const mid = el.offsetLeft + el.clientWidth / 2;
        const d = Math.abs(mid - center);
        if (d < best) {
          best = d;
          nearest = i;
        }
      });
      setActive(nearest);
      if (nearest < count || nearest >= count * 2) {
        const corrected = (((nearest % count) + count) % count) + count;
        correcting.current = true;
        setActive(corrected);
        scrollToIndex(corrected, 'instant');
        requestAnimationFrame(() => {
          correcting.current = false;
        });
      }
    }, 120);
  }, [count, scrollToIndex]);

  const registerSlide = useCallback(
    (i) => (el) => {
      slideRefs.current[i] = el;
    },
    []
  );

  const activeDot = ((active % count) + count) % count;

  return { trackRef, registerSlide, active, activeDot, step, goToDot, handleScroll, reduce };
}
