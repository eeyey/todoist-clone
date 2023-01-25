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

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const bthHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const onClose = setAnchorEl.bind(this, null);

  const [styleName, buttonText] = getTextAndStyle(date);

  return (
    <>
      <button
        onClick={bthHandler}
        className={classnames('date-button', styleName, {
          'date-button_big': isBig,
        })}
      >
        {isBig ? <CalendarIcon16 /> : <CalendarIcon12 />} {buttonText}
      </button>
      <DatePicker
        open={Boolean(anchorEl)}
        value={date}
        {...{ anchorEl, onChange, onClose }}
      />
    </>
  );
};
