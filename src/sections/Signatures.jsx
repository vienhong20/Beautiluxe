import CoralDrop from '../components/media/CoralDrop.jsx';
import Reveal from '../components/motion/Reveal.jsx';
import SignatureShowcase from '../components/carousel/SignatureShowcase.jsx';
import { SIGNATURES } from '../data/services.js';
import { GALLERY } from '../data/gallery.js';

// No dedicated photography exists per named service yet (pedicure / paraffin /
// lash / ombre close-ups), so each signature borrows a real client photo that
// matches its mood from the salon's own gallery rather than a literal 1:1 shot.
const PHOTO_BY_TITLE = {
  'Custom Nail Design': GALLERY.find((p) => p.alt.includes('Gold chrome almond tips')),
  'BeautiLuxe Pedicure': GALLERY.find((p) => p.alt.includes('silver glitter fade')),
  'Milk & Honey Paraffin': GALLERY.find((p) => p.alt.includes('olive, orange and mustard')),
  'Eyelash Extensions': GALLERY.find((p) => p.alt.includes('red and black florals')),
  'Ombre Full Set': GALLERY.find((p) => p.alt.includes('Pink ombre almond nails')),
};

const slides = SIGNATURES.map((item) => ({ ...item, photo: PHOTO_BY_TITLE[item.title] }));

export default function Signatures() {
  return (
    <section id="signatures" className="section-pad overflow-hidden">
      <div className="container-x">
        <Reveal as="div" className="mb-10 flex max-w-2xl flex-col gap-4 px-4 sm:px-6 lg:mb-14 lg:px-12">
          <h2 className="flex items-center gap-3 text-[32px] lg:text-[46px]">
            <CoralDrop className="h-7 w-5" />
            Our signatures
          </h2>
        </Reveal>
      </div>

      <div className="container-x">
        <SignatureShowcase items={slides} />
      </div>
    </section>
  );
}
