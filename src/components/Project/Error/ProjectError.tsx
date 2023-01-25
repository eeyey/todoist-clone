import React from 'react';
import { NavLink } from 'react-router-dom';

import img from './project-error.jpg';

import './ProjectError.css';

interface ProjectErrorState {
  hasError: boolean;
  error: Error | null;
}

interface ProjectErrorProps {
  children: React.ReactNode[];
}

export class ProjectError extends React.Component<
  ProjectErrorProps,
  ProjectErrorState
> {
  constructor(props: ProjectErrorProps) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      hasError: true,
      error,
    });
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    const resetError = () => {
      this.setState({
        hasError: false,
        error: null,
      });
    };

    return (
      <div className="project-error">
        <img src={img} />
        <p className="project-error__message">
          {this.state.error?.message ?? 'Произошла ошибка'}
        </p>
        <NavLink
          onClick={resetError}
          to="/project/0"
          className="project-error__button"
        >
          На главный экран{' '}
        </NavLink>
      </div>
    );
  }
}
