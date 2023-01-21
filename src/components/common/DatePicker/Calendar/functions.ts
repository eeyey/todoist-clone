import {
  DAY_NAMES,
  MONTH_NAMES,
} from '../../../../core/utils/date/short-names';
import { DateInfo } from './types';

function getInactiveDays(d: Date): DateInfo[] {
  const inActiveDays = [];

  let date = d;

  const month = date.getMonth();

  while (
    (date.getMonth() === month && date.getDay() !== 0) ||
    !inActiveDays.length
  ) {
    inActiveDays.unshift({
      date,
      active: false,
    });

    date = new Date(+date - 3600 * 1000 * 24);
  }

  return inActiveDays.slice(0, inActiveDays.length - 1);
}

function getMonthDaysFrom(start: Date): DateInfo[][] {
  const weeks: DateInfo[][] = [[]];
  const month = start.getMonth();

  let date = start;

  while (date.getMonth() === month) {
    weeks?.at(-1)?.push({
      date,
      active: true,
    });

    if (date.getDay() === 0) weeks.push([]);

    date = new Date(+date + 3600 * 1000 * 24);
  }

  return weeks;
}

export function getMonthsFrom(from: Date, count: number = 0): DateInfo[][][] {
  const months = [getMonthDaysFrom(from)];

  for (let i = 0; i < count; i++) {
    months.push(
      getMonthDaysFrom(
        new Date(from.getFullYear(), from.getMonth() + i + 1, 1),
      ),
    );
  }

  months[0][0] = [...getInactiveDays(from), ...months[0][0]];

  return months;
}

export function getDetailString(date: Date) {
  const dayOfWeek = DAY_NAMES.short[date.getDay()];
  const monthName = MONTH_NAMES.short[date.getMonth()];

  return `${dayOfWeek} ${date.getDate()} ${monthName}`;
}
