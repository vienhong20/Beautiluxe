import { Clock, GlassWater, MapPin, Phone } from 'lucide-react';
import Button from '../components/core/Button.jsx';
import AlmondFrame from '../components/media/AlmondFrame.jsx';
import CoralDrop from '../components/media/CoralDrop.jsx';
import RatingStars from '../components/feedback/RatingStars.jsx';
import useOpenStatus from '../hooks/useOpenStatus.js';
import { HERO_PHOTOS } from '../data/gallery.js';
import { BUSINESS, BOOKING_URL, HAS_BOOKING } from '../data/business.js';

export default function Hero() {
  const { isOpen, label } = useOpenStatus();

  return (
    <section id="top" className="px-4 pb-16 pt-8 sm:px-6 lg:px-12 lg:pb-24 lg:pt-16">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div className="flex flex-col items-start gap-6">
          <p className="inline-flex min-h-9 items-center gap-2 rounded-full bg-seaglass px-4 text-[15px] font-medium text-ink">
            <span
              className={`h-2.5 w-2.5 rounded-full ${isOpen ? 'bg-jade' : 'bg-muted'}`}
              aria-hidden="true"
            />
            <span className="num !text-[15px]">{label}</span>
          </p>

          <h1 className="text-[46px] text-ink sm:text-[60px] lg:text-[76px] xl:text-[88px]">
            Fresh nails.
            <br />
            <span className="text-jade">Zero fuss.</span>
          </h1>

          <p className="tagline flex items-center gap-3 text-[24px] text-jade lg:text-[28px]">
            <CoralDrop className="h-6 w-4" />
            Sip, relax, glow.
          </p>

          <p className="max-w-[34rem] text-[18px] text-muted lg:text-[20px]">
            Manicures, pedicures, custom nail art, waxing and lashes on Glades Road in Boca Raton. Book online
            anytime, or give us a call.
          </p>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button href={BOOKING_URL} external={HAS_BOOKING} className="w-full px-8 sm:w-auto">
              Book Now
            </Button>
            <Button href={BUSINESS.phoneHref} variant="ghost" className="w-full sm:w-auto">
              <Phone size={18} strokeWidth={1.5} aria-hidden="true" />
              <span className="num">Call {BUSINESS.phoneDisplay}</span>
            </Button>
          </div>

          <a
            href={BUSINESS.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="on-dark sheen inline-flex min-h-12 flex-wrap items-center gap-x-3 gap-y-1 rounded-full bg-jade py-2 pl-4 pr-5 text-foam"
          >
            <RatingStars value={BUSINESS.google.rating} size={17} />
            <span className="text-[15px]">
              <span className="num !text-[16px] font-medium">{BUSINESS.google.rating}</span> on Google ·{' '}
              <span className="num !text-[16px]">{BUSINESS.google.reviewCount.toLocaleString('en-US')}</span> reviews
            </span>
          </a>
        </div>

        <div className="relative mx-auto w-full max-w-[520px] pb-[12%] lg:max-w-[600px]">
          <AlmondFrame
            src={HERO_PHOTOS.main.src}
            alt={HERO_PHOTOS.main.alt}
            priority
            className="ml-auto w-[72%]"
          />
          <AlmondFrame
            src={HERO_PHOTOS.accent.src}
            alt={HERO_PHOTOS.accent.alt}
            priority
            halo
            className="absolute bottom-0 left-0 w-[42%]"
          />
          <CoralDrop className="absolute left-[14%] top-[10%] h-9 w-6" />
        </div>
      </div>

      <ul className="container-x mt-14 grid gap-3 sm:grid-cols-3 lg:mt-20">
        <li>
          <a
            href={BUSINESS.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-full min-h-16 items-center gap-4 rounded-[var(--radius-card)] bg-seaglass px-5 py-4 transition-colors hover:bg-seaglass/70"
          >
            <MapPin size={24} strokeWidth={1.5} className="shrink-0 text-jade" aria-hidden="true" />
            <span className="leading-snug">
              <span className="block font-medium">{BUSINESS.street}</span>
              <span className="text-muted">{BUSINESS.cityLine}</span>
            </span>
          </a>
        </li>
        <li className="flex min-h-16 items-center gap-4 rounded-[var(--radius-card)] bg-seaglass px-5 py-4">
          <Clock size={24} strokeWidth={1.5} className="shrink-0 text-jade" aria-hidden="true" />
          <span className="leading-snug">
            <span className="num block font-medium">Mon–Sat 9 AM – 7 PM</span>
            <span className="num text-muted">Sun 10 AM – 5 PM</span>
          </span>
        </li>
        <li className="flex min-h-16 items-center gap-4 rounded-[var(--radius-card)] bg-seaglass px-5 py-4">
          <GlassWater size={24} strokeWidth={1.5} className="shrink-0 text-jade" aria-hidden="true" />
          <span className="leading-snug">
            <span className="block font-medium">Walk-ins &amp; appointments</span>
            <span className="text-muted">Free drink every visit</span>
          </span>
        </li>
      </ul>
    </section>
  );
}
