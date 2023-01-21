import React from 'react';

export const useDisableScroll = <T,>(
  element: HTMLElement,
  dep?: T,
  enableVal?: T,
) => {
  const preventScroll = React.useCallback((e: Event) => {
    const pageScroll = element.dataset.scroll;

    if (!pageScroll) return;

    element.scrollTo(0, +pageScroll);

    e.preventDefault();
  }, []);

  const disableScroll = React.useCallback(() => {
    const pageScroll = element.scrollTop;

    element.dataset.scroll = `${pageScroll}`;

    element.addEventListener('wheel', preventScroll, {
      passive: false,
    });
    element.addEventListener('scroll', preventScroll);

    if (element === document.body || element === document.documentElement) {
      window.addEventListener('scroll', preventScroll);
    }
  }, []);

  const enableScroll = React.useCallback(() => {
    delete element.dataset.scroll;

    element.removeEventListener('wheel', preventScroll);
    element.removeEventListener('scroll', preventScroll);

    if (element === document.body || element === document.documentElement) {
      window.removeEventListener('scroll', preventScroll);
    }
  }, []);

  React.useEffect(() => {
    if (dep === enableVal) {
      disableScroll();
    }

    return enableScroll;
  }, [dep]);

  React.useEffect(() => {
    return enableScroll;
  }, []);

  return { enableScroll, disableScroll };
};
