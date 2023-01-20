import React from 'react';

import { Outlet } from 'react-router-dom';
import { Header } from '../../Header';

import './Layout.css';

export const Layout = () => {
  const [showSidebar, setShowSidebar] = React.useState(true);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <div className="content">
        <Outlet />
      </div>
    </>
  );
};
