const BASE =
  'sheen inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 font-sans text-[17px] font-medium leading-none transition-colors duration-200 select-none';

const VARIANTS = {
  primary: 'bg-jade text-foam hover:bg-ink',
  secondary: 'bg-seaglass text-jade hover:bg-foam ring-1 ring-inset ring-jade/15',
  ghost: 'bg-transparent text-jade ring-1 ring-inset ring-jade hover:bg-seaglass',
  coral: 'bg-coral text-ink hover:bg-foam',
  light: 'bg-foam text-jade hover:bg-seaglass',
  outlineLight: 'bg-transparent text-foam ring-1 ring-inset ring-foam/70 hover:bg-foam hover:text-jade',
};

export default function Button({ as = 'a', variant = 'primary', className = '', external = false, children, ...props }) {
  const Tag = as;
  const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  return (
    <Tag className={`${BASE} ${VARIANTS[variant]} ${className}`} {...externalProps} {...props}>
      {children}
    </Tag>
  );
}
