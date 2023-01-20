import React from 'react';

import classNames from 'classnames';

import { SidebarMenu } from '../Menu';

import './sidebar.css';
import { ProjectsPanel } from '../ProjectsPanel';

interface SidebarProps {
  open: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ open }) => {
  return (
    <div className={classNames('sidebar', { sidebar_close: !open })}>
      <SidebarMenu />
      <ProjectsPanel />
    </div>
  );
};
