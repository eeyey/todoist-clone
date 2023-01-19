import React from 'react';
import { EmptyPriorityIcon } from './EmptyPriorityIcon';

interface PriorityIcon24Props {
  priority?: number;
}

export const PriorityIcon24: React.FC<PriorityIcon24Props> = (props) => {
  const { priority } = props;

  const colors = ['', '#d1453b', '#eb8909', '#246fe0'];

  if (priority === 4 || !priority) return <EmptyPriorityIcon />;

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.223 4.584A.5.5 0 004 5v14.5a.5.5 0 001 0v-5.723C5.886 13.262 7.05 13 8.5 13c.97 0 1.704.178 3.342.724 1.737.58 2.545.776 3.658.776 1.759 0 3.187-.357 4.277-1.084A.5.5 0 0020 13V4.5a.5.5 0 00-.777-.416C18.313 4.69 17.075 5 15.5 5c-.97 0-1.704-.178-3.342-.724C10.421 3.696 9.613 3.5 8.5 3.5c-1.758 0-3.187.357-4.277 1.084z"
        fill={colors[priority]}
      ></path>
    </svg>
  );
};
