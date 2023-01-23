import React from 'react';

import { Select } from '../../common';
import { ProjectIcon24 } from '../../icons';

import { colors } from './colors';

interface FormColorFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export const FormColorField: React.FC<FormColorFieldProps> = (props) => {
  const { value, onChange } = props;

  const [anchorEl, setAchorEl] = React.useState<HTMLDivElement | null>(null);

  const items = React.useMemo(
    () =>
      Object.entries(colors).map(([value, text]) => ({
        value,
        text,
        icon: <ProjectIcon24 color={value} />,
      })),
    [],
  );

  const fieldHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    setAchorEl(e.currentTarget);
  };

  const onClose = setAchorEl.bind(this, null);

  const colorName = colors[value as keyof typeof colors];

  return (
    <React.Fragment>
      <div className="color-field" onClick={fieldHandler}>
        <label className="color-field__label" htmlFor="color-picker">
          Цвет
        </label>
        <div className="color-field__color">
          <ProjectIcon24 color={value} />
          <div className="color-field__color-name">{colorName}</div>
        </div>
      </div>
      <Select
        className="color-select"
        open={Boolean(anchorEl)}
        {...{ anchorEl, items, onChange, onClose, value }}
      />
    </React.Fragment>
  );
};
