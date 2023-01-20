import React from 'react';

import { CalendarIcon12, CalendarIcon16 } from '../../icons';

import { getTextAndStyle } from './utils';

import './DateButton.css';

interface DateButtonProps {
  date: Date | null;
  onChange: (date: Date | null) => void;
  isBig?: boolean;
}

export const DateButton: React.FC<DateButtonProps> = ({ date, isBig }) => {
  let [className, buttonText] = getTextAndStyle(date);

  if (isBig) className += ' date-button_big';

  return (
    <>
      <div onClick={() => {}} className={className}>
        {isBig ? <CalendarIcon16 /> : <CalendarIcon12 />} {buttonText}
      </div>
    </>
  );
};
