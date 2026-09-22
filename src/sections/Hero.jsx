import { Phone } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import Button from '../components/core/Button.jsx';
import PhotoFrame from '../components/media/PhotoFrame.jsx';
import CoralDrop from '../components/media/CoralDrop.jsx';
import useOpenStatus from '../hooks/useOpenStatus.js';
import { HERO_PHOTOS } from '../data/gallery.js';
import { BUSINESS, BOOKING_URL, HAS_BOOKING } from '../data/business.js';

export default function Hero() {
  const { isOpen, label } = useOpenStatus();
  const reduce = useReducedMotion();

  return (
    <section id="top" className="px-4 pb-16 pt-8 sm:px-6 lg:px-12 lg:pb-24 lg:pt-14">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
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
            Fresh nails.
            <br />
            <span className="text-jade">Zero fuss.</span>
          </h1>

          <p className="max-w-[32rem] text-[18px] text-muted lg:text-[20px]">
            Manicures, pedicures, custom nail art, waxing and lashes on Glades Road in Boca Raton. Book
            online, or call anytime.
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
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-[520px] pb-[12%] lg:max-w-[600px]"
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <PhotoFrame
            src={HERO_PHOTOS.main.src}
            alt={HERO_PHOTOS.main.alt}
            priority
            className="ml-auto w-[72%]"
          />
          <PhotoFrame
            src={HERO_PHOTOS.accent.src}
            alt={HERO_PHOTOS.accent.alt}
            priority
            halo
            className="absolute bottom-0 left-0 w-[42%]"
          />
          <CoralDrop className="absolute left-[14%] top-[10%] h-9 w-6" />
        </motion.div>
      </div>
    </section>
  );
}
