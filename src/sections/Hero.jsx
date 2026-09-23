import { ArrowRight, DoorOpen, Phone, Star } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import BookNowButton from '../components/core/BookNowButton.jsx';
import RotatingBadge from '../components/media/RotatingBadge.jsx';
import HeroPhotoCarousel from '../components/carousel/HeroPhotoCarousel.jsx';
import useOpenStatus from '../hooks/useOpenStatus.js';
import { useBookingModal } from '../context/BookingModalContext.jsx';
import { HERO_INTERIOR_PHOTOS } from '../data/gallery.js';
import { BUSINESS, BOOKING_URL, HAS_BOOKING } from '../data/business.js';

const DOT_PATTERN = {
  backgroundImage: 'radial-gradient(currentColor 1.5px, transparent 1.5px)',
  backgroundSize: '14px 14px',
};

export default function Hero() {
  const { isOpen, label } = useOpenStatus();
  const reduce = useReducedMotion();
  const { open: openBookingModal } = useBookingModal();

  return (
    <section id="top" className="overflow-x-hidden px-4 pb-10 pt-8 sm:px-6 lg:px-12 lg:pb-16 lg:pt-14">
      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <motion.div
          className="flex flex-col items-start gap-6"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="inline-flex min-h-9 items-center gap-2 rounded-full bg-seaglass px-4 text-[15px] font-medium text-ink">
            <span
              className={`h-2.5 w-2.5 rounded-full ${isOpen ? 'bg-jade' : 'bg-muted'}`}
              aria-hidden="true"
            />
            <span className="num !text-[15px]">{label}</span>
          </p>

          <h1 className="text-[44px] text-ink sm:text-[58px] lg:text-[68px] xl:text-[76px]">
            Beautiful nails.
            <br />
            <span className="text-gold-deep">Done right.</span>
          </h1>

          <p className="max-w-[32rem] text-[18px] text-muted lg:text-[20px]">
            From manicures and pedicures to custom nail art, waxing and lashes, we&apos;ve got Boca
            Raton covered. Book online, or call anytime.
          </p>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-1">
            <BookNowButton className="px-8">
              Book Now
              <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
            </BookNowButton>
            <a
              href={BUSINESS.phoneHref}
              className="num inline-flex items-center gap-2 font-medium text-jade underline decoration-jade/30 underline-offset-8 hover:decoration-jade"
            >
              <Phone size={16} strokeWidth={1.75} aria-hidden="true" />
              Call {BUSINESS.phoneDisplay}
            </a>
          </div>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-[420px] lg:max-w-none"
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          {/* Soft organic wash behind the photo, standing in for the
              reference's leaf motif with something that fits a nail brand. */}
          <div
            className="absolute -inset-6 -z-10 rounded-[40%] bg-seaglass blur-2xl sm:-inset-10"
            aria-hidden="true"
          />
          <div
            className="absolute -left-5 -top-5 -z-10 hidden h-28 w-28 text-jade/15 sm:block"
            style={DOT_PATTERN}
            aria-hidden="true"
          />

          <HeroPhotoCarousel
            items={HERO_INTERIOR_PHOTOS}
            className="aspect-[3/4] w-full rounded-[32px] shadow-[var(--shadow-ambient)]"
          />

          <div className="absolute -right-3 -top-5 sm:-right-5 sm:-top-7">
            <RotatingBadge
              href={BOOKING_URL}
              external={HAS_BOOKING}
              onClick={HAS_BOOKING ? undefined : openBookingModal}
            />
          </div>

          <div className="absolute -left-4 top-[20%] hidden items-center gap-3 rounded-2xl bg-foam py-3 pl-3 pr-4 shadow-[var(--shadow-ambient)] sm:flex">
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-jade text-foam">
              <Star size={16} strokeWidth={1.5} fill="currentColor" aria-hidden="true" />
            </span>
            <span className="leading-tight">
              <span className="num block text-[15px] font-semibold text-ink">{BUSINESS.google.rating} rated</span>
              <span className="block text-[12px] text-muted">on Google</span>
            </span>
          </div>

          <div className="absolute -bottom-4 right-[8%] flex items-center gap-3 rounded-2xl bg-foam py-3 pl-3 pr-4 shadow-[var(--shadow-ambient)] sm:right-[12%]">
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-coral text-ink">
              <DoorOpen size={16} strokeWidth={1.5} aria-hidden="true" />
            </span>
            <span className="text-[13px] font-medium leading-tight text-ink">
              Walk-ins
              <br />
              welcome
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
