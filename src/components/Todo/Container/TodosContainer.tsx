import React, { useState } from 'react';

import { TodoContainerHeader } from '../ContainerHeader';
import { TodoAddButton } from '../AddButton';
import { TodoForm } from '../Form';
import { Todo } from '../Todo';

import { TODAY } from '../../../core/utils/date';
import { ITodo } from '../../../core/types';

import './TodoContainer.css';

interface TodosContainerProps {
  todos: ITodo[];
  projectId?: number;
  date?: Date;
  showDate?: boolean;
  showProject?: boolean;
}

interface AddType {
  type: 'add';
}
interface EditType {
  type: 'edit';
  todo: ITodo;
}
type FormAction = AddType | EditType | null;

export const TodosContainer: React.FC<TodosContainerProps> = (props) => {
  const { todos, date, projectId = 0, showDate, showProject } = props;

  const [formAction, setFormAction] = useState<FormAction>();

  React.useEffect(() => {
    setFormAction(null);
  }, [projectId]);

  const btnHandler = setFormAction.bind(this, { type: 'add' });

  const onEnd = setFormAction.bind(this, null);

  const onEdit = (todo: ITodo) => {
    setFormAction({ type: 'edit', todo });
  };

  const todoRender = (todo: ITodo) => {
    return formAction?.type === 'edit' && formAction.todo.id === todo.id ? (
      <TodoForm key="form" type="edit" onEnd={onEnd} data={todo} />
    ) : (
      <Todo
        key={todo.id}
        data={todo}
        onEdit={onEdit.bind(this, todo)}
        {...{ showDate, showProject }}
      />
    );
  };

  const canAdd = date === undefined || (date && +date >= +TODAY);

  return (
    <section className="todo-container">
      {date && <TodoContainerHeader date={date} />}
      {todos.map(todoRender)}
      {formAction?.type === 'add' && (
        <TodoForm
          type="add"
          onEnd={onEnd}
          data={{ projectId, term: date ? +date : null }}
        />
      )}
      {canAdd && !formAction && <TodoAddButton onClick={btnHandler} />}
    </section>
  );
};
