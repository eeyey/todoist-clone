import { TODAY, TOMMOROW } from './constats';

export const isToday = (date: Date | number | null) => {
  return date && +date > +TODAY && +date < +TOMMOROW;
};
