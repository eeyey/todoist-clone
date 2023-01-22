import React from 'react';
import { InboxIcon16 } from './InboxIcon16';
import { ProjectIcon12 } from './ProjectIcon12';

interface ProjectIconProps {
  projectId: number;
  color: string;
}

export const ProjectIcon: React.FC<ProjectIconProps> = ({
  projectId,
  color,
}) => {
  return projectId === 0 ? <InboxIcon16 /> : <ProjectIcon12 color={color} />;
};
