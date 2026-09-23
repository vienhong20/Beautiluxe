import Button from './Button.jsx';
import { useBookingModal } from '../../context/BookingModalContext.jsx';
import { BOOKING_URL, HAS_BOOKING } from '../../data/business.js';

// Drop-in for every "Book Now" control: once VITE_BOOKING_URL is set this
// behaves exactly like a normal external-link Button. Until then, it opens
// the "booking is almost here, call us" modal instead of navigating to "#".
export default function BookNowButton({ children = 'Book Now', ...props }) {
  const { open } = useBookingModal();

  if (HAS_BOOKING) {
    return (
      <Button href={BOOKING_URL} external {...props}>
        {children}
      </Button>
    );
  }

  return (
    <Button as="button" type="button" onClick={open} {...props}>
      {children}
    </Button>
  );
}
