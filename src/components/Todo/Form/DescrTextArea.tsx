import React from 'react';

interface DescrTextAreaProps {
  value: string;
  onChange: (descr: string) => void;
}

export const DescrTextArea: React.FC<DescrTextAreaProps> = (props) => {
  const { value, onChange } = props;

  const onDescrInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);

    e.target.style.height = '0px';
    e.target.style.height = `${Math.max(e.target.scrollHeight, 48)}px`;
  };

  return (
    <textarea
      className="todo-add__descr"
      value={value}
      placeholder="Описание"
      onInput={onDescrInput}
    ></textarea>
  );
};
