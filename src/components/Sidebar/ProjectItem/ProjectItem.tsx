import React from 'react';

import { ProjectIcon24 } from '../../icons';
import { ProjectMenu } from '../../Project';
import { LinkItem } from '../LinkItem';

import { selectTodos, useAppSelector } from '../../../core/store';

import { IProject } from '../../../core/types';

interface ProjectItemProps {
  project: IProject;
}

export const ProjectItem: React.FC<ProjectItemProps> = (props) => {
  const { project } = props;

  const { todos } = useAppSelector(selectTodos);

  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);

  const score = todos.filter(
    (todo) => todo.projectId === project.id && !todo.complete,
  ).length;

  return (
    <React.Fragment>
      <LinkItem
        icon={<ProjectIcon24 color={project.color} />}
        text={project.title}
        to={`/project/${project.id}`}
        score={score}
        dotsClick={(e) => {
          setAnchorEl(e.currentTarget);
        }}
      />
      <ProjectMenu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={setAnchorEl.bind(this, null)}
        project={project}
      />
    </React.Fragment>
  );
};
