import React from 'react';

import { Link, useMatch } from 'react-router-dom';

import classnames from 'classnames';

import { DotsIcon } from '../../icons';

import './LinkItem.css';

interface LinkItemProps {
  text: string;
  to: string;
  icon: JSX.Element;
  score?: number;
  dotsClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const LinkItem: React.FC<LinkItemProps> = (props) => {
  const { text, to, icon, score, dotsClick } = props;

  const match = useMatch(to);

  const linkClassName = classnames('item-link', {
    'item-link_control': Boolean(dotsClick),
    'item-link_active': match !== null,
  });

  return (
    <li className={linkClassName}>
      <Link to={to} className="item-link__link">
        <span className="item-link__icon">{icon}</span>
        <span className="item-link__text">{text}</span>
      </Link>
      <span className="item-link__score">{score}</span>
      {dotsClick && (
        <div className="item-link__button-controll" onClick={dotsClick}>
          <DotsIcon />
        </div>
      )}
    </li>
  );
};
