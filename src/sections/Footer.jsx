import logoFullGold from '../assets/logos/logo-full-gold.webp';
import { BUSINESS } from '../data/business.js';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark bg-ink px-4 pb-32 pt-16 text-foam sm:px-6 lg:px-12 lg:pb-12">
      <div className="container-x flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <img src={logoFullGold} alt={BUSINESS.name} width="720" height="621" loading="lazy" className="h-28 w-auto self-start" />
        <div className="grid gap-6 text-[16px] sm:grid-cols-3 sm:gap-12">
          <div>
            <p className="mb-1 font-medium text-gold">Visit</p>
            <p className="text-foam/85">{BUSINESS.street}</p>
            <p className="text-foam/85">{BUSINESS.cityLine}</p>
          </div>
          <div>
            <p className="mb-1 font-medium text-gold">Call</p>
            <a href={BUSINESS.phoneHref} className="num text-foam hover:underline">
              {BUSINESS.phoneDisplay}
            </a>
          </div>
          <div>
            <p className="mb-1 font-medium text-gold">Hours</p>
            <p className="num !text-[16px] text-foam/85">Mon–Sat 9 AM – 7 PM</p>
            <p className="num !text-[16px] text-foam/85">Sun 10 AM – 5 PM</p>
          </div>
        </div>
      </div>
      <div className="container-x mt-12 border-t border-foam/15 pt-6 text-[15px] text-foam/70">
        © {year} {BUSINESS.name} · Boca Raton, Florida
      </div>
    </footer>
  );
}
