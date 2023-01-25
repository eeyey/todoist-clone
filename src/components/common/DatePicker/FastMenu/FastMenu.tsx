import React from 'react';

import { List } from '../../List';
import * as Icons from '../../../icons';
import { MenuItem } from '../../MenuItem';

import {
  HOLIDAYS,
  NEXT_WEEK,
  TODAY,
  TOMMOROW,
  DAY_NAMES,
  MONTH_NAMES,
} from '../../../../core/utils/date/';

interface FastMenuProps {
  onChange: (date: Date | null) => void;
}

export const FastMenu: React.FC<FastMenuProps> = ({ onChange }) => {
  const fastDates = [
    {
      icon: <Icons.TodayIcon24 />,
      text: 'Сегодня',
      additionalText: DAY_NAMES.short[TODAY.getDay()],
      onClick: onChange.bind(this, TODAY),
    },
    {
      icon: <Icons.TommorowIcon24 />,
      text: 'Завтра',
      additionalText: DAY_NAMES.short[(TODAY.getDay() + 1) % 7],
      onClick: onChange.bind(this, TOMMOROW),
    },
    {
      icon: <Icons.HolidaysIcon24 />,
      text: 'На выходных',
      additionalText: DAY_NAMES.short[5],
      onClick: onChange.bind(this, HOLIDAYS),
    },
    {
      icon: <Icons.NextWeekIcon24 />,
      text: 'След. неделя',
      additionalText:
        `${DAY_NAMES.short[1]} ${NEXT_WEEK.getDate()} ` +
        `${MONTH_NAMES.short[NEXT_WEEK.getMonth()]}`,
      onClick: onChange.bind(this, NEXT_WEEK),
    },
    {
      icon: <Icons.NonTermIcon24 />,
      text: 'Без срока',
      onClick: onChange.bind(this, null),
    },
  ];

  return (
    <List
      items={fastDates}
      renderItem={(item, i) => <MenuItem key={i} {...item} />}
    />
  );
};
