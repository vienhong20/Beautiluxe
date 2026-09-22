import { Sparkles } from 'lucide-react';
import { SERVICE_MENU } from '../data/services.js';

const LABELS = {
  manicure: 'Manicures',
  enhancements: 'Nail Enhancements',
  pedicure: 'Pedicures',
  waxing: 'Waxing',
  lash: 'Lash Services',
};

const CATEGORIES = SERVICE_MENU.map((c) => LABELS[c.id] ?? c.label);

function Row({ ariaHidden }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={ariaHidden}>
      {CATEGORIES.map((label) => (
        <span key={label} className="flex items-center gap-3 sm:gap-4">
          <span className="whitespace-nowrap px-3 text-[15px] font-medium uppercase tracking-[0.08em] text-foam sm:px-4 sm:text-[17px]">
            {label}
          </span>
          <Sparkles size={14} strokeWidth={1.5} className="shrink-0 text-gold" aria-hidden="true" />
        </span>
      ))}
    </div>
  );
}

// Continuous, seamless scroll: the row is rendered twice back to back and
// the whole track slides exactly one copy's width (see .marquee-track in
// index.css), so the loop never visibly resets. Disabled under
// prefers-reduced-motion (the CSS swaps the animation off entirely).
export default function MarqueeStrip() {
  return (
    <div className="on-dark overflow-hidden bg-jade py-4" aria-label="Services offered">
      <div className="marquee-track flex w-max">
        <Row />
        <Row ariaHidden="true" />
      </div>
    </div>
  );
}
