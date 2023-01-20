import React from 'react';

import { List } from '../../common';
import { IconButton } from '../../UI';
import { LinkItem } from '../LinkItem';
import { PlusIcon13, ProjectIcon24 } from '../../icons';

import {
  selectProjects,
  selectTodos,
  useAppSelector,
} from '../../../core/store';

import './ProjectsPanel.css';

export const ProjectsPanel = () => {
  const { projects } = useAppSelector(selectProjects);
  const { todos } = useAppSelector(selectTodos);

  const projectItems = React.useMemo(
    () =>
      projects
        .filter((project) => project.id !== 0 && !project.archive)
        .map((project) => ({
          id: project.id,
          text: project.title,
          to: `/project/${project.id}`,
          score: todos.filter(
            (todo) => todo.projectId === project.id && !todo.complete,
          ).length,
          isOverdue: false,
          icon: <ProjectIcon24 color={project.color} />,
          dotsClick: () => {},
        })),
    [projects, todos],
  );

  return (
    <>
      <div className="projects-panel">
        <h2 className="projects-panel__title">
          <div className="projects-panel__wrapper">
            <span className="projects-panel__text">Проекты</span>
          </div>
          <IconButton className="plus-button" icon={<PlusIcon13 />} />
        </h2>

        <List
          style={{ paddingLeft: '16px' }}
          renderItem={(projectItem) => (
            <LinkItem key={projectItem.id} {...projectItem} />
          )}
          items={projectItems}
        />
      </div>
    </>
  );
};
