import React from 'react';

import classNames from 'classnames';

import { LeftArrowIcon24, RightArrowIcon24 } from '../../icons';

import { nextDay, prevDay, TODAY } from '../../../core/utils/date';
import { scrollToElement } from '../../../core/utils/DOM';

interface DateLineButtonsProps {
  date: Date;
  setDate: (date: Date) => void;
}

const CONTAINER_SELECTOR = '.todo-container';
const HEADER_SELECTOR = '.upcoming-header';

export const DateLineButtons: React.FC<DateLineButtonsProps> = (props) => {
  const { date, setDate } = props;

  const changeDate = (date: Date) => {
    const header = document.querySelector(HEADER_SELECTOR);

    if (!header) return;

    const { bottom: padding } = header.getBoundingClientRect();

    const selector = `${CONTAINER_SELECTOR}[data-timestamp='${+date}']`;
    scrollToElement(selector, padding);

    setDate(date);
  };

  return (
    <React.Fragment>
      <button
        onClick={changeDate.bind(this, prevDay(date))}
        className={classNames('upcoming-button upcoming-button_left', {
          'upcoming-button_inactive': +date <= +TODAY,
        })}
      >
        <LeftArrowIcon24 />
      </button>
      <button
        onClick={changeDate.bind(this, nextDay(date))}
        className="upcoming-button upcoming-button_right"
      >
        <RightArrowIcon24 />
      </button>
      <button
        onClick={changeDate.bind(this, TODAY)}
        className="upcoming-button upcoming-button__today"
      >
        Сегодня
      </button>
    </React.Fragment>
  );
};
