import React from 'react';

import { Calendar } from '../Calendar';
import { FastMenu } from '../FastMenu';
import { DateInput } from '../DateInput';

import './DatePicker.css';
import { Popover } from '../../Popover';

type DateType = Date | null;

type GetProps<T> = T extends React.FC<infer Props> ? Props : T;
type PopoverProps = GetProps<typeof Popover>;
type DatePopoverProps = Pick<PopoverProps, 'anchorEl' | 'onClose' | 'open'> &
  Partial<PopoverProps>;

interface DatePickerProps extends DatePopoverProps {
  onChange: (date: DateType) => void;
  value?: Date | null;
  children?: any;
}

export const DatePicker: React.FC<DatePickerProps> = (props) => {
  const { value, onChange, anchorEl, onClose, open, position } = props;

  const [date, setDate] = React.useState<DateType>(value ?? null);

  const selectDate = (date: DateType) => {
    onChange(date);
    setDate(date);
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
    <Popover {...{ onClose, open, anchorEl }} position={popoverPosition}>
      <div className="menu datepicker">
        <DateInput date={date} setDate={setDate} />
        <FastMenu selectDate={selectDate} />
        <Calendar onSelect={selectDate} selectedDate={value} />
      </div>
    </Popover>
  );
};
