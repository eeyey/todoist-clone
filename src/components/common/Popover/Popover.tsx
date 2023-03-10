import React from 'react';
import { useDisableScroll } from '../../../hooks';

import { Portal } from '../Portal';

import './Popover.css';
import { PopoverProps } from './types';
import { getAnchorOrigin, getTransformOrigin, pointInScreen } from './utils';

export const Popover: React.FC<PopoverProps> = (props) => {
  const { open, anchorEl, position, children, onClose } = props;

  const [contentPos, setContentPos] = React.useState({
    left: '-9999px',
    top: '-9999px',
  });

  useDisableScroll(document.documentElement, open, true);

  const popperContent = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const popover = popperContent.current;

    if (!popover || !anchorEl) return;

    const { width, height } = popover.getBoundingClientRect();

    let x = -9999;
    let y = -9999;

    const positions = Array.isArray(position) ? position : [position];

    for (let i = 0; i < positions.length; i++) {
      const { anchorOrigin, transformOrigin } = positions[i];

      [x, y] = getAnchorOrigin(anchorEl, anchorOrigin);
      [x, y] = getTransformOrigin(popover, transformOrigin, [x, y]);

      if (pointInScreen(x, y) && pointInScreen(x + width, y + height)) break;
    }

    setContentPos({ left: `${x}px`, top: `${y}px` });
  }, [anchorEl]);

  return open ? (
    <Portal>
      <div onMouseDown={onClose} className="popper">
        <div
          ref={popperContent}
          style={contentPos}
          onMouseDown={(e: React.MouseEvent) => {
            e.stopPropagation();
          }}
          className="popper__content"
        >
          {children}
        </div>
      </div>
    </Portal>
  ) : (
    <></>
  );
};
