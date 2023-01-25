import React from 'react';

import { DateLine } from '../DateLine';
import { DateLinePicker } from '../DateLinePicker';
import { DateLineButtons } from '../DateLineButtons';

import { TODAY } from '../../../core/utils/date';

import './UpcomingHeader.css';

interface UpcomingHeaderProps {
  id?: number;
}

export const UpcomingHeader: React.FC<UpcomingHeaderProps> = (props) => {
  const [date, setDate] = React.useState(TODAY);

  return (
    <div className="upcoming-header">
      <div className="upcoming-nav">
        <DateLinePicker {...{ date, setDate }} />
        <div className="upcomming-buttons">
          <DateLineButtons {...{ date, setDate }} />
        </div>
      </div>
      <DateLine {...{ date, setDate }} />
    </div>
  );
};
