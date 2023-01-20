import React from 'react';

import classNames from 'classnames';

import './Button.css';

interface ButtonProps {
  text: string;
  type: 'secondary' | 'success' | 'inactive';
  active?: boolean;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { text, type, active = true, onClick } = props;
  return (
    <button
      className={classNames('button', `button_${type}`, {
        button_inactive: !active,
      })}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
