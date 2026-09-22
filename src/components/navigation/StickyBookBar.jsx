import { CalendarCheck, Phone } from 'lucide-react';
import { BUSINESS, BOOKING_URL, HAS_BOOKING } from '../../data/business.js';

// Mobile-only bottom bar: Call + Book Now, always one thumb away.
export default function StickyBookBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-jade/10 bg-foam/95 px-4 pt-3 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: 'calc(12px + env(safe-area-inset-bottom, 0px))' }}
    >
      <div className="mx-auto grid max-w-xl grid-cols-[1fr_1.4fr] gap-3">
        <a
          href={BUSINESS.phoneHref}
          className="sheen inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-seaglass font-medium text-jade ring-1 ring-inset ring-jade/15"
        >
          <Phone size={19} strokeWidth={1.5} aria-hidden="true" />
          Call Us
        </a>
        <a
          href={BOOKING_URL}
          {...(HAS_BOOKING ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="sheen inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-jade font-medium text-foam"
        >
          <CalendarCheck size={19} strokeWidth={1.5} aria-hidden="true" />
          Book Now
        </a>
      </div>
    </div>
  );
}
