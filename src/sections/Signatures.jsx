import ServiceCard from '../components/core/ServiceCard.jsx';
import CoralDrop from '../components/media/CoralDrop.jsx';
import { SIGNATURES } from '../data/services.js';
import { BOOKING_URL, HAS_BOOKING } from '../data/business.js';

export default function Signatures() {
  return (
    <section id="signatures" className="section-pad">
      <div className="container-x">
        <div className="reveal mb-10 flex max-w-2xl flex-col gap-4 lg:mb-14">
          <h2 className="flex items-center gap-3 text-[34px] lg:text-[48px]">
            <CoralDrop className="h-7 w-5" />
            Our signatures
          </h2>
          <p className="text-muted">The three services our regulars ask for by name.</p>
        </div>

        <div className="grid gap-5 md:grid-cols-3 lg:gap-8">
          {SIGNATURES.map((item) => (
            <ServiceCard
              key={item.title}
              {...item}
              badge="Signature"
              action={
                <a
                  href={BOOKING_URL}
                  {...(HAS_BOOKING ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="inline-flex min-h-12 items-center font-medium text-jade underline decoration-jade/30 underline-offset-8 hover:decoration-jade"
                >
                  Book {item.title}
                </a>
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
