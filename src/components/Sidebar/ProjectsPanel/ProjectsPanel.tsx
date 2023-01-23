import React from 'react';

import { List } from '../../common';
import { IconButton } from '../../UI';
import { PlusIcon13 } from '../../icons';
import { ProjectForm } from '../../Project';
import { ProjectItem } from '../ProjectItem';

import {
  selectProjects,
  selectTodos,
  useAppSelector,
} from '../../../core/store';

import './ProjectsPanel.css';

export const ProjectsPanel = () => {
  const { projects } = useAppSelector(selectProjects);
  const { todos } = useAppSelector(selectTodos);

  const [openForm, setOpenForm] = React.useState(false);

  const projectItems = React.useMemo(
    () => projects.filter((project) => project.id !== 0 && !project.archive),
    [projects, todos],
  );

  return (
    <React.Fragment>
      <div className="projects-panel">
        <h2 className="projects-panel__title">
          <div className="projects-panel__wrapper">
            <span className="projects-panel__text">Проекты</span>
          </div>
          <IconButton
            className="plus-button"
            icon={<PlusIcon13 />}
            onClick={setOpenForm.bind(this, true)}
          />
        </h2>

        <List
          style={{ paddingLeft: '16px' }}
          renderItem={(project) => (
            <ProjectItem key={project.id} project={project} />
          )}
          items={projectItems}
        />
      </div>

      <ProjectForm
        type="add"
        onClose={setOpenForm.bind(this, false)}
        open={openForm}
      />
    </React.Fragment>
  );
};
