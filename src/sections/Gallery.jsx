import CoralDrop from '../components/media/CoralDrop.jsx';
import Reveal from '../components/motion/Reveal.jsx';
import GalleryCarousel from '../components/carousel/GalleryCarousel.jsx';
import { GALLERY } from '../data/gallery.js';

export default function Gallery() {
  return (
    <section id="work" className="section-pad overflow-hidden">
      <div className="container-x">
        <Reveal className="mb-10 flex max-w-2xl flex-col gap-4 lg:mb-14">
          <h2 className="flex items-center gap-3 text-[32px] lg:text-[46px]">
            <CoralDrop className="h-7 w-5" />
            Gallery
          </h2>
          <p className="text-muted">Real nail art from our chairs, all in one place. Browse the styles, then bring us your inspiration.</p>
        </Reveal>

        <GalleryCarousel items={GALLERY} />
      </div>
    </section>
  );
}
