import React from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import { ProjectHeader } from '../components/Project';
import { TodosContainer } from '../components/Todo';
import { selectTodos, useAppSelector } from '../core/store';

export const ProjectPage = () => {
  const { id } = useParams();

  const { todos } = useAppSelector(selectTodos);

  const projectTodos = React.useMemo(
    () => todos.filter((task) => id && task.projectId === +id),
    [id, todos],
  );

  if (!id) return <Navigate to="project/0" />;

  return (
    <>
      <ProjectHeader projectId={+id} />
      <TodosContainer todos={projectTodos} projectId={+id} showDate />
      <Outlet />
    </>
  );
};
