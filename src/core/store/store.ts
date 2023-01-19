import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todos/slice';
import projectsReducer from './projects/slice';

export const rootReducer = combineReducers({
  todos: todosReducer,
  projects: projectsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
