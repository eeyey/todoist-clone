import React from 'react';
import { Navigate } from 'react-router-dom';

import { Layout } from './components/common';
import { NotFoundPage, ProjectPage, TodayPage, UpcomingPage } from './pages';

export interface IRoute {
  path: string;
  element: JSX.Element;
  sub_routes?: IRoute[];
}

export const routes: IRoute[] = [
  {
    path: '/',
    element: <Layout />,
    sub_routes: [
      { path: '', element: <Navigate to="project/0" /> },
      { path: 'project/:id', element: <ProjectPage /> },
      { path: 'today/', element: <TodayPage /> },
      { path: 'upcoming/', element: <UpcomingPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];
