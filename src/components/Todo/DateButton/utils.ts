import { MONTH_NAMES, DAY_NAMES } from '../../../core/utils/date/short-names';
import { NEXT_WEEK, TODAY, TOMMOROW } from '../../../core/utils/date/constats';

export const getTextAndStyle = (date: Date | null) => {
  let className = '';
  let buttonText = '';

  const currentDay = TODAY.getDay() === 0 ? 7 : TODAY.getDay();
  const weekLater = +NEXT_WEEK + currentDay * 3600 * 24 * 1000;

  if (!date) {
    buttonText = 'Срок выполнения';
  } else if (+date === +TODAY) {
    className = 'date-button_today';
    buttonText = 'Сегодня';
  } else if (+date === +TOMMOROW) {
    className = 'date-button_tommorow';
    buttonText = 'Завтра';
  } else if (+date > +TODAY && +date < weekLater) {
    className = 'date-button_next-week';
    buttonText = DAY_NAMES.full[date.getDay()];
  } else {
    buttonText = `${date.getDate()} ${MONTH_NAMES.short[date.getMonth()]}`;

    if (+date < +TODAY) {
      className = 'date-button_overdue';
    }

    if (date.getFullYear() > TODAY.getFullYear()) {
      buttonText += ` ${date.getFullYear()}`;
    }
  }

  return [className, buttonText];
};
