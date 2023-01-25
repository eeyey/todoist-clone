import React from 'react';

import { IconButton } from '../../UI';
import { CalendarIcon24, DotsIcon, EditIcon24 } from '../../icons';

import { ITodo } from '../../../core/types';

import './ActionsMenu.css';
import { TaskMenu } from '../Menu';
import { DatePicker } from '../../common';
import { updateTodo, useAppDispatch } from '../../../core/store';

interface ActionsMenuProps {
  onEdit: () => void;
  todo: ITodo;
}

type AnchorType = HTMLButtonElement | null;

export const ActionsMenu: React.FC<ActionsMenuProps> = (props) => {
  const { onEdit, todo } = props;

  const dispatch = useAppDispatch();

  const [dateAnchor, setDateAnchor] = React.useState<AnchorType>(null);
  const [menuAnchor, setMenuAnchor] = React.useState<AnchorType>(null);

  const calendarHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setDateAnchor(e.currentTarget);
  };

  const dotsHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(e.currentTarget);
  };

  return (
    <div className="actions-menu">
      <IconButton icon={<EditIcon24 />} onClick={onEdit} />
      <IconButton icon={<CalendarIcon24 />} onClick={calendarHandler} />
      <IconButton icon={<DotsIcon />} onClick={dotsHandler} />
      <TaskMenu
        open={Boolean(menuAnchor)}
        anchorEl={menuAnchor}
        onClose={setMenuAnchor.bind(this, null)}
        {...{ onEdit, todo }}
      />
      <DatePicker
        open={Boolean(dateAnchor)}
        anchorEl={dateAnchor}
        onClose={setDateAnchor.bind(this, null)}
        value={todo.term ? new Date(todo.term) : null}
        onChange={(date) => {
          dispatch(
            updateTodo({ id: todo.id, data: { term: date ? +date : null } }),
          );
        }}
      />
    </div>
  );
};
