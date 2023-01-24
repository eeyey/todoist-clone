import React from 'react';

import { TodayHeader } from '../components/Today';

import { TodosContainer } from '../components/Todo';

import { selectTodos, useAppSelector } from '../core/store';

import { TODAY, TOMMOROW, YESTERDAY } from '../core/utils/date';

export const TodayPage = () => {
  const { todos } = useAppSelector(selectTodos);

  const overdueTodos = React.useMemo(() => {
    return todos.filter(({ term }) => term && term < +TODAY);
  }, [todos]);

  const todayTodos = React.useMemo(() => {
    return todos.filter(
      ({ term }) => term && term >= +TODAY && term <= +TOMMOROW,
    );
  }, [todos]);

  return (
    <React.Fragment>
      <TodayHeader />
      {!!overdueTodos.length && (
        <TodosContainer
          todos={overdueTodos}
          date={YESTERDAY}
          showDate
          showProject
        />
      )}
      <TodosContainer todos={todayTodos} date={TODAY} showProject />
    </React.Fragment>
  );
};
