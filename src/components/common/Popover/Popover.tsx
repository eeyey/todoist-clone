import React from 'react';

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

  const popperContent = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const popover = popperContent.current;

    if (!popover || !anchorEl) return;

    let x = -9999;
    let y = -9999;

    const positions = Array.isArray(position) ? position : [position];

    for (let i = 0; i < positions.length; i++) {
      const { anchorOrigin, transformOrigin } = positions[0];

      [x, y] = getAnchorOrigin(anchorEl, anchorOrigin);
      [x, y] = getTransformOrigin(popover, transformOrigin, [x, y]);

      if (pointInScreen(x, y)) break;
    }

    setContentPos({ left: `${x}px`, top: `${y}px` });
  }, [anchorEl]);

  return (
    <Portal>
      {open && (
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
      )}
    </Portal>
  );
};
