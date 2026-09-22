import { Clock, GlassWater, MapPin } from 'lucide-react';
import RatingStars from '../components/feedback/RatingStars.jsx';
import Reveal from '../components/motion/Reveal.jsx';
import { BUSINESS } from '../data/business.js';

// Social proof and practical facts, given their own breathing room directly
// under the hero rather than crowding the hero's own copy stack.
export default function TrustBar() {
  return (
    <section className="section-pad-tight border-y border-jade/10 bg-seaglass/60">
      <div className="container-x flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <Reveal
          as="a"
          href={BUSINESS.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="sheen inline-flex shrink-0 flex-wrap items-center gap-x-3 gap-y-1 rounded-full bg-jade py-2.5 pl-4 pr-5 text-foam"
        >
          <RatingStars value={BUSINESS.google.rating} size={17} />
          <span className="text-[15px]">
            <span className="num !text-[16px] font-medium">{BUSINESS.google.rating}</span> on Google ·{' '}
            <span className="num !text-[16px]">{BUSINESS.google.reviewCount.toLocaleString('en-US')}</span> reviews
          </span>
        </Reveal>

        <ul className="grid gap-3 sm:grid-cols-3 lg:flex lg:gap-8">
          <li>
            <a
              href={BUSINESS.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-jade"
            >
              <MapPin size={20} strokeWidth={1.5} className="shrink-0 text-jade" aria-hidden="true" />
              <span className="leading-snug">
                <span className="block text-[15px] font-medium">{BUSINESS.street}</span>
                <span className="text-[14px] text-muted">{BUSINESS.cityLine}</span>
              </span>
            </a>
          </li>
          <li className="flex items-center gap-3">
            <Clock size={20} strokeWidth={1.5} className="shrink-0 text-jade" aria-hidden="true" />
            <span className="leading-snug">
              <span className="num block text-[15px] font-medium">Mon–Sat 9 AM – 7 PM</span>
              <span className="num text-[14px] text-muted">Sun 10 AM – 5 PM</span>
            </span>
          </li>
          <li className="flex items-center gap-3">
            <GlassWater size={20} strokeWidth={1.5} className="shrink-0 text-jade" aria-hidden="true" />
            <span className="leading-snug">
              <span className="block text-[15px] font-medium">Walk-ins &amp; appointments</span>
              <span className="text-[14px] text-muted">Free drink every visit</span>
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}
