import { Facebook, Instagram, Phone } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import TikTokIcon from '../media/TikTokIcon.jsx';
import { BUSINESS } from '../../data/business.js';
import './FloatingSocialBar.css';

const LINKS = [
  { key: 'instagram', href: BUSINESS.instagram.url, label: `${BUSINESS.name} on Instagram`, Icon: Instagram },
  { key: 'facebook', href: BUSINESS.facebook.url, label: `${BUSINESS.name} on Facebook`, Icon: Facebook },
  { key: 'tiktok', href: BUSINESS.tiktok.url, label: `${BUSINESS.name} on TikTok`, Icon: TikTokIcon },
];

// Desktop-only dock (mobile gets the same links folded into StickyBookBar's
// bar instead, right above its Call / Book Now row) — quick access to the
// salon's real social profiles, plus a call shortcut. No booking link here
// by design.
export default function FloatingSocialBar() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="social-dock"
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {LINKS.map(({ key, href, label, Icon }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="social-dock__btn"
        >
          <Icon size={19} strokeWidth={1.75} className="h-[19px] w-[19px]" aria-hidden="true" />
        </a>
      ))}
      <a href={BUSINESS.phoneHref} aria-label={`Call ${BUSINESS.name}`} className="social-dock__btn social-dock__btn--call">
        <Phone size={19} strokeWidth={1.75} aria-hidden="true" />
      </a>
    </motion.div>
  );
}
