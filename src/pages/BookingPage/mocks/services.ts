import type { Service } from '../types';

export const services: Service[] = [
  { id: 'tradicional', name: 'Corte Tradicional', price: 35, duration: 30 },
  { id: 'degrade', name: 'Corte Degradê', price: 45, duration: 45 },
  { id: 'barba', name: 'Barba', price: 30, duration: 30 },
  { id: 'combo', name: 'Corte + Barba', price: 70, duration: 60 }
];
