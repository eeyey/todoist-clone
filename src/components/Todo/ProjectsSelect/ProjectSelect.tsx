import React from 'react';
import { selectProjects, useAppSelector } from '../../../core/store';
import { Select, SelectProps } from '../../common';
import { ProjectIcon } from '../../icons';

import './ProjectSelect.css';

type ProjectSelectProps = Omit<SelectProps<number>, 'items'>;

export const ProjectSelect: React.FC<ProjectSelectProps> = (props) => {
  const { projects } = useAppSelector(selectProjects);

  const selectItems = React.useMemo(() => {
    return projects
      .filter((project) => !project.archive)
      .map((project) => ({
        icon: <ProjectIcon projectId={project.id} color={project.color} />,
        text: project.title,
        value: project.id,
      }));
  }, [projects]);

  return <Select className="project-select" items={selectItems} {...props} />;
};
