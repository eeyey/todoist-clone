import React from 'react';

import { List, MenuItem, Popover } from '../../common';
import * as Icons from '../../icons';

import { ITodo } from '../../../core/types';

import {
  addTodo,
  removeTodo,
  updateTodo,
  useAppDispatch,
} from '../../../core/store';

import './TaskMenu.css';
import { FastMenu } from './FastMenu';

type GetProps<T> = T extends React.FC<infer Props> ? Props : T;
type PopoverProps = GetProps<typeof Popover>;
type MenuPopoverProps = Pick<PopoverProps, 'anchorEl' | 'onClose' | 'open'> &
  Partial<PopoverProps>;

interface TaskMenuProps extends MenuPopoverProps {
  todo: ITodo;
  onEdit: () => void;
}

export const TaskMenu: React.FC<TaskMenuProps> = (props) => {
  const { todo, onClose, onEdit, anchorEl, open, position } = props;

  const dispatch = useAppDispatch();

  const closeDecorator = <T extends (...args: any) => any>(func: T) => {
    return (...args: Parameters<T>) => {
      func(...args);

      onClose();
    };
  };

  const showForm = closeDecorator(() => {
    onEdit();
  });

  const updateAction = closeDecorator((data: Omit<Partial<ITodo>, 'id'>) =>
    dispatch(updateTodo({ id: todo.id, data })),
  );

  const group1 = [
    {
      icon: <Icons.EditIcon24 />,
      text: 'Изменить задачу',
      onClick: showForm.bind(this, null),
    },
  ];

  const group2 = [
    {
      icon: <Icons.RelocateIcon24 />,
      text: 'Перенести в проект',
      onClick: () => {},
    },
    {
      icon: <Icons.DuplicateIcon24 />,
      text: 'Дублировать',
      onClick: closeDecorator(() => {
        const newTodo: Partial<ITodo> = {};

        Object.assign(newTodo, todo);

        delete newTodo.id;

        dispatch(addTodo(newTodo));
      }),
    },
    {
      icon: <Icons.DeleteIcon24 />,
      text: 'Удалить',
      onClick: closeDecorator(() => dispatch(removeTodo({ id: todo.id }))),
    },
  ];

  const popoverPosition = position ?? [
    {
      anchorOrigin: ['center', 'bottom'],
      transformOrigin: ['center', 'top'],
    },
    {
      anchorOrigin: ['center', 'top'],
      transformOrigin: ['center', 'bottom'],
    },
    {
      anchorOrigin: ['left', 'center'],
      transformOrigin: ['right', 'center'],
    },
  ];

  return (
    <Popover position={popoverPosition} {...{ onClose, open, anchorEl }}>
      <div className="menu todo-menu">
        <List
          items={group1}
          renderItem={(item, i) => <MenuItem key={i} {...item} />}
        />
        <div className="menu__separator"></div>
        <FastMenu updateTodo={updateAction} />
        <div className="menu__separator"></div>
        <List
          items={group2}
          renderItem={(item, i) => <MenuItem key={i} {...item} />}
        />
      </div>
    </Popover>
  );
};
