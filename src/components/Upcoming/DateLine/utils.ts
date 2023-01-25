const DAY_LENGTH = 24 * 3600 * 1000;

export const getWeekRow = (date: Date) => {
  const day = date.getDay() === 0 ? 7 : date.getDay();

  const days = [1, 2, 3, 4, 5, 6, 7].map(
    (i) => new Date(+date - (day - i) * DAY_LENGTH),
  );

  return days;
};
