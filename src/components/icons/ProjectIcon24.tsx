import React from 'react';

interface ProjectIcon24Props {
  color: string;
}

export const ProjectIcon24: React.FC<ProjectIcon24Props> = ({ color }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path d="M12 7a5 5 0 110 10 5 5 0 010-10z" fill={color}></path>
    </svg>
  );
};
