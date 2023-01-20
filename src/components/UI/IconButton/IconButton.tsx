import React from 'react';

import './IconButton.css';

interface IconButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  icon: JSX.Element;
  text?: string;
}

export const IconButton: React.FC<IconButtonProps> = (props) => {
  const { icon, text, ...buttonProps } = props;

  return (
    <button {...buttonProps} className="icon-button">
      {icon} {text}
    </button>
  );
};
