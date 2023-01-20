import React from 'react';

import { CloseIcon24, HelpIcon24, SearcIcon24 } from '../../icons';

import './search.css';

export const Search: React.FC = () => {
  return (
    <div className="search ">
      <div className="search__icon">
        <SearcIcon24 />
      </div>
      <div className="search__buttons">
        <button className="search__button button-help">
          <HelpIcon24 />
        </button>
        <button className="search__button button-close">
          <CloseIcon24 />
        </button>
      </div>
      <input className="search__input" placeholder="Поиск" type="text" />
    </div>
  );
};
