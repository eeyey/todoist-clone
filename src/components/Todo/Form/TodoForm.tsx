import React from 'react';

import { Button } from '../../UI';
import { DateButton } from '../DateButton';

import { TitleInput } from './TitleInput';
import { ProjectPicker } from './ProjectPicker';
import { DescrTextArea } from './DescrTextArea';
import { PriorityPicker } from './PriorityPicker';

import { ITodo } from '../../../core/types';

import './TodoForm.css';
import { addTodo, updateTodo, useAppDispatch } from '../../../core/store';

interface TodoFormProps {
  type: 'add' | 'edit';
  onEnd: () => void;
  data?: ITodo;
}

export const TodoForm: React.FC<TodoFormProps> = (props) => {
  const { type, onEnd, data } = props;

  const dispatch = useAppDispatch();

  const [title, setTitle] = React.useState(data?.title ?? '');
  const [descr, setDescr] = React.useState(data?.descr ?? '');
  const [term, setTerm] = React.useState<number | null>(data?.term ?? null);
  const [priority, setPriority] = React.useState(data?.priority ?? 4);
  const [projectId, setProjectId] = React.useState(data?.projectId ?? 0);

  if (type === 'edit' && !data) throw Error('Cant get edit task ');

  const submit = () => {
    if (!title.trim().length) return;

    const todo = { title, descr, term, priority, projectId };

    if (type === 'add') {
      dispatch(addTodo(todo));
    } else {
      if (!data) return;
      dispatch(updateTodo({ id: data?.id, data: todo }));
    }

    setTitle('');
    setDescr('');
  };

  return (
    <div className="todo-add">
      <div className="todo-add__form">
        <TitleInput value={title} onChange={setTitle} />
        <DescrTextArea value={descr} onChange={setDescr} />
        <div className="todo-add__footer">
          <div className="todo-add__group">
            <DateButton
              onChange={(date) => {
                setTerm(date ? +date : null);
              }}
              date={term ? new Date(term) : null}
              isBig
            />

            <ProjectPicker
              value={projectId}
              onChange={(value) => {
                setProjectId(value);
              }}
            />
          </div>
          <div className="todo-add__menu">
            <PriorityPicker
              value={priority}
              onChange={(value, _) => {
                setPriority(value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="todo-add__buttons">
        <Button text="Отмена" type="secondary" onClick={onEnd} />
        <Button
          text={type === 'edit' ? 'Сохранить' : 'Добавить'}
          type={'success'}
          active={!!title.trim().length}
          onClick={submit}
        />
      </div>
    </div>
  );
};
