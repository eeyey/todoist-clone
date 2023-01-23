import React from 'react';

interface FormInputFieldProps extends React.ComponentPropsWithoutRef<'input'> {
  label: string;
  value: string;
  id?: string;
}

const randomId = () => `${Math.random()}-${Date.now()}`;

export const FormInputField: React.FC<FormInputFieldProps> = (props) => {
  const { label, value, id = randomId(), ...inputProps } = props;

  return (
    <div className="form-field">
      <label className="form-field__label" htmlFor={id}>
        {label}
      </label>
      <input
        className="form-field__input"
        type="text"
        value={value}
        {...inputProps}
      />
    </div>
  );
};
