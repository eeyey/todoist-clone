import React from 'react';

import { AppRouter, PageLoader } from './components/common';
import {
  fetchProjects,
  fetchTodos,
  selectProjects,
  selectTodos,
  useAppDispatch,
  useAppSelector,
} from './core/store';

function App() {
  const dispatch = useAppDispatch();

  const { status: projectsStatus } = useAppSelector(selectProjects);
  const { status: todosStatus } = useAppSelector(selectTodos);

  const isLoading = todosStatus === 'loading' || projectsStatus === 'loading';

  React.useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchTodos());
  }, []);

  return <>{isLoading ? <PageLoader /> : <AppRouter />}</>;
}

export default App;
