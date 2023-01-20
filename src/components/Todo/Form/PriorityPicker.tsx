import React from 'react';

import { PriorityIcon24 } from '../../icons';
import { IconButton } from '../../UI/IconButton';

interface PriorityPickerProps {
  onChange: (value: number, text: string) => void;
  value: number;
}

export const PriorityPicker: React.FC<PriorityPickerProps> = (props) => {
  const { value, onChange } = props;

  return <IconButton icon={<PriorityIcon24 priority={value} />} />;
};
