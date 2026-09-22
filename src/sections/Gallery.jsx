import { Instagram } from 'lucide-react';
import AlmondFrame from '../components/media/AlmondFrame.jsx';
import Button from '../components/core/Button.jsx';
import CoralDrop from '../components/media/CoralDrop.jsx';
import { GALLERY } from '../data/gallery.js';
import { BUSINESS } from '../data/business.js';

export default function Gallery() {
  return (
    <section id="work" className="section-pad overflow-hidden">
      <div className="container-x">
        <div className="reveal mb-10 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex max-w-2xl flex-col gap-4">
            <h2 className="flex items-center gap-3 text-[34px] lg:text-[48px]">
              <CoralDrop className="h-7 w-5" />
              Fresh from our chairs
            </h2>
            <p className="text-muted">Real sets by our team. Swipe through, then show us your favorite.</p>
          </div>
          <Button href={BUSINESS.instagram.url} external variant="ghost" className="self-start lg:self-auto">
            <Instagram size={18} strokeWidth={1.5} aria-hidden="true" />
            {BUSINESS.instagram.handle}
          </Button>
        </div>

        <ul
          className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-x-8 lg:gap-y-10 lg:overflow-visible lg:px-0"
          aria-label="Nail art gallery"
        >
          {GALLERY.map((photo, i) => (
            <li
              key={photo.alt}
              className={`w-[56%] shrink-0 snap-center sm:w-[34%] lg:w-auto ${i % 2 === 1 ? 'lg:translate-y-10' : ''}`}
            >
              <AlmondFrame src={photo.src} alt={photo.alt} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
