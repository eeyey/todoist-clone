import React from 'react';

interface ProjectIcon12Props {
  color: string;
}

export const ProjectIcon12: React.FC<ProjectIcon12Props> = ({ color }) => {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12">
      <circle cx="6" cy="6" r="4" fill={color}></circle>
    </svg>
  );
};
