// Signature motif: soft rounded-rect crop with a 1.5px Deep Jade hairline
// held 6px outside the image. Replaces the earlier almond / nail-tip mask.
export default function PhotoFrame({
  src,
  alt,
  className = '',
  ratio = 'aspect-[3/4]',
  radius = 'rounded-[28px]',
  innerRadius = 'rounded-[22px]',
  loading = 'lazy',
  priority = false,
  halo = false,
  ringClass = 'ring-jade/70',
}) {
  const isAbsolute = /\babsolute\b/.test(className);
  return (
    <figure
      className={`sheen-group p-[6px] ${isAbsolute ? '' : 'relative'} ${radius} ${halo ? 'bg-foam' : ''} ${className}`}
    >
      <span className={`pointer-events-none absolute inset-0 ${radius} ring-1 ${ringClass}`} aria-hidden="true" />
      <div className={`sheen relative w-full max-w-full overflow-hidden ${innerRadius} ${ratio} bg-seaglass`}>
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
