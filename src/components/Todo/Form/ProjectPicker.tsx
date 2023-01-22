import React from 'react';
import { selectProjects, useAppSelector } from '../../../core/store';
import { ProjectIcon } from '../../icons';

interface ProjectPickerProps {
  value: number;
  onChange: (val: number) => void;
}

export const ProjectPicker: React.FC<ProjectPickerProps> = (props) => {
  const { value, onChange } = props;

  const { projects } = useAppSelector(selectProjects);

  const project = projects.filter((project) => project.id === value)[0];

  if (!project) throw Error('Cant get project');

  return (
    <div className="project-picker">
      <ProjectIcon projectId={project.id} color={project.color} />
      {project.title}
    </div>
  );
};
