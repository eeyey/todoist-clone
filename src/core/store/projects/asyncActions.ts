import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '../../api';
import { IProject } from '../../types';

export const fetchProjects = createAsyncThunk(
  'projects/fetch',
  async (_, ThunkAPI) => {
    try {
      const { data } = await api.get<IProject[]>('/projects/');

      return data;
    } catch (e) {
      return ThunkAPI.rejectWithValue((e as Error).message);
    }
  },
);

export const addProject = createAsyncThunk(
  'projects/add',
  async (data: Exclude<Partial<IProject>, 'id'>, ThunkAPI) => {
    try {
      const { data: project } = await api.post<IProject>('/projects/', data);

      return project;
    } catch (e) {
      return ThunkAPI.rejectWithValue((e as Error).message);
    }
  },
);
