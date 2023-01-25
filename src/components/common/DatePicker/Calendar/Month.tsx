import React from 'react';

import classnames from 'classnames';

import { MONTH_NAMES, TODAY } from '../../../../core/utils/date';

import { DateInfo, IDetail } from './types';

interface CalendarMonthProps {
  weeks: DateInfo[][];
  month: number;
  onChange: (date: Date) => void;
  setDetail: (detail: IDetail | null) => void;
  selected?: Date | null;
  showTitle?: boolean;
}

export const CalendarMonth: React.FC<CalendarMonthProps> = (props) => {
  const { weeks, month, onChange, setDetail, selected, showTitle } = props;

  const title = MONTH_NAMES.full[month];

  return (
    <div className="calendar__month">
      {showTitle && <div className="calendar__month-title">{title}</div>}
      {weeks.map((week, j) => (
        <div key={j} className="calendar__row">
          {week.map(({ date, active }) => {
            const dateClassName = classnames('calendar__date', {
              calendar__date_inactive: !active,
              calendar__date_holiday:
                date.getDay() === 0 || date.getDay() === 6,
              calendar__date_TODAY: +date === +TODAY,
              calendar__date_selected: selected && +selected === +date,
            });

            return active ? (
              <div
                key={date.getDate()}
                onMouseOver={setDetail.bind(this, { date, taskCount: 1 })}
                onMouseOut={setDetail.bind(this, null)}
                onClick={onChange.bind(this, date)}
                className="calendar__cell"
              >
                <div className={dateClassName}>{date.getDate()}</div>
              </div>
            ) : (
              <div key={date.getDate()} className="calendar__cell">
                <div className={dateClassName}>{date.getDate()}</div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
