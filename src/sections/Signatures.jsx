import CoralDrop from '../components/media/CoralDrop.jsx';
import Reveal from '../components/motion/Reveal.jsx';
import SignatureShowcase from '../components/carousel/SignatureShowcase.jsx';
import { SIGNATURES } from '../data/services.js';
import pedicure from '../assets/photos/signature-pedicure.webp';
import dippingPowder from '../assets/photos/signature-dipping-powder.webp';
import builderGel from '../assets/photos/signature-builder-gel.webp';
import gelX from '../assets/photos/signature-gel-x.webp';
import tapGel from '../assets/photos/signature-tap-gel.webp';

// Stock photos (Unsplash License, free for commercial use) stand in until the
// salon has its own shot of each service. Swap the file, keep the filename.
const PHOTO_BY_TITLE = {
  Pedicure: { src: pedicure, alt: 'Freshly polished red pedicure toes' },
  'Dipping Powder': { src: dippingPowder, alt: 'Pink glitter dip powder nails' },
  'Builder Gel': { src: builderGel, alt: 'Natural nude builder gel manicure' },
  'Gel X': { src: gelX, alt: 'Long almond Gel X extensions in cobalt blue with glitter tips' },
  'Tap Gel': { src: tapGel, alt: 'Soft pink and white French tap gel nails' },
};

const slides = SIGNATURES.map((item) => ({ ...item, photo: PHOTO_BY_TITLE[item.title] }));

export default function Signatures() {
  return (
    <section id="signatures" className="section-pad overflow-hidden">
      <div className="container-x">
        <Reveal as="div" className="mb-10 flex flex-col items-center gap-4 px-4 text-center sm:px-6 lg:mb-14 lg:px-12">
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
