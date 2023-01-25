import React from 'react';

import classnames from 'classnames';

import { getDetailString } from './utils';
import { DAY_NAMES } from '../../../../core/utils/date';

import { IDetail } from './types';

interface CalendarPlaceholderProps {
  scroll: number;
  detail: IDetail | null;
}

export const CalendarPlaceholder: React.FC<CalendarPlaceholderProps> = (
  props,
) => {
  const { scroll, detail } = props;

  const detailString = detail ? getDetailString(detail.date) : '';

  const weekRowCls = classnames('calendar__row', {
    calendar__row_scrolled: scroll !== 0,
  });

  return (
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
  );
};
