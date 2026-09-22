import { Facebook, Instagram, Phone } from 'lucide-react';
import TikTokIcon from '../media/TikTokIcon.jsx';
import { BUSINESS } from '../../data/business.js';

const SOCIALS = [
  { key: 'instagram', href: BUSINESS.instagram.url, label: `${BUSINESS.name} on Instagram`, Icon: Instagram },
  { key: 'facebook', href: BUSINESS.facebook, label: `${BUSINESS.name} on Facebook`, Icon: Facebook },
  { key: 'tiktok', href: BUSINESS.tiktok.url, label: `${BUSINESS.name} on TikTok`, Icon: TikTokIcon },
];

// Mobile-only bottom bar: Call Us stays the one thumb-away action, and the
// three social profiles sit inline beside it instead of a separate
// "Book Now" (that CTA is still plentiful elsewhere on the page — Header,
// Hero, Signatures, Visit). Desktop gets the same social links via the
// FloatingSocialBar dock instead.
export default function StickyBookBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-jade/10 bg-foam/95 px-4 pt-3 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: 'calc(12px + env(safe-area-inset-bottom, 0px))' }}
    >
      <div className="mx-auto flex max-w-xl items-center gap-2.5">
        <a
          href={BUSINESS.phoneHref}
          className="sheen inline-flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-full bg-jade font-medium text-foam"
        >
          <Phone size={19} strokeWidth={1.5} aria-hidden="true" />
          Call Us
        </a>
        {SOCIALS.map(({ key, href, label, Icon }) => (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="sheen inline-flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-seaglass text-jade ring-1 ring-inset ring-jade/15"
          >
            <Icon size={19} strokeWidth={1.5} className="h-[19px] w-[19px]" aria-hidden="true" />
          </a>
        ))}
      </div>
    </div>
  );
}
