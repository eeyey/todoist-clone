import React from 'react';

import { List } from '../../List';

import {
  HolidaysIcon24,
  NextWeekIcon24,
  NonTermIcon24,
  TodayIcon24,
  TommorowIcon24,
} from '../../../icons';

import {
  HOLIDAYS,
  NEXT_WEEK,
  TODAY,
  TOMMOROW,
} from '../../../../core/utils/date/constats';
import {
  DAY_NAMES,
  MONTH_NAMES,
} from '../../../../core/utils/date/short-names';
import { MenuItem } from '../../MenuItem';

interface FastMenuProps {
  selectDate: (date: Date | null) => void;
}

export const FastMenu: React.FC<FastMenuProps> = ({ selectDate }) => {
  const fastDates = [
    {
      icon: <TodayIcon24 />,
      text: 'Сегодня',
      additionalText: DAY_NAMES.short[TODAY.getDay()],
      onClick: selectDate.bind(this, TODAY),
    },
    {
      icon: <TommorowIcon24 />,
      text: 'Завтра',
      additionalText: DAY_NAMES.short[(TODAY.getDay() + 1) % 7],
      onClick: selectDate.bind(this, TOMMOROW),
    },
    {
      icon: <HolidaysIcon24 />,
      text: 'На выходных',
      additionalText: DAY_NAMES.short[5],
      onClick: selectDate.bind(this, HOLIDAYS),
    },
    {
      icon: <NextWeekIcon24 />,
      text: 'След. неделя',
      additionalText: `${DAY_NAMES.short[1]} ${NEXT_WEEK.getDate()} ${
        MONTH_NAMES.short[NEXT_WEEK.getMonth()]
      }`,
      onClick: selectDate.bind(this, NEXT_WEEK),
    },
    {
      icon: <NonTermIcon24 />,
      text: 'Без срока',
      onClick: selectDate.bind(this, null),
    },
  ];

  return (
    <List
      items={fastDates}
      renderItem={(item, i) => <MenuItem key={i} {...item} />}
    />
  );
};
