import React from 'react';

import classnames from 'classnames';

import { LeftArrowIcon24, RightArrowIcon24 } from '../../../icons';

import { MONTH_NAMES, TODAY } from '../../../../core/utils/date';

import { IMonthBorder } from './types';

interface CalendarHeaderProps {
  scroll: number;
  monthOffset: number;
  monthBorders: IMonthBorder[];
  setMonthOffset: (offset: number) => void;
  setScroll: (scroll: number) => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = (props) => {
  const { scroll, monthOffset, monthBorders, setMonthOffset, setScroll } =
    props;

  const setPrevMonth = () => {
    if (monthOffset === 0) return;

    setScroll(-monthBorders[monthOffset - 1].start);
    setMonthOffset(monthOffset - 1);
  };

  const setTodayMonth = () => {
    setScroll(0);
    setMonthOffset(0);
  };

  const setNextMonth = () => {
    setScroll(-monthBorders[monthOffset + 1].start);
    setMonthOffset(monthOffset + 1);
  };

  const monthName = MONTH_NAMES.full[(TODAY.getMonth() + monthOffset) % 12];
  const year =
    TODAY.getFullYear() + Math.floor((monthOffset + TODAY.getMonth()) / 12);

  return (
    <div className="calendar__header">
      <h3 className="calendar__current">
        {monthName} {year}
      </h3>
      <div className="calendar__nav">
        <button
          onClick={setPrevMonth}
          className={classnames('calendar__button', {
            calendar__button_inactive: monthOffset === 0,
          })}
        >
          <LeftArrowIcon24 />
        </button>
        <button
          onClick={setTodayMonth}
          className={classnames('calendar__button', {
            calendar__button_inactive: scroll === 0,
          })}
        >
          <div className="calendar__circle"></div>
        </button>
        <button onClick={setNextMonth} className="calendar__button">
          <RightArrowIcon24 />
        </button>
      </div>
    </div>
  );
};
