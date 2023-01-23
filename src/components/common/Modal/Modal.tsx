import classNames from 'classnames';
import React from 'react';
import { useDisableScroll } from '../../../hooks';

import { Portal } from '../Portal';

import './Modal.css';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  content?: React.HTMLAttributes<HTMLDivElement>;
  wrapper?: React.HTMLAttributes<HTMLDivElement>;
}

export const Modal: React.FC<ModalProps> = (props) => {
  const { open, onClose, content, wrapper, children } = props;

  useDisableScroll(document.documentElement, open, true);

  const contentHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return open ? (
    <Portal>
      <div
        onMouseDown={onClose}
        {...wrapper}
        className={classNames('modal', wrapper?.className)}
      >
        <div
          onMouseDown={contentHandler}
          {...content}
          className={classNames('modal__content', content?.className)}
        >
          {children}
        </div>
      </div>
    </Portal>
  ) : (
    <></>
  );
};
