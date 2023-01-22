import React from 'react';

import { Link } from 'react-router-dom';

import { ProjectIcon } from '../../icons';

import { selectProjects, useAppSelector } from '../../../core/store';

import './ProjectLink.css';

interface ProjectLinkProps {
  projectId: number;
}

export const ProjectLink: React.FC<ProjectLinkProps> = (props) => {
  const { projectId } = props;

  const { projects } = useAppSelector(selectProjects);

  const project = projects.find((project) => project.id === projectId);

  if (!project) throw Error('Cant get project');

  return (
    <Link to={`/project/${projectId}`} className={'project-link'}>
      {project.title}
      <ProjectIcon projectId={project.id} color={project.color} />
    </Link>
  );
};
