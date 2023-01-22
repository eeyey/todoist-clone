import React from 'react';
import { Select } from '../../common';

import { PriorityIcon24 } from '../../icons';
import { IconButton } from '../../UI/IconButton';

interface PriorityPickerProps {
  onChange: (value: number) => void;
  value: number;
}

export const PriorityPicker: React.FC<PriorityPickerProps> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const btnHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const onClose = setAnchorEl.bind(this, null);

  const items = [1, 2, 3, 4].map((priority) => ({
    icon: <PriorityIcon24 priority={priority} />,
    text: `Приоритет ${priority}`,
    value: priority,
  }));

  return (
    <React.Fragment>
      <IconButton
        onClick={btnHandler}
        icon={<PriorityIcon24 priority={props.value} />}
      />
      <Select
        className="priority-select"
        open={Boolean(anchorEl)}
        {...{ ...props, anchorEl, onClose, items }}
      />
    </React.Fragment>
  );
};
