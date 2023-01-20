import React from 'react';

import { Routes, Route } from 'react-router-dom';

import { IRoute, routes } from '../../../routes';

export const AppRouter = () => {
  const renderRoute = (route: IRoute) => {
    if (!route.sub_routes) {
      return (
        <Route key={route.path} path={route.path} element={route.element} />
      );
    } else {
      return (
        <Route key={route.path} path={route.path} element={route.element}>
          {route.sub_routes.map(renderRoute)}
        </Route>
      );
    }
  };

  return <Routes>{routes.map(renderRoute)}</Routes>;
};
