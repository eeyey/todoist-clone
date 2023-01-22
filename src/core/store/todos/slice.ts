import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { addTodo, fetchTodos } from './asyncActions';
import { ITodo } from '../../types';
import { api } from '../../api';

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
        data: Omit<Partial<ITodo>, 'id'>;
      }>,
    ) => {
      const { id, data } = action.payload;

      const todo = state.todos.find((project) => project.id === id);

      if (todo) {
        Object.assign(todo, data);

        api.put(`/todos/${todo.id}/`, todo); // need catch error?
      }
    },
    removeTodo: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;

      const index = state.todos.findIndex((todo) => todo.id === id);

      if (index >= 0) {
        const todo = state.todos.splice(index, 1)[0];

        api.delete(`/todos/${todo.id}/`); // neeed catch error?
      }
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
