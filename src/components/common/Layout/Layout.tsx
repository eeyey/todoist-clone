import React from 'react';

import { Outlet } from 'react-router-dom';

import classnames from 'classnames';

import { Header } from '../../Header';
import { Sidebar } from '../../Sidebar';

import './Layout.css';

export const Layout = () => {
  const [showSidebar, setShowSidebar] = React.useState(true);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar open={showSidebar} />
      <div className={classnames('content', { content_open: showSidebar })}>
        <Outlet />
      </div>
    </>
  );
};
