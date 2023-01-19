export const TODAY = new Date();

TODAY.setHours(0);
TODAY.setMinutes(0);
TODAY.setSeconds(0);
TODAY.setMilliseconds(0);

export const TOMMOROW = new Date(+TODAY + 86400000);
export const HOLIDAYS = new Date(
  +TODAY + 86400000 * (TODAY.getDay() > 0 ? 6 - TODAY.getDay() : 6),
);
export const NEXT_WEEK = new Date(
  +TODAY + 86400000 * (TODAY.getDay() > 0 ? 8 - TODAY.getDay() : 1),
);
