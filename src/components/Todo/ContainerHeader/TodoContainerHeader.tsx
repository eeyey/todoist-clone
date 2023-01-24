import React from 'react';

import { getHeaderName } from './utils';

import { TODAY } from '../../../core/utils/date';

import './TodoContainerHeader.css';

interface TodoContainerHeaderProps {
  date: Date;
}

export const TodoContainerHeader: React.FC<TodoContainerHeaderProps> = (
  props,
) => {
  const { date } = props;

  const [sticky, setSticky] = React.useState(0);

  const header = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!header.current) return;

    const content = header.current.closest('.container');
    const stickyElement = content?.firstElementChild;

    if (!stickyElement) return;

    const { bottom: sticky } = stickyElement.getBoundingClientRect();

    setSticky(sticky);
  }, []);

  return (
    <div
      ref={header}
      style={{ top: `${sticky}px` }}
      className="todo-container-header"
    >
      <h4 className="todo-container-name">
        {+date < +TODAY ? 'Просрочено' : getHeaderName(date)}
      </h4>
    </div>
  );
};
