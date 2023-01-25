import React from 'react';

import classnames from 'classnames';
import throttle from 'lodash.throttle';

import { selectTodos, useAppSelector } from '../../../core/store';

import { scrollToElement } from '../../../core/utils/DOM';
import { DAY_NAMES, TODAY } from '../../../core/utils/date';
import { getWeekRow } from './utils';

import './DateLine.css';

interface DateLineProps {
  date: Date;
  setDate: (date: Date) => void;
}

const CONTAINER_SELECTOR = '.todo-container';
const HEADER_SELECTOR = '.upcoming-header';
const UPDATE_DELAY = 50;
const POINT: [number, number] = [window.innerWidth / 2, 180];

export const DateLine: React.FC<DateLineProps> = (props) => {
  const { date, setDate } = props;

  const { todos } = useAppSelector(selectTodos);

  const days = React.useMemo(() => {
    const row = getWeekRow(date);

    return row.map((currDate) => ({
      date: currDate,
      weekDay: DAY_NAMES.short[currDate.getDay()],
      day: currDate.getDate(),
      hasTodo: todos.some((todo) => !todo.complete && todo.term === +currDate),
      isActive: +currDate >= +TODAY,
      isCurrent: +currDate === +date,
    }));
  }, [todos, date]);

  React.useEffect(() => {
    const changeDate = throttle(() => {
      const element = document.elementFromPoint(POINT[0], POINT[1]);
      const container = element?.closest(CONTAINER_SELECTOR);

      if (!container || !(container instanceof HTMLElement)) return;
      if (!container.dataset?.timestamp) return;
      if (+container.dataset.timestamp < +TODAY) return;

      const containerDate = new Date(+container.dataset.timestamp);

      setDate(containerDate);
    }, UPDATE_DELAY);

    document.addEventListener('scroll', changeDate);

    return () => {
      document.removeEventListener('scroll', changeDate);
    };
  }, []);

  const cellHandler = (date: Date) => {
    const header = document.querySelector(HEADER_SELECTOR);

    if (!header) return;

    const { bottom: padding } = header.getBoundingClientRect();

    const selector = `${CONTAINER_SELECTOR}[data-timestamp='${+date}']`;
    scrollToElement(selector, padding);

    setDate(date);
  };

  return (
    <div className="dateline">
      {days.map((cell) => {
        return (
          <div
            key={cell.day}
            className={classnames('dateline__date-cell', {
              'dateline__date-cell_current': cell.isCurrent,
              'dateline__date-cell_dot': cell.hasTodo && cell.isActive,
              'dateline__date-cell_inactive': !cell.isActive,
            })}
            onClick={cellHandler.bind(this, cell.date)}
          >
            <div className="dateline__date-week">{cell.weekDay}</div>
            <div
              className={classnames('dateline__date', {
                dateline__date_current: cell.isCurrent,
              })}
            >
              {cell.day}
            </div>
          </div>
        );
      })}
    </div>
  );
};
