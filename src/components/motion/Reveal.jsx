import { motion, useReducedMotion } from 'motion/react';

// Gentle rise-and-fade on scroll entry. Collapses to instant/static under
// prefers-reduced-motion. Use for section headers, cards, and list items —
// stagger via `delay` (seconds) when revealing a group in sequence.
export default function Reveal({ as = 'div', delay = 0, y = 20, className = '', children, ...props }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] ?? motion.div;

  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      {children}
    </Tag>
  );
}
