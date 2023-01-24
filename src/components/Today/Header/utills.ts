import { DAY_NAMES, TODAY, MONTH_NAMES } from '../../../core/utils/date';

export const getTodayLine = () => {
  const dayName = DAY_NAMES.short[TODAY.getDay()];
  const date = TODAY.getDate();
  const monthName = MONTH_NAMES.short[TODAY.getMonth()].toLowerCase();

  return `${dayName} ${date} ${monthName}`;
};
