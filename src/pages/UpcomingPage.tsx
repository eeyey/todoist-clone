import React from 'react';

import { TodosContainer } from '../components/Todo';

import { selectTodos, useAppSelector } from '../core/store';

import {
  DMY,
  getDateFromDMY,
  getDMY,
  getDMYArray,
  TODAY,
  YESTERDAY,
} from '../core/utils/date';
import { ITodo } from '../core/types';

export const UpcomingPage = () => {
  const { todos } = useAppSelector(selectTodos);

  const groupsLimit = 365;

  const overdueTodos = React.useMemo(() => {
    return todos.filter(({ term }) => term && term < +TODAY);
  }, [todos]);

  const todosGroups = React.useMemo(() => {
    const sortedTodos: Record<DMY, ITodo[]> = {};
    const DMYs = getDMYArray(TODAY, groupsLimit); // DMY[];

    DMYs.forEach((dmy) => (sortedTodos[dmy] = []));

    todos.forEach((todo) => {
      if (!todo.term) return;

      const dmy = getDMY(todo.term);
      if (dmy in sortedTodos) {
        sortedTodos[dmy].push(todo);
      }
    });

    return Object.entries(sortedTodos);
  }, [todos]);

  return (
    <React.Fragment>
      {!!overdueTodos.length && (
        <TodosContainer
          todos={overdueTodos}
          date={YESTERDAY}
          showDate
          showProject
        />
      )}
      {todosGroups.map(([dmy, todos]) => (
        <TodosContainer
          key={dmy}
          todos={todos}
          date={getDateFromDMY(dmy as DMY)}
          showDate
          showProject
        />
      ))}
    </React.Fragment>
  );
};
