import React from 'react';

import { getTodayLine } from './utills';

import './TodayHeader.css';

export const TodayHeader = () => {
  return (
    <div className="today-header">
      <h1 className="today-header__title">
        Сегодня <span className="today-header__date">{getTodayLine()}</span>
      </h1>
    </div>
  );
};
