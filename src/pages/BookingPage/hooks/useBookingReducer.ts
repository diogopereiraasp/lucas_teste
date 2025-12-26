import { useReducer } from 'react';
import type { BookingAction, BookingState } from '../types';

const initialState: BookingState = {
  step: 'service',
  notes: '',
  paymentConfirmed: false,
  loading: false
};

const reducer = (state: BookingState, action: BookingAction): BookingState => {
  switch (action.type) {
    case 'SELECT_SERVICE':
      return { ...state, serviceId: action.payload };
    case 'SELECT_BARBER':
      return { ...state, barberId: action.payload };
    case 'SELECT_DATE':
      return { ...state, date: action.payload, timeSlot: undefined };
    case 'SELECT_TIME':
      return { ...state, timeSlot: action.payload };
    case 'SET_NOTES':
      return { ...state, notes: action.payload };
    case 'SET_STEP':
      return { ...state, step: action.payload };
    case 'NEXT_STEP': {
      const order = ['service', 'schedule', 'review', 'payment'] as const;
      const index = order.indexOf(state.step);
      return { ...state, step: order[Math.min(index + 1, order.length - 1)] };
    }
    case 'PREV_STEP': {
      const order = ['service', 'schedule', 'review', 'payment'] as const;
      const index = order.indexOf(state.step);
      return { ...state, step: order[Math.max(index - 1, 0)] };
    }
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'CONFIRM_PAYMENT':
      return { ...state, paymentConfirmed: action.payload };
    case 'CONFIRM_BOOKING':
      return { ...state, successCode: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

export const useBookingReducer = () => useReducer(reducer, initialState);
