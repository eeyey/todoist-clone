import { RootState } from '../store';

export function selectTodos(state: RootState) {
  return state.todos;
}
