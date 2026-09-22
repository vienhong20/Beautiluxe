import { useRef } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import RatingStars from '../components/feedback/RatingStars.jsx';
import Button from '../components/core/Button.jsx';
import { REVIEWS } from '../data/reviews.js';
import { BUSINESS } from '../data/business.js';

export default function Reviews() {
  const trackRef = useRef(null);

  const scrollByCard = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('li');
    const gap = 20;
    track.scrollBy({ left: direction * ((card?.offsetWidth ?? 320) + gap), behavior: 'smooth' });
  };

  return (
    <section id="reviews" className="on-dark section-pad overflow-hidden bg-jade text-foam">
      <div className="container-x grid gap-10 lg:grid-cols-[minmax(280px,380px)_1fr] lg:gap-14">
        <div className="reveal flex flex-col items-start gap-5">
          <h2 className="text-[34px] text-foam lg:text-[48px]">Boca&apos;s regulars say it best.</h2>
          <div className="flex items-end gap-4">
            <span className="num font-display !text-[64px] font-semibold leading-none text-foam">
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
              onClick={() => scrollByCard(-1)}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-foam/10 text-foam transition-colors hover:bg-foam hover:text-jade"
              aria-label="Previous reviews"
            >
              <ArrowLeft size={20} strokeWidth={1.5} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-foam/10 text-foam transition-colors hover:bg-foam hover:text-jade"
              aria-label="Next reviews"
            >
              <ArrowRight size={20} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </div>

        <ul
          ref={trackRef}
          className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
          aria-label="Google reviews"
        >
          {REVIEWS.map((review) => (
            <li
              key={review.name}
              className="flex w-[86%] shrink-0 snap-start flex-col gap-4 rounded-[var(--radius-card)] bg-ink/35 p-6 sm:w-[46%] lg:w-[340px] lg:p-7"
            >
              <div className="flex items-center gap-3">
                <img
                  src={review.photo}
                  alt=""
                  width="52"
                  height="52"
                  loading="lazy"
                  className="h-[52px] w-[52px] rounded-full object-cover ring-2 ring-gold/60"
                />
                <div className="min-w-0">
                  <p className="truncate font-medium capitalize text-foam">{review.name}</p>
                  <p className="text-[15px] text-foam/75">Google review · {review.date}</p>
                </div>
              </div>
              <RatingStars value={5} size={17} />
              <blockquote className="text-[17px] leading-relaxed text-foam/95">“{review.text}”</blockquote>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
