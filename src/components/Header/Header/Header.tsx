import React from 'react';

import { Link } from 'react-router-dom';

import { Search } from '../Search';
import {
  BurgerButton24,
  HelpIcon24,
  HomeIcon24,
  NotifyEmptyIcon24,
  PlusIcon24,
  ProductivityIcon24,
} from '../../icons';

import './Header.css';

interface HeaderProps {
  toggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <div className="header">
      <div className="header__left">
        <button
          className="header__button toggle-sidebar-button"
          onClick={toggleSidebar}
        >
          <BurgerButton24 />
        </button>
        <button className="header__button home-button">
          <Link to="/">
            <HomeIcon24 />
          </Link>
        </button>
        <Search />
      </div>
      <div className="header__right">
        <button className="header__button header__button_large add-button">
          <PlusIcon24 />
        </button>
        <button className="header__button header__button_large product-button">
          <ProductivityIcon24 />
          <span className="product-button__text">0/5</span>
        </button>
        <button className="header__button header__button_large help-button">
          <HelpIcon24 />
        </button>
        <button className="header__button header__button_large notify-button">
          <NotifyEmptyIcon24 />
        </button>
      </div>
    </div>
  );
};
