import React from 'react';

import { List } from '../List';
import { DefaultPopoverProps, Popover } from '../Popover';

import './Select.css';
import { SelectItem } from './SelectItem';

interface SelectOption<T> {
  icon: JSX.Element;
  text: string;
  value: T;
}

type UListProps = Omit<React.ComponentPropsWithoutRef<'ul'>, 'onChange'>;
type ExtendedProps = DefaultPopoverProps & UListProps;

export type SelectProps<T> = ExtendedProps & {
  value: T;
  onChange: (value: T) => void;
  items: Array<SelectOption<T>>;
};

export function Select<T>(props: SelectProps<T>) {
  const {
    items,
    value,
    open,
    position,
    anchorEl,
    onChange,
    onClose,
    ...listProps
  } = props;

  const [selected, setSelected] = React.useState<T>(value);

  const changeHandler = (value: T) => {
    setSelected(value);
    onChange(value);
    onClose();
  };

  const popoverPosition = position ?? [
    {
      anchorOrigin: ['center', 'bottom'],
      transformOrigin: ['center', 'top'],
    },
    {
      anchorOrigin: ['center', 'top'],
      transformOrigin: ['center', 'bottom'],
    },
    {
      anchorOrigin: ['left', 'center'],
      transformOrigin: ['right', 'center'],
    },
  ];

  return (
    <Popover {...{ anchorEl, open, onClose }} position={popoverPosition}>
      <List
        renderItem={(item, i) => (
          <SelectItem
            key={i}
            onClick={changeHandler.bind({}, item.value)}
            checked={selected === item.value}
            icon={item.icon}
            text={item.text}
          />
        )}
        items={items}
        {...listProps}
      />
    </Popover>
  );
}
