import { RootState } from '../store';

export function selectProjects(state: RootState) {
  return state.projects;
}
