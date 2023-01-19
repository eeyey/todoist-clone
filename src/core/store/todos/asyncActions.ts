import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '../../api';
import { ITodo } from '../../types';

export const fetchTodos = createAsyncThunk(
  'todos/fetch',
  async (_, ThunkAPI) => {
    try {
      const { data: todos } = await api.get<ITodo[]>('');

      return todos;
    } catch (e) {
      return ThunkAPI.rejectWithValue((e as Error).message);
    }
  },
);

export const addTodo = createAsyncThunk('todos/add', async (_, ThunkAPI) => {
  try {
    const { data: todo } = await api.get<ITodo>('/todos/');

    return todo;
  } catch (e) {
    return ThunkAPI.rejectWithValue((e as Error).message);
  }
});
