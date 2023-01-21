import React from 'react';

import './menuItem.css';

interface MenuItemProps extends React.ComponentPropsWithoutRef<'li'> {
  icon: JSX.Element;
  text: string;

  additionalText?: string;
}

export const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { icon, text, additionalText, ...liProps } = props;

  return (
    <li className="menu-item" {...liProps}>
      <span className="menu-item__icon">{icon}</span>
      <span className="menu-item__text">{text}</span>
      <span className="menu-item__additional">{additionalText}</span>
    </li>
  );
};
