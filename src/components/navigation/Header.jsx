import { Phone } from 'lucide-react';
import Button from '../core/Button.jsx';
import logoFullJade from '../../assets/logos/logo-full-jade.webp';
import { BUSINESS, BOOKING_URL, HAS_BOOKING } from '../../data/business.js';

const NAV = [
  { href: '#signatures', label: 'Signatures' },
  { href: '#menu', label: 'Menu' },
  { href: '#work', label: 'Our Work' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#visit', label: 'Visit' },
];

export default function Header() {
  return (
    <header className="sticky top-[env(safe-area-inset-top,0px)] z-40 border-b border-jade/10 bg-foam/95 backdrop-blur-md">
      <div className="container-x flex h-[72px] items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-12">
        <a href="#top" className="shrink-0" aria-label={`${BUSINESS.name} home`}>
          <img src={logoFullJade} alt={BUSINESS.name} width="720" height="621" className="h-[58px] w-auto lg:h-[68px]" />
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-[15px] font-medium text-ink underline-offset-8 transition-colors hover:text-jade hover:underline"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={BUSINESS.phoneHref}
            className="num hidden items-center gap-2 font-medium text-jade hover:underline lg:inline-flex"
          >
            <Phone size={17} strokeWidth={1.5} aria-hidden="true" />
            {BUSINESS.phoneDisplay}
          </a>
          <a
            href={BUSINESS.phoneHref}
            className="sheen inline-flex h-11 w-11 items-center justify-center rounded-full bg-seaglass text-jade lg:hidden"
            aria-label={`Call ${BUSINESS.phoneDisplay}`}
          >
            <Phone size={19} strokeWidth={1.5} aria-hidden="true" />
          </a>
          <Button href={BOOKING_URL} external={HAS_BOOKING} className="hidden sm:inline-flex">
            Book Now
          </Button>
        </div>
      </div>
    </header>
  );
}
