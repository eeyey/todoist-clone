import {
  DAY_NAMES,
  MONTH_NAMES,
  TODAY,
  TOMMOROW,
} from '../../../core/utils/date';

export const getHeaderName = (date: Date) => {
  const day = date.getDate();
  const monthName = MONTH_NAMES.short[date.getMonth()];
  const dayName = DAY_NAMES.full[date.getDay()];

  if (+date === +TODAY) {
    return `${day} ${monthName} ‧ Сегодня ‧ ${dayName}`;
  } else if (+date === +TOMMOROW) {
    return `${day} ${monthName} ‧ Завтра ‧ ${dayName}`;
  }

  return `${day} ${monthName} ‧ ${dayName}`;
};
