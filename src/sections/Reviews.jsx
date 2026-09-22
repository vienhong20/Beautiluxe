import { useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import RatingStars from '../components/feedback/RatingStars.jsx';
import Button from '../components/core/Button.jsx';
import Reveal from '../components/motion/Reveal.jsx';
import InitialAvatar from '../components/media/InitialAvatar.jsx';
import useLoopCarousel from '../hooks/useLoopCarousel.js';
import { REVIEWS } from '../data/reviews.js';
import { BUSINESS } from '../data/business.js';

const AUTOPLAY_MS = 4500;
const count = REVIEWS.length;
const loop = [...REVIEWS, ...REVIEWS, ...REVIEWS];

export default function Reviews() {
  const { trackRef, registerSlide, step, handleScroll, reduce } = useLoopCarousel(count);
  const paused = useRef(false);

  // Auto-advance one review at a time, forever, pausing while a visitor is
  // actually looking at or interacting with the strip.
  useEffect(() => {
    if (reduce) return undefined;
    const id = setInterval(() => {
      if (!paused.current) step(1);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [reduce, step]);

  const pause = () => {
    paused.current = true;
  };
  const resume = () => {
    paused.current = false;
  };

  return (
    <section id="reviews" className="on-dark section-pad overflow-hidden bg-jade text-foam">
      <div className="container-x grid gap-10 lg:grid-cols-[minmax(280px,380px)_1fr] lg:gap-14">
        <Reveal className="flex flex-col items-start gap-5">
          <h2 className="text-[32px] text-foam lg:text-[46px]">Boca&apos;s regulars say it best.</h2>
          <div className="flex items-end gap-4">
            <span className="num font-display !text-[60px] font-semibold leading-none text-foam">
              {BUSINESS.google.rating}
            </span>
            <span className="flex flex-col gap-1 pb-1">
              <RatingStars value={BUSINESS.google.rating} size={22} />
              <span className="text-[16px] text-foam/85">
                <span className="num !text-[18px]">{BUSINESS.google.reviewCount.toLocaleString('en-US')}</span> Google reviews
              </span>
            </span>
          </div>
          <Button href={BUSINESS.mapsUrl} external variant="outlineLight">
            Read all on Google
            <ExternalLink size={16} strokeWidth={1.5} aria-hidden="true" />
          </Button>
          <div className="hidden gap-3 lg:flex">
            <button
              type="button"
              onClick={() => step(-1)}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-foam/10 text-foam transition-colors hover:bg-foam hover:text-jade"
              aria-label="Previous reviews"
            >
              <ArrowLeft size={20} strokeWidth={1.5} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-foam/10 text-foam transition-colors hover:bg-foam hover:text-jade"
              aria-label="Next reviews"
            >
              <ArrowRight size={20} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </Reveal>

        <ul
          ref={trackRef}
          onScroll={handleScroll}
          onMouseEnter={pause}
          onMouseLeave={resume}
          onFocus={pause}
          onBlur={resume}
          onTouchStart={pause}
          onTouchEnd={resume}
          className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
          aria-label="Google reviews, auto-advancing"
        >
          {loop.map((review, i) => (
            <li
              key={`${review.name}-${i}`}
              ref={registerSlide(i)}
              className="flex w-[86%] shrink-0 snap-start flex-col gap-4 rounded-[var(--radius-card)] bg-ink/35 p-6 sm:w-[46%] lg:w-[340px] lg:p-7"
            >
              <div className="flex items-center gap-3">
                {review.photo ? (
                  <img
                    src={review.photo}
                    alt=""
                    width="52"
                    height="52"
                    loading="lazy"
                    className="h-[52px] w-[52px] rounded-full object-cover ring-2 ring-gold/60"
                  />
                ) : (
                  <InitialAvatar name={review.name} size={52} />
                )}
                <div className="min-w-0">
                  <p className="truncate font-medium capitalize text-foam">{review.name}</p>
                  <p className="text-[15px] text-foam/75">Google review · {review.date}</p>
                </div>
              </div>
              <RatingStars value={5} size={17} />
              <blockquote className="quote-clamp text-[17px] leading-relaxed text-foam/95">
                “{review.text}”
              </blockquote>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
