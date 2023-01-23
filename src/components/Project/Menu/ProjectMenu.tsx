import React from 'react';

import * as Icons from '../../icons';
import { ProjectForm } from '../Form';
import { DefaultPopoverProps, List, MenuItem, Popover } from '../../common';

import { IProject } from '../../../core/types';

import {
  addProject,
  removeProject,
  updateProject,
  useAppDispatch,
} from '../../../core/store';

import './ProjectMenu.css';

interface ProjectMenuProps extends DefaultPopoverProps {
  project: IProject;
}

export const ProjectMenu: React.FC<ProjectMenuProps> = (props) => {
  const { project, onClose, anchorEl, open, position } = props;

  const dispatch = useAppDispatch();

  const [openForm, setOpenForm] = React.useState(false);

  const closeDecorator = <T extends (...args: any) => any>(func: T) => {
    return (...args: Parameters<T>) => {
      func(...args);

      onClose();
    };
  };

  const showForm = closeDecorator(setOpenForm.bind(this, true));

  const updateAction = closeDecorator((data: Omit<Partial<IProject>, 'id'>) =>
    dispatch(updateProject({ id: project.id, data })),
  );

  const duplicate = closeDecorator(() => {
    const newProject: Partial<IProject> = { ...project };

    delete newProject.id;

    dispatch(addProject(newProject));
  });

  const group1 = [
    {
      icon: <Icons.EditIcon24 />,
      text: 'Изменить задачу',
      onClick: showForm,
    },
    {
      icon: <Icons.DuplicateIcon24 />,
      text: 'Дублировать',
      onClick: duplicate,
    },
    {
      icon: <Icons.ArhiveIcon24 />,
      text: 'Архивировать проект',
      onClick: updateAction.bind(this, { archive: true }),
    },
  ];

  const group2 = [
    {
      icon: <Icons.DeleteIcon24 />,
      text: 'Удалить',
      onClick: closeDecorator(() =>
        dispatch(removeProject({ id: project.id })),
      ),
    },
  ];

  const popoverPosition = position ?? [
    {
      anchorOrigin: ['center', 'bottom'],
      transformOrigin: ['center', 'top'],
    },
    {
      anchorOrigin: ['center', 'top'],
      transformOrigin: ['center', 'bottom'],
    },
    {
      anchorOrigin: ['right', 'center'],
      transformOrigin: ['left', 'center'],
    },
  ];

  return (
    <React.Fragment>
      <Popover position={popoverPosition} {...{ onClose, open, anchorEl }}>
        <div className="menu project-menu">
          <List
            items={group1}
            renderItem={(item, i) => <MenuItem key={i} {...item} />}
          />
          <div className="menu__separator"></div>
          <List
            items={group2}
            renderItem={(item, i) => <MenuItem key={i} {...item} />}
          />
        </div>
      </Popover>
      <ProjectForm
        onClose={setOpenForm.bind(this, false)}
        open={openForm}
        type="edit"
        data={project}
      />
    </React.Fragment>
  );
};
