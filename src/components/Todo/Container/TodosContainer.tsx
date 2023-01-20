import React from 'react';

import { ITodo } from '../../../core/types';

import { Todo } from '../Todo';

interface TodosContainerProps {
  todos: ITodo[];
  canAdd?: boolean;
  projectId?: number;
}

export const TodosContainer: React.FC<TodosContainerProps> = (props) => {
  const { todos, projectId, canAdd = true } = props;

  return (
    <>
      {todos.map((todo) => (
        <Todo key={todo.id} data={todo} />
      ))}
    </>
  );
};
