import { createContext, useCallback, useContext, useState } from 'react';
import BookingModal from '../components/feedback/BookingModal.jsx';

const BookingModalContext = createContext(null);

// Shared "online booking isn't live yet" popup, reachable from anywhere a
// Book Now control lives (Header, Hero's button, Hero's rotating badge) —
// one Provider at the app root, one modal instance, no prop drilling.
export function BookingModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <BookingModalContext.Provider value={{ open }}>
      {children}
      <BookingModal isOpen={isOpen} onClose={close} />
    </BookingModalContext.Provider>
  );
}

export function useBookingModal() {
  const ctx = useContext(BookingModalContext);
  if (!ctx) {
    throw new Error('useBookingModal must be used within a BookingModalProvider');
  }
  return ctx;
}
