import { ArrowUpRight } from 'lucide-react';
import { useReducedMotion } from 'motion/react';

// A slow-spinning circular "BOOK NOW" stamp, echoing the logo's own circular
// mark. Text rides an SVG circle path so it stays legible at any rotation;
// the whole badge spins via CSS animation, paused under reduced motion.
export default function RotatingBadge({ href, external, className = '' }) {
  const reduce = useReducedMotion();
  const id = 'rotating-badge-path';

  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      aria-label="Book an appointment"
      className={`group relative inline-flex h-[104px] w-[104px] items-center justify-center rounded-full bg-foam shadow-[var(--shadow-ambient)] ${className}`}
    >
      <svg
        viewBox="0 0 100 100"
        className={reduce ? '' : 'animate-[spin_9s_linear_infinite]'}
        aria-hidden="true"
      >
        <defs>
          <path id={id} d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" />
        </defs>
        <text className="fill-jade text-[11px] font-medium uppercase" style={{ letterSpacing: '0.22em' }}>
          <textPath href={`#${id}`} startOffset="0%">
            Book Now &nbsp;&middot;&nbsp; Book Now &nbsp;&middot;&nbsp;
          </textPath>
        </text>
      </svg>
      <span className="absolute inline-flex h-8 w-8 items-center justify-center rounded-full bg-jade text-foam transition-transform group-hover:scale-110">
        <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
      </span>
    </a>
  );
}
