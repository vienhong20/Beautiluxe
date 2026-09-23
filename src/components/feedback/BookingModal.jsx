import { useEffect, useRef } from 'react';
import { CalendarClock, Phone, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import Button from '../core/Button.jsx';
import { BUSINESS } from '../../data/business.js';

// Stands in for online booking until VITE_BOOKING_URL is set — every Book
// Now control opens this instead of a dead "#" link, and points the guest
// to a phone call in the meantime.
export default function BookingModal({ isOpen, onClose }) {
  const reduce = useReducedMotion();
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    dialogRef.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/50 px-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
            tabIndex={-1}
            className="relative w-full max-w-sm rounded-[var(--radius-card)] bg-foam p-7 text-center shadow-[var(--shadow-ambient)] focus:outline-none sm:p-8"
            initial={reduce ? false : { opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-seaglass hover:text-jade"
            >
              <X size={18} strokeWidth={1.75} aria-hidden="true" />
            </button>

            <span className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-seaglass text-jade">
              <CalendarClock size={26} strokeWidth={1.5} aria-hidden="true" />
            </span>

            <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-jade/70">Online Booking</p>
            <h2 id="booking-modal-title" className="mt-1 text-[24px] text-ink">
              Coming Soon
            </h2>
            <p className="mx-auto mt-3 max-w-[26rem] text-muted">
              Our online booking system is on its way! In the meantime, give us a call to schedule your appointment.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <Button href={BUSINESS.phoneHref} className="w-full">
                <Phone size={18} strokeWidth={1.5} aria-hidden="true" />
                <span className="num">Call {BUSINESS.phoneDisplay}</span>
              </Button>
              <button
                type="button"
                onClick={onClose}
                className="min-h-11 text-[15px] font-medium text-muted transition-colors hover:text-jade"
              >
                Maybe later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
