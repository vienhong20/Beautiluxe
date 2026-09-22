import Badge from './Badge.jsx';
import CoralDrop from '../media/CoralDrop.jsx';
import AlmondFrame from '../media/AlmondFrame.jsx';

export default function ServiceCard({ title, tagline, body, badge, photo, action }) {
  return (
    <article className="reveal flex h-full flex-col gap-4 rounded-[var(--radius-card)] bg-seaglass p-6 shadow-[var(--shadow-ambient)] sm:p-8">
      {photo && <AlmondFrame src={photo.src} alt={photo.alt} className="mx-auto w-40" />}
      <div className="flex items-center justify-between gap-3">
        <CoralDrop className="h-6 w-4" />
        {badge && <Badge>{badge}</Badge>}
      </div>
      <h3 className="text-[24px] text-ink">{title}</h3>
      {tagline && <p className="tagline -mt-2 text-[19px] text-jade">{tagline}</p>}
      <p className="text-muted">{body}</p>
      {action && <div className="mt-auto pt-2">{action}</div>}
    </article>
  );
}
