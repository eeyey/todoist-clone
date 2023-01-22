import React from 'react';
import ContentEditable from 'react-contenteditable';

interface TitleInputProps {
  value: string;
  onChange: (title: string) => void;
}

export const TitleInput: React.FC<TitleInputProps> = (props) => {
  const { value, onChange } = props;

  const onKeydown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <div className="todo-add__title-wrapper">
      {!value.length && (
        <div className="todo-add__placeholder">Название задачи</div>
      )}
      <ContentEditable
        className="todo-add__title"
        html={value}
        onChange={(e) => {
          onChange(e.target.value.replace(/&nbsp;|\u202F|\u00A0/g, ' ')); // replace non-breaking space
        }}
        onKeyDown={onKeydown}
      />
    </div>
  );
};
