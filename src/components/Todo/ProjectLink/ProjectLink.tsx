import React from 'react';

import { Link } from 'react-router-dom';

import { InboxIcon16, ProjectIcon12 } from '../../icons';

import { selectProjects, useAppSelector } from '../../../core/store';

import './ProjectLink.css';

interface ProjectLinkProps {
  projectId: number;
}

export const ProjectLink: React.FC<ProjectLinkProps> = (props) => {
  const { projectId } = props;

  const { projects } = useAppSelector(selectProjects);

  const project = React.useMemo(() => {
    const project = projects.find((project) => project.id === projectId);

    if (projectId === 0 || !project) {
      return {
        title: 'Входящие',
        icon: <InboxIcon16 />,
      };
    }

    return {
      title: project.title,
      icon: <ProjectIcon12 color={project.color} />,
    };
  }, [projects, projectId]);

  return (
    <Link to={`/project/${projectId}`} className={'project-link'}>
      {project.title}
      {project.icon}
    </Link>
  );

  // return isLink ? (

  // ) : (
  //
  // );
};
