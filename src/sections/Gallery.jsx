import { Instagram } from 'lucide-react';
import Button from '../components/core/Button.jsx';
import CoralDrop from '../components/media/CoralDrop.jsx';
import Reveal from '../components/motion/Reveal.jsx';
import { GALLERY } from '../data/gallery.js';
import { BUSINESS } from '../data/business.js';

// Cycle of cell sizes for the bento grid — repeats every 5 items so the
// rhythm stays legible. `grid-auto-flow: dense` backfills any gaps.
const SPANS = [
  'col-span-2 row-span-2',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-2',
  'col-span-2 row-span-1',
];

export default function Gallery() {
  return (
    <section id="work" className="section-pad overflow-hidden">
      <div className="container-x">
        <Reveal className="mb-10 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex max-w-2xl flex-col gap-4">
            <h2 className="flex items-center gap-3 text-[32px] lg:text-[46px]">
              <CoralDrop className="h-7 w-5" />
              Fresh from our chairs
            </h2>
            <p className="text-muted">Real sets by our team. Tap through, then show us your favorite.</p>
          </div>
          <Button href={BUSINESS.instagram.url} external variant="ghost" className="self-start lg:self-auto">
            <Instagram size={18} strokeWidth={1.5} aria-hidden="true" />
            {BUSINESS.instagram.handle}
          </Button>
        </Reveal>

        <div
          className="grid auto-rows-[120px] grid-cols-2 grid-flow-row-dense gap-3 sm:auto-rows-[160px] sm:gap-4 lg:grid-cols-4 lg:auto-rows-[200px] lg:gap-5"
          aria-label="Nail art gallery"
        >
          {GALLERY.map((photo, i) => (
            <Reveal
              key={photo.alt}
              delay={Math.min(i * 0.04, 0.3)}
              className={`sheen-group relative overflow-hidden rounded-[var(--radius-card)] bg-seaglass ${SPANS[i % SPANS.length]}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                className="sheen absolute inset-0 h-full w-full object-cover"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
