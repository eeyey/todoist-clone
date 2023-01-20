import React from 'react';

import { selectProjects, useAppSelector } from '../../../core/store';

import './ProjectHeader.css';

interface ProjectHeaderProps {
  projectId: number;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({ projectId }) => {
  const { projects } = useAppSelector(selectProjects);

  const project = React.useMemo(() => {
    const filtered = projects.filter((project) => project.id === projectId);
    if (!filtered.length) return null;
    else return filtered[0];
  }, [projectId, projects]);

  if (!project) return <h1>Error</h1>;

  return (
    <header className="project-header">
      <h1 className="project-header__title">{project.title}</h1>
    </header>
  );
};
