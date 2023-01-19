import React from 'react';
import { LogoIcon, LoadingIcon } from '../../icons';

import './PageLoader.css';

export const PageLoader = () => {
  return (
    <div className="page-loader">
      <div className="page-loader__content">
        <LogoIcon />
        <LoadingIcon className="page-loader__loading-icon" />
      </div>
    </div>
  );
};
