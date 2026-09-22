import { useEffect, useState } from 'react';
import { HOURS, formatTime } from '../data/business.js';

const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

// Reads the current time in the salon's timezone, not the visitor's.
const salonNow = () => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const get = (type) => parts.find((p) => p.type === type)?.value;
  const dayIndex = HOURS.findIndex((d) => d.short === get('weekday'));
  return { dayIndex, minutes: Number(get('hour')) * 60 + Number(get('minute')) };
};

const computeStatus = () => {
  const { dayIndex, minutes } = salonNow();
  const today = HOURS[dayIndex];
  const open = toMinutes(today.open);
  const close = toMinutes(today.close);

  if (minutes >= open && minutes < close) {
    return { dayIndex, isOpen: true, label: `Open now · until ${formatTime(today.close)}` };
  }
  if (minutes < open) {
    return { dayIndex, isOpen: false, label: `Opens today at ${formatTime(today.open)}` };
  }
  const tomorrow = HOURS[(dayIndex + 1) % 7];
  return { dayIndex, isOpen: false, label: `Closed · opens ${tomorrow.short} ${formatTime(tomorrow.open)}` };
};

export default function useOpenStatus() {
  const [status, setStatus] = useState(computeStatus);

  useEffect(() => {
    const id = setInterval(() => setStatus(computeStatus()), 60_000);
    return () => clearInterval(id);
  }, []);

  return status;
}
