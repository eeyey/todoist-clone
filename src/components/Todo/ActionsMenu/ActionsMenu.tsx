import React from 'react';

import { IconButton } from '../../UI';
import { CalendarIcon24, DotsIcon, EditIcon24 } from '../../icons';

import { ITodo } from '../../../core/types';

import './ActionsMenu.css';

interface ActionsMenuProps {
  onEdit: () => void;
  todo: ITodo;
}

export const ActionsMenu: React.FC<ActionsMenuProps> = (props) => {
  const { onEdit, todo } = props;

  return (
    <div className="actions-menu">
      <IconButton icon={<EditIcon24 />} onClick={onEdit} />
      <IconButton icon={<CalendarIcon24 />} />
      <IconButton icon={<DotsIcon />} />
    </div>
  );
};
