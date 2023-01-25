import React from 'react';

import { CalendarPlaceholder } from './Placeholder';
import { CalendarHeader } from './Header';
import { CalendarMonth } from './Month';

import { TODAY } from '../../../../core/utils/date/';
import { getMonthCount, getMonthsFrom } from './utils';

import { MONTH_HEADER_HEIGHT, ROW_HEIGHT } from './config';

import { CalendarProps, DateInfo, IDetail, IMonthBorder } from './types';

import './calendar.css';

export const Calendar: React.FC<CalendarProps> = (props) => {
  const { onChange, value, ...divProps } = props;

  const [scroll, setScroll] = React.useState<number>(0);
  const [detail, setDetail] = React.useState<IDetail | null>(null);

  const [monthOffset, setMonthOffset] = React.useState<number>(0);
  const [monthBorders, setMonthBorders] = React.useState<IMonthBorder[]>([]); // start and end of the month block
  const [months, setMonths] = React.useState<DateInfo[][][]>([]);

  const calendarRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const validValue = value && +value > +TODAY;

    const count = validValue ? getMonthCount(TODAY, value) : 5;
    const months = getMonthsFrom(TODAY, count);
    const borders: IMonthBorder[] = [];

    for (let i = 0; i < months.length; i++) {
      const start = borders.at(-1)?.end ?? 0;

      borders.push({
        start,
        end: start + months[i].length * ROW_HEIGHT + MONTH_HEADER_HEIGHT,
      });

      if (validValue && count === i) {
        setScroll(-start);
      }
    }

    setMonthBorders(borders);
    setMonths(months);
  }, []);

  React.useEffect(() => {
    for (let i = 0; i < monthBorders.length; i++) {
      if (monthBorders[i].start <= -scroll && -scroll <= monthBorders[i].end) {
        setMonthOffset(i);
        if (i === monthBorders.length - 1) {
          const year = TODAY.getFullYear();
          const month = TODAY.getMonth() + months.length;
          const newMonths = getMonthsFrom(new Date(year, month, 1), 5);

          const newBorders: IMonthBorder[] = [...monthBorders];
          for (let i = 0; i < newMonths.length; i++) {
            const start = newBorders.at(-1)?.end ?? 0;

            newBorders.push({
              start,
              end:
                start + newMonths[i].length * ROW_HEIGHT + MONTH_HEADER_HEIGHT,
            });
          }

          setMonthBorders(newBorders);
          setMonths([...months, ...newMonths]);
        }
      }
    }
  }, [scroll]);

  React.useEffect(() => {
    if (!calendarRef.current) return;

    const onWheel = (e: WheelEvent) => {
      setScroll(e.deltaY > 0 ? scroll - 100 : Math.min(0, scroll + 100));
      e.preventDefault();
    };

    calendarRef.current.addEventListener('wheel', onWheel, { passive: false });

    return () => calendarRef.current?.removeEventListener('wheel', onWheel);
  }, [scroll]);

  return (
    <div ref={calendarRef} className="calendar" {...divProps}>
      <CalendarHeader
        {...{ scroll, setScroll, monthBorders, monthOffset, setMonthOffset }}
      />
      <CalendarPlaceholder {...{ detail, scroll }} />
      <div className="calendar__months-wrapper">
        <div
          style={{ transform: `translateY(${scroll}px)` }}
          className="calendar__months"
        >
          {months.map((weeks, i) => (
            <CalendarMonth
              key={i}
              month={(TODAY.getMonth() + i) % 12}
              showTitle={i !== 0}
              selected={value}
              {...{ weeks, onChange, setDetail }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
