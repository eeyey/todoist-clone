interface ScrollToElement {
  (selector: string, padding?: number): boolean;
  (element: HTMLElement, padding?: number): boolean;
}

export const scrollToElement: ScrollToElement = (
  selectorOfElement: string | HTMLElement,
  padding?: number,
) => {
  let element: HTMLElement;
  if (selectorOfElement instanceof HTMLElement) {
    element = selectorOfElement;
  } else {
    const el = document.querySelector(selectorOfElement);

    if (!el || !(el instanceof HTMLElement)) return false;

    element = el;
  }

  const { top } = element.getBoundingClientRect();
  const scrollTop = document.documentElement.scrollTop;

  const y = top + scrollTop - Number(padding);
  document.documentElement.scrollTo(0, y);

  return true;
};
