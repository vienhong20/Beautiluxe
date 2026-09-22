import { useId, useRef, useState } from 'react';
import { Phone } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import Badge from '../components/core/Badge.jsx';
import CoralDrop from '../components/media/CoralDrop.jsx';
import Reveal from '../components/motion/Reveal.jsx';
import { SERVICE_MENU } from '../data/services.js';
import { BUSINESS } from '../data/business.js';

const normalize = (item) => (typeof item === 'string' ? { name: item } : item);

export default function ServiceMenu() {
  const [active, setActive] = useState(SERVICE_MENU[0].id);
  const tabRefs = useRef([]);
  const baseId = useId();
  const reduce = useReducedMotion();
  const current = SERVICE_MENU.find((c) => c.id === active);

  const onKeyDown = (event, index) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const next = (index + step + SERVICE_MENU.length) % SERVICE_MENU.length;
    setActive(SERVICE_MENU[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="menu" className="section-pad bg-seaglass">
      <div className="container-x">
        <Reveal className="mb-8 flex flex-col gap-6 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex max-w-2xl flex-col gap-4">
            <h2 className="flex items-center gap-3 text-[32px] lg:text-[46px]">
              <CoralDrop className="h-7 w-5" />
              The menu
            </h2>
            <p className="text-muted">
              Every service we offer. Pricing depends on the service, so call us for a quote or book online.
            </p>
          </div>
          <a href={BUSINESS.phoneHref} className="inline-flex min-h-12 items-center gap-2 font-medium text-jade hover:underline">
            <Phone size={18} strokeWidth={1.5} aria-hidden="true" />
            <span className="num">Call for pricing · {BUSINESS.phoneDisplay}</span>
          </a>
        </Reveal>

        <div
          role="tablist"
          aria-label="Service categories"
          className="no-scrollbar -mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {SERVICE_MENU.map((cat, index) => {
            const selected = cat.id === active;
            return (
              <button
                key={cat.id}
                ref={(el) => (tabRefs.current[index] = el)}
                id={`${baseId}-tab-${cat.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`${baseId}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(cat.id)}
                onKeyDown={(e) => onKeyDown(e, index)}
                className={`inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full px-5 text-[16px] font-medium transition-colors ${
                  selected ? 'bg-jade text-foam' : 'bg-foam text-ink hover:text-jade'
                }`}
              >
                {cat.label}
                <span className={`num !text-[14px] ${selected ? 'text-foam/80' : 'text-muted'}`}>{cat.items.length}</span>
              </button>
            );
          })}
        </div>

        <div
          id={`${baseId}-panel`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${active}`}
          className="overflow-hidden rounded-[var(--radius-card)] bg-foam shadow-[var(--shadow-ambient)]"
        >
          <div className="p-6 sm:p-8 lg:p-10">
            <AnimatePresence mode="wait">
              <motion.ul
                key={active}
                className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3"
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                {current.items.map(normalize).map((item) => (
                  <li
                    key={item.name}
                    className="flex min-h-14 items-center justify-between gap-3 border-b border-jade/10 py-3"
                  >
                    <span className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-jade" aria-hidden="true" />
                      <span className="font-medium text-ink">{item.name}</span>
                    </span>
                    {item.signature && <Badge>Signature</Badge>}
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>
            <p className="mt-8 text-muted">Not sure what to pick? We&apos;ll help you choose.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
