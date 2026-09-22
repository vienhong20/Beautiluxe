import redHearts from '../assets/photos/red-glitter-hearts.webp';
import goldFlorals from '../assets/photos/gold-chrome-florals.webp';
import goldFlorals2 from '../assets/photos/gold-florals-2.webp';
import sunflower from '../assets/photos/sunflower-french.webp';
import swirl from '../assets/photos/swirl-art-short.webp';
import silver from '../assets/photos/silver-glitter-almond.webp';
import redJelly from '../assets/photos/red-jelly-dots.webp';
import fallFrench from '../assets/photos/fall-french-almond.webp';
import tortoise from '../assets/photos/tortoise-polka.webp';
import ghost from '../assets/photos/ghost-3d-art.webp';
import pinkOmbre from '../assets/photos/pink-ombre-glitter.webp';
import redFloral from '../assets/photos/red-floral-coffin.webp';

// Real client work from the salon's current website gallery.
export const HERO_PHOTOS = {
  main: { src: goldFlorals, alt: 'Almond nails with gold chrome tips and hand-painted white florals' },
  accent: { src: redHearts, alt: 'Red glitter almond nails with heart french accents' },
};

// title/subtitle are short captions derived from each photo's own alt text
// (not separate invented copy) — used by the Gallery carousel's text overlay.
export const GALLERY = [
  {
    src: silver,
    alt: 'Nude almond nails with silver glitter fade and gems',
    title: 'Silver Glitter Fade',
    subtitle: 'Nude almond, silver glitter & gems',
  },
  {
    src: sunflower,
    alt: 'Short french manicure with hand-painted sunflowers',
    title: 'Sunflower French',
    subtitle: 'Hand-painted sunflowers, short french',
  },
  {
    src: tortoise,
    alt: 'Tortoiseshell, polka dot and checkered nail art',
    title: 'Tortoiseshell & Dots',
    subtitle: 'Polka dot and checkered nail art',
  },
  {
    src: fallFrench,
    alt: 'Almond nails with olive, orange and mustard double french tips',
    title: 'Fall French',
    subtitle: 'Olive, orange & mustard double french',
  },
  {
    src: ghost,
    alt: 'Almond nails with 3D ghost art and spiderweb details',
    title: '3D Ghost Art',
    subtitle: 'Spiderweb details, almond nails',
  },
  {
    src: redFloral,
    alt: 'Long coffin nails with red and black florals',
    title: 'Red Floral Coffin',
    subtitle: 'Long coffin, red & black florals',
  },
  {
    src: goldFlorals2,
    alt: 'Gold chrome almond tips with white flowers and gems',
    title: 'Gold Chrome Florals',
    subtitle: 'Hand-painted florals, gold chrome tips',
  },
  {
    src: redJelly,
    alt: 'Short red and cream jelly nails with dot accents',
    title: 'Red Jelly Dots',
    subtitle: 'Short jelly nails, dot accents',
  },
  {
    src: pinkOmbre,
    alt: 'Pink ombre almond nails with glitter and peach french tips',
    title: 'Pink Ombré',
    subtitle: 'Glitter fade, peach french tips',
  },
  {
    src: swirl,
    alt: 'Short green and mauve nails with gold swirl art',
    title: 'Gold Swirl Art',
    subtitle: 'Short nails, mauve & green swirl',
  },
];
