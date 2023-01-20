import classNames from 'classnames';
import React from 'react';

import './list.css';

interface ListProps<T> extends React.ComponentPropsWithoutRef<'ul'> {
  renderItem: (item: T, i: number) => React.ReactNode;
  items: T[];
}

export function List<T>(props: ListProps<T>) {
  const { items, renderItem, className } = props;

  return (
    <ul {...props} className={classNames('list', className)}>
      {items.map(renderItem)}
    </ul>
  );
}
