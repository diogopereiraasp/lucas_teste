import type { TimeSlot } from '../types';

const baseSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];
const unavailableSlots = new Set(['11:00', '16:00']);

export const getTimeSlots = (): TimeSlot[] =>
  baseSlots.map((time) => ({
    time,
    available: !unavailableSlots.has(time)
  }));
