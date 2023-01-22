import React from 'react';

import { CheckmarkIcon12 } from '../../icons';

interface SelectItemProps extends React.ComponentPropsWithoutRef<'li'> {
  icon: JSX.Element;
  text: string;
  checked?: boolean;
}

export const SelectItem: React.FC<SelectItemProps> = (props) => {
  const { icon, text, checked, ...liProps } = props;

  return (
    <li className="select-item" {...liProps}>
      <span className="select-item__icon">{icon}</span>
      <span className="select-item__text">{text}</span>
      {checked && (
        <span className="select-item__checkmark">
          <CheckmarkIcon12 />
        </span>
      )}
    </li>
  );
};
