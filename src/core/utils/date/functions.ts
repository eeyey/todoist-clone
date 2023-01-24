import { TODAY, TOMMOROW } from './constats';
import { DMY } from './types';

export const isToday = (date: Date | number | null) => {
  return date && +date >= +TODAY && +date < +TOMMOROW;
};

export const nextDay = (date: Date | number) => {
  return new Date(+date + 24 * 3600 * 1000);
};

export const getDMY = (data: Date | number): DMY => {
  const date = data instanceof Date ? data : new Date(data);

  const d = date.getDate();
  const m = date.getMonth();
  const y = date.getFullYear();

  return `${d}-${m}-${y}`;
};

export const getDMYArray = (from: Date | number, limit: number) => {
  const DMYArray: DMY[] = [];

  let i = 0;
  let date = from instanceof Date ? from : new Date(from);
  while (i < limit) {
    DMYArray.push(getDMY(date));

    date = nextDay(date);
    i++;
  }

  return DMYArray;
};

export const getDateFromDMY = (dateString: DMY) => {
  const [d, m, y] = dateString.split('-');

  return new Date(+y, +m, +d);
};
