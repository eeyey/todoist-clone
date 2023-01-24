import React from 'react';

import { CheckboxIcon24 } from '../../icons';
import { ActionsMenu } from '../ActionsMenu';
import { DateButton } from '../DateButton';
import { ProjectLink } from '../ProjectLink';

import { updateTodo, useAppDispatch } from '../../../core/store';

import { ITodo } from '../../../core/types';

import './Todo.css';

export interface TodoProps {
  data: ITodo;
  onEdit: () => void;
  showDate?: boolean;
  showProject?: boolean;
}

export const Todo: React.FC<TodoProps> = (props) => {
  const { data, onEdit, showDate, showProject } = props;

  const dispatch = useAppDispatch();

  const dateChangeHadler = (date: Date | null) =>
    dispatch(
      updateTodo({
        id: data.id,
        data: { term: date ? +date : null },
      }),
    );

  return (
    <div className="todo">
      <div className={`checkbox checkbox_priority${data.priority}`}>
        <div className="checkbox__icon">
          <CheckboxIcon24 />
        </div>
      </div>
      <div className="todo__content">
        <div className="todo__title">{data.title} </div>
        <div className="todo__descr">{data.descr}</div>
        <div className="todo__footer">
          {showDate && data.term ? (
            <DateButton
              onChange={dateChangeHadler}
              date={data.term ? new Date(data.term) : null}
            />
          ) : (
            <div></div>
          )}
          {showProject && <ProjectLink projectId={data.projectId} />}
        </div>
      </div>
      <ActionsMenu onEdit={onEdit} todo={data} />
    </div>
  );
};
