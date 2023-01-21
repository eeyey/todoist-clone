import React from 'react';

import {
  MONTH_NAMES,
  DAY_NAMES,
} from '../../../../core/utils/date/short-names';
import { TODAY } from '../../../../core/utils/date/constats';

import { MONTH_HEADER_HEIGHT, ROW_HEIGHT } from './params';
import { CalendarProps, DateInfo, IDetail, IMonthBorder } from './types';

import './calendar.css';
import { getDetailString, getMonthsFrom } from './functions';
import { LeftArrowIcon24, RightArrowIcon24 } from '../../../icons';

export const Calendar: React.FC<CalendarProps> = ({
  onSelect,
  selectedDate,
}) => {
  const [scroll, setScroll] = React.useState<number>(0);
  const [months, setMonths] = React.useState<DateInfo[][][]>(
    getMonthsFrom(TODAY, 3),
  );
  const [curMonthOffset, setMonthOffset] = React.useState<number>(0);
  const [monthBorders, setMonthBorders] = React.useState<IMonthBorder[]>([]);
  const [detail, setDetail] = React.useState<IDetail | null>(null);

  React.useEffect(() => {
    const b: IMonthBorder[] = [
      {
        start: 0,
        end: months[0].length * ROW_HEIGHT,
      },
    ];

    for (let i = 1; i < months.length; i++) {
      const prev = b.at(-1) as IMonthBorder;
      b.push({
        start: prev.end,
        end: prev.end + months[i].length * ROW_HEIGHT + MONTH_HEADER_HEIGHT,
      });
    }

    setMonthBorders(b);
  }, [months]);

  React.useEffect(() => {
    for (let i = 0; i < monthBorders.length; i++) {
      if (monthBorders[i].start <= -scroll && -scroll <= monthBorders[i].end) {
        setMonthOffset(i);
        if (i === monthBorders.length - 1) {
          const year = TODAY.getFullYear();
          const month = TODAY.getMonth() + months.length;

          setMonths([...months, ...getMonthsFrom(new Date(year, month, 1))]);
        }
      }
    }
  }, [scroll, monthBorders]);

  const onCalendarWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    setScroll(e.deltaY > 0 ? scroll - 100 : Math.min(0, scroll + 100));
  };

  const setPrevMonth = () => {
    if (curMonthOffset === 0) return;

    setScroll(-monthBorders[curMonthOffset - 1].start - MONTH_HEADER_HEIGHT);
    setMonthOffset(curMonthOffset - 1);
  };

  const setTodayMonth = () => {
    setScroll(0);
    setMonthOffset(0);
  };

  const setNextMonth = () => {
    setScroll(-monthBorders[curMonthOffset + 1].start - MONTH_HEADER_HEIGHT);
    setMonthOffset(curMonthOffset + 1);
  };

  const calendarTitle = `${
    MONTH_NAMES.full[(TODAY.getMonth() + curMonthOffset) % 12]
  } ${
    TODAY.getFullYear() + Math.floor((curMonthOffset + TODAY.getMonth()) / 12)
  }`;

  const detailString = detail ? getDetailString(detail.date) : '';

  const prevBtnCls =
    'calendar__button ' +
    (curMonthOffset === 0 ? 'calendar__button_inactive' : '');
  const TODAYBtnCls =
    'calendar__button ' + (scroll !== 0 ? '' : 'calendar__button_inactive');
  const weekRowCls =
    'calendar__row' + (scroll === 0 ? '' : ' calendar__row_scrolled');

  return (
    <div onWheel={onCalendarWheel} className="calendar datepicker__calendar">
      <div className="calendar__header">
        <h3 className="calendar__current">{calendarTitle}</h3>
        <div className="calendar__nav">
          <button onClick={setPrevMonth} className={prevBtnCls}>
            <LeftArrowIcon24 />
          </button>
          <button onClick={setTodayMonth} className={TODAYBtnCls}>
            <div className="calendar__circle"></div>
          </button>
          <button onClick={setNextMonth} className="calendar__button">
            <RightArrowIcon24 />
          </button>
        </div>
      </div>
      <div className={weekRowCls}>
        {detail && (
          <div className={'date-detail ' + (detail ? 'date-detail_open' : '')}>
            <span className="date-detail__date">{detailString}</span>
            <span className="date-detail__info">
              • {detail.taskCount} задачи к выполнению
            </span>
            <div
              className="date-detail__bar"
              style={{ width: `${detail.taskCount * 8}px` }}
            ></div>
          </div>
        )}
        {!detail &&
          DAY_NAMES.shortOrder.map((day, i) => (
            <div key={i} className="calendar__cell calendar__cell_week">
              {day}
            </div>
          ))}
      </div>
      <div className="calendar__months-wrapper">
        <div
          style={{ transform: `translateY(${scroll}px)` }}
          className="calendar__months"
        >
          {months.map((month, i) => (
            <div key={`month${i}`} className="calendar__month">
              {i !== 0 && (
                <div className="calendar__month-title">
                  {MONTH_NAMES.full[(TODAY.getMonth() + i) % 12]}
                </div>
              )}
              {month.map((week, j) => (
                <div key={`week${i}-${j}`} className="calendar__row">
                  {week.map((d) => {
                    let className = 'calendar__date';

                    if (!d.active) className += ' calendar__date_inactive';
                    if (d.date.getDay() === 0 || d.date.getDay() === 6) {
                      className += ' calendar__date_holiday';
                    }
                    if (+d.date === +TODAY) {
                      className += ' calendar__date_TODAY';
                    }
                    if (selectedDate && +d.date === +selectedDate) {
                      className += ' calendar__date_selected';
                    }

                    return (
                      <div
                        onMouseOver={() => {
                          d.active && setDetail({ date: d.date, taskCount: 1 });
                        }}
                        onMouseOut={() => {
                          d.active && setDetail(null);
                        }}
                        onClick={() => {
                          d.active && onSelect(d.date);
                        }}
                        key={`date${i}-${j}-${d.date.getDate()}`}
                        className="calendar__cell"
                      >
                        <div className={className}>{d.date.getDate()}</div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
