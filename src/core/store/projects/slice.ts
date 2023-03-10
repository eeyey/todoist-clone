import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { addProject, fetchProjects } from './asyncActions';
import { IProject } from '../../types';
import { api } from '../../api';

interface ProjectsState {
  projects: IProject[];
  status: 'success' | 'error' | 'loading';
}

const initialState: ProjectsState = {
  projects: [],
  status: 'loading',
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    updateProject: (
      state,
      action: PayloadAction<{
        id: number;
        data: Omit<Partial<IProject>, 'id'>;
      }>,
    ) => {
      const { id, data } = action.payload;

      const project = state.projects.find((project) => project.id === id);

      if (project) {
        Object.assign(project, data);

        api.put(`/projects/${project.id}`, project);
      }
    },
    removeProject: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;

      const index = state.projects.findIndex((project) => project.id === id);

      if (index >= 0) {
        const project = state.projects.splice(index, 1)[0];

        api.delete(`/projects/${project.id}`);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      })
      .addCase(fetchProjects.pending, (state, action) => {
        state.projects = [];
        state.status = 'loading';
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
        state.status = 'success';
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'error';
      });
  },
});

export const { removeProject, updateProject } = projectsSlice.actions;

export default projectsSlice.reducer;
