import Button from '../components/core/Button.jsx';
import CoralDrop from '../components/media/CoralDrop.jsx';
import Reveal from '../components/motion/Reveal.jsx';
import { DRINKS, BOOKING_URL, HAS_BOOKING } from '../data/business.js';

export default function Drinks() {
  return (
    <section id="drinks" className="section-pad">
      <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <Reveal className="flex flex-col items-start gap-5">
          <h2 className="flex items-center gap-3 text-[32px] lg:text-[46px]">
            <CoralDrop className="h-7 w-5" />
            Your drink&apos;s on us.
          </h2>
          <p className="tagline text-[24px] text-jade">Sip, relax, glow.</p>
          <p className="max-w-[32rem] text-muted">
            Pick something from the bar while you settle in. One complimentary drink per guest, every visit.
          </p>
          <Button href={BOOKING_URL} external={HAS_BOOKING}>
            Book Now
          </Button>
        </Reveal>

        <Reveal delay={0.1} className="rounded-[var(--radius-card)] bg-seaglass p-6 shadow-[var(--shadow-soft)] sm:p-10">
          <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-jade/20 pb-4">
            <h3 className="text-[22px] text-ink">Drink menu</h3>
            <span className="text-[14px] font-medium uppercase tracking-[0.1em] text-muted">One per guest</span>
          </div>
          <ul className="grid gap-x-10 sm:grid-cols-2">
            {DRINKS.map((drink) => (
              <li key={drink} className="flex min-h-12 items-baseline gap-3 py-2">
                <span className="font-medium text-ink">{drink}</span>
                <span className="mb-1 flex-1 border-b border-dotted border-jade/40" aria-hidden="true" />
                <span className="tagline text-[17px] text-jade">on us</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
