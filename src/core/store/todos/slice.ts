import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { addTodo, fetchTodos } from './asyncActions';
import { ITodo } from '../../types';

interface TodosState {
  todos: ITodo[];
  status: 'success' | 'error' | 'loading';
}

const initialState: TodosState = {
  todos: [],
  status: 'loading',
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    updateTodo: (
      state,
      action: PayloadAction<{
        id: number;
        data: Exclude<Partial<ITodo>, 'id'>;
      }>,
    ) => {
      const { id, data } = action.payload;

      const project = state.todos.find((project) => project.id === id);

      if (project) Object.assign(project, data);
    },
    removeTodo: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;

      const index = state.todos.findIndex((project) => project.id === id);

      if (index >= 0) state.todos.splice(index, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(fetchTodos.pending, (state) => {
        state.todos = [];
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.status = 'success';
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { removeTodo, updateTodo } = todosSlice.actions;

export default todosSlice.reducer;
