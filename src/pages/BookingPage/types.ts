export type Step = 'service' | 'schedule' | 'review' | 'payment';

export type Service = {
  id: string;
  name: string;
  price: number;
  duration: number;
};

export type Barber = {
  id: string;
  name: string;
  focus: string;
};

export type TimeSlot = {
  time: string;
  available: boolean;
};

export type BookingState = {
  step: Step;
  serviceId?: string;
  barberId?: string;
  date?: string;
  timeSlot?: string;
  notes: string;
  paymentConfirmed: boolean;
  loading: boolean;
  successCode?: string;
};

export type BookingAction =
  | { type: 'SELECT_SERVICE'; payload: string }
  | { type: 'SELECT_BARBER'; payload?: string }
  | { type: 'SELECT_DATE'; payload: string }
  | { type: 'SELECT_TIME'; payload: string }
  | { type: 'SET_NOTES'; payload: string }
  | { type: 'SET_STEP'; payload: Step }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'CONFIRM_PAYMENT'; payload: boolean }
  | { type: 'CONFIRM_BOOKING'; payload: string }
  | { type: 'RESET' };
