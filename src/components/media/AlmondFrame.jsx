// Signature motif: tall almond / nail-tip crop with a 1.5px Deep Jade hairline held 6px outside the image.
const OUTLINE = 'M50 0C77 11 100 36 100 64C100 86 80 100 50 100C20 100 0 86 0 64C0 36 23 11 50 0Z';

export default function AlmondFrame({
  src,
  alt,
  className = '',
  ratio = 'aspect-[3/4]',
  line = 'stroke-jade',
  loading = 'lazy',
  priority = false,
  halo = false,
}) {
  return (
    <figure className={`sheen-group p-[6px] ${/\babsolute\b/.test(className) ? '' : 'relative'} ${className}`}>
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d={OUTLINE} className={`${line} ${halo ? 'fill-foam' : 'fill-none'}`} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className={`almond-mask sheen relative w-full max-w-full ${ratio} bg-seaglass`}>
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : loading}
          fetchpriority={priority ? 'high' : 'auto'}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </figure>
  );
}
