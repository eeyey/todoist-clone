import React from 'react';
import { selectProjects, useAppSelector } from '../../../core/store';
import { InboxIcon16, ProjectIcon12 } from '../../icons';

interface ProjectPickerProps {
  value: number;
  onChange: (val: number) => void;
}

export const ProjectPicker: React.FC<ProjectPickerProps> = (props) => {
  const { value, onChange } = props;

  const { projects } = useAppSelector(selectProjects);

  const project = projects.filter((project) => project.id === value)[0];

  if (!project) throw Error('Cant get project');

  let icon, title;

  if (project.id === 0) {
    icon = <InboxIcon16 />;
    title = 'Входящие';
  } else {
    icon = <ProjectIcon12 color={project.color} />;
    title = `{project.title[0].toUpperCase()} ${project.title.slice(1)}`;
  }

  return (
    <div className="project-picker">
      {icon}
      {title}
    </div>
  );
};
