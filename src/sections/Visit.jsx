import { Facebook, Instagram, MapPin, Navigation, Phone } from 'lucide-react';
import Button from '../components/core/Button.jsx';
import CoralDrop from '../components/media/CoralDrop.jsx';
import TikTokIcon from '../components/media/TikTokIcon.jsx';
import Reveal from '../components/motion/Reveal.jsx';
import useOpenStatus from '../hooks/useOpenStatus.js';
import mapLocation from '../assets/photos/map-location-1.webp';
import { BUSINESS, HOURS, formatTime } from '../data/business.js';

// Display Monday-first, keep HOURS indexed Sunday-first for Date math.
const WEEK = [1, 2, 3, 4, 5, 6, 0];

export default function Visit() {
  const { dayIndex, label } = useOpenStatus();

  return (
    <section id="visit" className="section-pad relative overflow-hidden bg-seaglass">
      <img
        src={mapLocation}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full scale-110 object-cover object-[50%_30%] opacity-35 blur-sm"
      />
      <div className="absolute inset-0 bg-seaglass/55" aria-hidden="true" />
      <div className="container-x relative">
        <Reveal className="mb-10 flex max-w-2xl flex-col gap-4 lg:mb-14">
          <h2 className="flex items-center gap-3 text-[32px] lg:text-[46px]">
            <CoralDrop className="h-7 w-5" />
            Come see us
          </h2>
          <p className="text-muted">Walk-ins welcome. Appointments get the chair first.</p>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-2 lg:gap-8">
          <Reveal className="rounded-[var(--radius-card)] bg-foam p-4 shadow-[var(--shadow-soft)] sm:p-8">
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-[22px]">Hours</h3>
              <span className="num !text-[16px] font-medium text-jade">{label}</span>
            </div>
            <table className="w-full border-collapse">
              <caption className="sr-only">Opening hours</caption>
              <tbody>
                {WEEK.map((i) => {
                  const d = HOURS[i];
                  const today = i === dayIndex;
                  return (
                    <tr key={d.day} className={today ? 'bg-jade text-foam' : 'border-b border-jade/10'}>
                      <th scope="row" className={`py-3 pl-3 text-left font-medium ${today ? 'rounded-l-full' : ''}`}>
                        {d.day}
                        {today && <span className="ml-2 hidden text-[14px] font-normal text-foam/80 sm:inline">Today</span>}
                      </th>
                      <td className={`num whitespace-nowrap py-3 pr-3 text-right ${today ? 'rounded-r-full' : 'text-ink'}`}>
                        {formatTime(d.open)} – {formatTime(d.close)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-6 rounded-[var(--radius-card)] bg-foam p-6 shadow-[var(--shadow-soft)] sm:p-8">
            <h3 className="text-[22px]">Find us</h3>
            <a
              href={BUSINESS.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 hover:text-jade"
            >
              <MapPin size={24} strokeWidth={1.5} className="mt-0.5 shrink-0 text-jade" aria-hidden="true" />
              <span>
                <span className="block text-[18px] font-medium">{BUSINESS.street}</span>
                <span className="text-muted">{BUSINESS.cityLine}</span>
              </span>
            </a>
            <a href={BUSINESS.phoneHref} className="flex items-center gap-4 hover:text-jade">
              <Phone size={24} strokeWidth={1.5} className="shrink-0 text-jade" aria-hidden="true" />
              <span className="num !text-[19px] font-medium">{BUSINESS.phoneDisplay}</span>
            </a>
            <div className="flex items-center gap-4">
              <a
                href={BUSINESS.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 font-medium text-jade hover:underline"
              >
                <Instagram size={22} strokeWidth={1.5} aria-hidden="true" />
                {BUSINESS.instagram.handle}
              </a>
              <a
                href={BUSINESS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full text-jade hover:bg-seaglass"
                aria-label="BeautiLuxe Nail Spa on Facebook"
              >
                <Facebook size={22} strokeWidth={1.5} aria-hidden="true" />
              </a>
              <a
                href={BUSINESS.tiktok.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full text-jade hover:bg-seaglass"
                aria-label="BeautiLuxe Nail Spa on TikTok"
              >
                <TikTokIcon className="h-[22px] w-[22px]" />
              </a>
            </div>
            <div className="mt-auto pt-2">
              <Button href={BUSINESS.directionsUrl} external variant="ghost" className="w-full sm:w-auto">
                <Navigation size={18} strokeWidth={1.5} aria-hidden="true" />
                Get Directions
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
