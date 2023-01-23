import React from 'react';

import { Button } from '../../UI';
import { Modal, ModalProps } from '../../common';
import { FormColorField } from './FormColorField';
import { FormInputField } from './FormInputField';

import { addProject, updateProject, useAppDispatch } from '../../../core/store';
import { IProject } from '../../../core/types';

import { defaultColor } from './colors';

import './ProjectForm.css';

type DefaultProps = Pick<ModalProps, 'open' | 'onClose'>;

interface ProjectFormProps extends DefaultProps {
  type: 'add' | 'edit';
  data?: IProject;
}

export const ProjectForm: React.FC<ProjectFormProps> = (props) => {
  const { type, data, onClose, open } = props;

  const dispatch = useAppDispatch();

  const [title, setTitle] = React.useState(data?.title ?? '');
  const [color, setColor] = React.useState(data?.color ?? defaultColor); // Надо подумать :)

  const submit = () => {
    if (!title.trim().length) return;

    const project = { title: title.trim(), color };

    if (type === 'add') {
      dispatch(addProject(project));
    } else {
      if (data?.id) dispatch(updateProject({ id: data?.id, data: project }));
    }

    onClose();

    setTitle('');
    setColor(defaultColor);
  };

  const inputHander = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const keydownHander = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') submit();
  };

  return (
    <Modal
      {...{ onClose, open }}
      content={{ className: 'project-modal-content' }}
      wrapper={{ className: 'project-modal-wrapper' }}
    >
      <div className="project-form__header">
        <h2 className="project-form__title">
          {type === 'add' ? 'Добавить проект' : 'Редактировать проект'}
        </h2>
      </div>
      <div className="project-form__body">
        <FormInputField
          label="Название"
          value={title}
          onChange={inputHander}
          onKeyDown={keydownHander}
        />
        <FormColorField
          value={color}
          onChange={(selected) => {
            setColor(selected);
          }}
        />
      </div>
      <div className="project-form__footer">
        <Button text="Отменить" type="secondary" onClick={onClose} />
        <Button
          text={type === 'add' ? 'Добавить' : 'Сохранить'}
          type="success"
          active={!!title.trim().length}
          onClick={submit}
        />
      </div>
    </Modal>
  );
};
