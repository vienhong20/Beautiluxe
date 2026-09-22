import { Instagram } from 'lucide-react';
import Button from '../components/core/Button.jsx';
import CoralDrop from '../components/media/CoralDrop.jsx';
import Reveal from '../components/motion/Reveal.jsx';
import GalleryCarousel from '../components/carousel/GalleryCarousel.jsx';
import { GALLERY } from '../data/gallery.js';
import { BUSINESS } from '../data/business.js';

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
            <p className="text-muted">Real sets by our team. Hover or tap through, then show us your favorite.</p>
          </div>
          <Button href={BUSINESS.instagram.url} external variant="ghost" className="self-start lg:self-auto">
            <Instagram size={18} strokeWidth={1.5} aria-hidden="true" />
            {BUSINESS.instagram.handle}
          </Button>
        </Reveal>

        <GalleryCarousel items={GALLERY} />
      </div>
    </section>
  );
}
