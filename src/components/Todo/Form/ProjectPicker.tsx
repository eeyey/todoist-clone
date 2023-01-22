import React from 'react';
import { selectProjects, useAppSelector } from '../../../core/store';
import { ProjectIcon } from '../../icons';
import { ProjectSelect } from '../ProjectsSelect';

interface ProjectPickerProps {
  value: number;
  onChange: (val: number) => void;
}

export const ProjectPicker: React.FC<ProjectPickerProps> = (props) => {
  const { value } = props;

  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);

  const { projects } = useAppSelector(selectProjects);

  const project = projects.filter((project) => project.id === value)[0];

  if (!project) throw Error('Cant get project');

  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(e.currentTarget);
  };

  return (
    <>
      <div className="project-picker" onClick={clickHandler}>
        <ProjectIcon projectId={project.id} color={project.color} />
        {project.title}
      </div>
      <ProjectSelect
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={setAnchorEl.bind(this, null)}
        {...props}
      />
    </>
  );
};
