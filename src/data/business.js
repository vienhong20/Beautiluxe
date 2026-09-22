export const BUSINESS = {
  name: 'BeautiLuxe Nail Spa',
  street: '9882 Glades Rd, Suite E-7',
  cityLine: 'Boca Raton, FL 33434',
  phoneDisplay: '561-465-5948',
  phoneHref: 'tel:5614655948',
  instagram: { handle: '@beautiluxenailspa', url: 'https://www.instagram.com/beautiluxenailspa' },
  facebook: 'https://www.facebook.com/profile.php?id=100090760867621',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=BeautiLuxe%20Nail%20Spa&query_place_id=ChIJm6ZCcOIb2YgRlyuoNVAGzKE',
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=BeautiLuxe%20Nail%20Spa&destination_place_id=ChIJm6ZCcOIb2YgRlyuoNVAGzKE',
  google: { rating: 4.8, reviewCount: 1085 },
};

// Salon's external booking software. Set VITE_BOOKING_URL in Vercel → Settings → Environment Variables.
export const BOOKING_URL = import.meta.env.VITE_BOOKING_URL || '#';
export const HAS_BOOKING = BOOKING_URL !== '#';

// 0 = Sunday … 6 = Saturday. Times are 24h "HH:MM" in the salon's local time (America/New_York).
export const HOURS = [
  { day: 'Sunday', short: 'Sun', open: '10:00', close: '17:00' },
  { day: 'Monday', short: 'Mon', open: '09:00', close: '19:00' },
  { day: 'Tuesday', short: 'Tue', open: '09:00', close: '19:00' },
  { day: 'Wednesday', short: 'Wed', open: '09:00', close: '19:00' },
  { day: 'Thursday', short: 'Thu', open: '09:00', close: '19:00' },
  { day: 'Friday', short: 'Fri', open: '09:00', close: '19:00' },
  { day: 'Saturday', short: 'Sat', open: '09:00', close: '19:00' },
];

export const formatTime = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, '0')} ${suffix}`;
};

export const DRINKS = [
  'Champagne',
  'Moscato',
  'Red Wine',
  'White Wine',
  'Margarita',
  'Fruit Punch',
  'Coke',
  'Diet Coke',
  'Sprite',
  'Water',
];
