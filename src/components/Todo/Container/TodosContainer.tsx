import React, { useState } from 'react';

import { TodoAddButton } from '../AddButton';
import { Todo } from '../Todo';

import { ITodo } from '../../../core/types';
import { TodoForm } from '../Form';

interface TodosContainerProps {
  todos: ITodo[];
  canAdd?: boolean;
  showDate?: boolean;
  projectId?: number;
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
  const { todos, projectId = 0, canAdd = true, showDate = true } = props;

  const [formAction, setFormAction] = useState<FormAction>();

  React.useEffect(() => {
    setFormAction(null);
  }, [projectId]);

  const btnHandler = () => {
    setFormAction({ type: 'add' });
  };

  const onEnd = () => {
    setFormAction(null);
  };

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
        showDate={showDate}
      />
    );
  };

  return (
    <>
      {todos.map(todoRender)}
      {formAction?.type === 'add' && (
        <TodoForm type="add" onEnd={onEnd} data={{ projectId }} />
      )}
      {canAdd && !formAction && <TodoAddButton onClick={btnHandler} />}
    </>
  );
};
