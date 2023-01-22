import React from 'react';

import { DatePicker } from '../../common';
import * as Icons from '../../icons';

import {
  HOLIDAYS,
  NEXT_WEEK,
  TODAY,
  TOMMOROW,
} from '../../../core/utils/date/constats';

import { ITodo } from '../../../core/types';

const priorities = [1, 2, 3, 4];

interface FastMenuProps {
  updateTodo: (newData: Omit<Partial<ITodo>, 'id'>) => void;
}

export const FastMenu: React.FC<FastMenuProps> = ({ updateTodo }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);

  const fastButtons = [
    {
      onClick: () => {
        updateTodo({ term: +TODAY });
      },
      icon: <Icons.TodayIcon28 />,
    },
    {
      onClick: () => {
        updateTodo({ term: +TOMMOROW });
      },
      icon: <Icons.TommorowIcon28 />,
    },
    {
      onClick: () => {
        updateTodo({ term: +HOLIDAYS });
      },
      icon: <Icons.HolidaysIcon28 />,
    },
    {
      onClick: () => {
        updateTodo({ term: +NEXT_WEEK });
      },
      icon: <Icons.NextWeekIcon28 />,
    },
    {
      onClick: () => {
        updateTodo({ term: null });
      },
      icon: <Icons.NonTermIcon28 />,
    },
    {
      onClick: (e: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(e.currentTarget);
      },
      icon: <Icons.EmptyDotsIcon28 />,
    },
  ];

  return (
    <div className="todo-menu__fast">
      <p className="todo-menu__group-title">Срок выполнения</p>
      <div className="todo-menu__fast-buttons">
        {fastButtons.map(({ icon, onClick }, i) => (
          <div key={i} className="todo-menu__fast-button" onClick={onClick}>
            {icon}
          </div>
        ))}
      </div>

      <p className="todo-menu__group-title">Приоритет</p>
      <div className="todo-menu__fast-buttons">
        {priorities.map((priority) => (
          <div
            key={priority}
            className="todo-menu__fast-button"
            onClick={() => {
              updateTodo({ priority });
            }}
          >
            <Icons.PriorityIcon24 priority={priority} />
          </div>
        ))}
      </div>
      <DatePicker
        onClose={setAnchorEl.bind(this, null)}
        onChange={(date) => {
          updateTodo({ term: date ? +date : null });
        }}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
      />
    </div>
  );
};
