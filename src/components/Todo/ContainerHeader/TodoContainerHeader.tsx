import React from 'react';

import { getHeaderName } from './utils';

import { TODAY } from '../../../core/utils/date';

import './TodoContainerHeader.css';

interface TodoContainerHeaderProps {
  date: Date;
  sticky?: number;
}

export const TodoContainerHeader: React.FC<TodoContainerHeaderProps> = (
  props,
) => {
  const { date, sticky = 43 } = props;

  return (
    <div style={{ top: `${sticky}px` }} className="todo-container-header">
      <h4 className="todo-container-name">
        {+date < +TODAY ? 'Просрочено' : getHeaderName(date)}
      </h4>
    </div>
  );
};
