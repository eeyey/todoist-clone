import React from 'react';

import classnames from 'classnames';

import { CalendarIcon12, CalendarIcon16 } from '../../icons';
import { DatePicker } from '../../common';

import { getTextAndStyle } from './utils';

import './DateButton.css';

interface DateButtonProps {
  date: Date | null;
  onChange: (date: Date | null) => void;
  isBig?: boolean;
}

export const DateButton: React.FC<DateButtonProps> = (props) => {
  const { date, onChange, isBig } = props;

  const [className, buttonText] = getTextAndStyle(date);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const bthHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const onClose = setAnchorEl.bind(this, null);

  return (
    <>
      <button
        onClick={bthHandler}
        className={classnames(className, { 'date-button_big': isBig })}
      >
        {isBig ? <CalendarIcon16 /> : <CalendarIcon12 />} {buttonText}
      </button>
      <DatePicker
        open={Boolean(anchorEl)}
        {...{ anchorEl, onChange, onClose }}
      />
    </>
  );
};
