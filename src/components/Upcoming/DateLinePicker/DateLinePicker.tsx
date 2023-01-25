import React from 'react';

import { ArrowIcon24 } from '../../icons';
import { Calendar, Popover } from '../../common';

import { MONTH_NAMES } from '../../../core/utils/date';
import { scrollToElement } from '../../../core/utils/DOM';

import './DateLinePicker.css';

interface DateLinePickerProps {
  date: Date;
  setDate: (date: Date) => void;
}

const CONTAINER_SELECTOR = '.todo-container';
const HEADER_SELECTOR = '.upcoming-header';

export const DateLinePicker: React.FC<DateLinePickerProps> = (props) => {
  const { date, setDate } = props;

  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);

  const pickerHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const changeDate = (date: Date) => {
    const header = document.querySelector(HEADER_SELECTOR);

    if (!header) return;

    const { bottom: padding } = header.getBoundingClientRect();

    setAnchorEl(null); // We need close popover before scroll, because popover blocked scroll

    const selector = `${CONTAINER_SELECTOR}[data-timestamp='${+date}']`;
    scrollToElement(selector, padding);

    setDate(date);
  };

  return (
    <React.Fragment>
      <div className="dateline-picker" onClick={pickerHandler}>
        {MONTH_NAMES.full[date.getMonth()]} {date.getFullYear()}
        <ArrowIcon24 />
      </div>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={setAnchorEl.bind(this, null)}
        position={{
          anchorOrigin: ['center', 'bottom'],
          transformOrigin: ['center', 'top'],
        }}
      >
        <Calendar
          className="calendar upcoming-calendar"
          onChange={changeDate}
          value={date}
        />
      </Popover>
    </React.Fragment>
  );
};
