import React from 'react';

export type CalendarProps = {
  onChange: (date: Date) => void;
  value?: Date | null;
} & Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange'>;

export interface IMonthBorder {
  start: number;
  end: number;
}

export interface DateInfo {
  date: Date;
  active: boolean;
}

export interface IDetail {
  date: Date;
  taskCount: number;
}
