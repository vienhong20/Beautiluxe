import { BUSINESS } from '../data/business.js';

// Minimal copyright bar. Address/phone/hours already live in the Visit
// section and Header, so a full footer would just repeat them — kept the
// bottom padding generous on mobile so the text clears StickyBookBar.
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark bg-ink px-4 py-5 pb-24 text-center text-[12px] leading-relaxed text-foam/70 sm:px-6 lg:px-12 lg:pb-5">
      © {year} {BUSINESS.name}.
      <br />
      Powered by EezyMarketing.
    </footer>
  );
}
