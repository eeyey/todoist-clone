import React from 'react';

import { MONTH_NAMES } from '../../../../core/utils/date/short-names';
import { TODAY } from '../../../../core/utils/date/constats';

interface DateInputProps {
  date: Date | null;
  setDate: (date: Date) => void;
}

export const DateInput: React.FC<DateInputProps> = (props) => {
  const { date, setDate } = props;

  const [dateText, setDateText] = React.useState<string>('');

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateText(e.target.value);
  };

  React.useEffect(() => {
    if (date) {
      const d = date.getDate();
      const m = date.getMonth();

      let dText = `${d} ${MONTH_NAMES.short[m].toLowerCase()}`;

      if (date.getFullYear() > TODAY.getFullYear()) {
        dText += ` ${date.getFullYear()}`;
      }

      setDateText(dText);
    } else {
      setDateText('');
    }
  }, [date]);

  return (
    <div className="datepicker__date-wrapper">
      <input
        type="text"
        className="datepicker__date-input"
        onInput={onInput}
        value={dateText}
      />
    </div>
  );
};
