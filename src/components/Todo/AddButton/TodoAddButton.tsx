import React from 'react';

import { PlusIcon13 } from '../../icons';

import './TodoAddButton.css';

export function TodoAddButton(props: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className="button-add" {...props}>
      <span className="button-add__icon ">
        <PlusIcon13 />
      </span>
      <span className="button-add__text">Добавить задачу</span>
    </div>
  );
}
