import { OriginPosition } from './types';

export const getAnchorOrigin = <T extends HTMLElement>(
  anchor: T,
  anchorOrigin: OriginPosition,
): [number, number] => {
  const [horizonlal, vertical] = anchorOrigin;

  const rect = anchor.getBoundingClientRect();

  let x = 0;
  let y = 0;

  if (vertical === 'top') y = rect.top;
  if (vertical === 'center') y = rect.top + rect.height / 2;
  if (vertical === 'bottom') y = rect.top + rect.height;

  if (horizonlal === 'left') x = rect.left;
  if (horizonlal === 'center') x = rect.left + rect.width / 2;
  if (horizonlal === 'right') x = rect.left + rect.width;

  return [x, y];
};

export const getTransformOrigin = <T extends HTMLElement>(
  popover: T,
  transformOrigin: OriginPosition,
  anchorOrigin: ReturnType<typeof getAnchorOrigin>,
): [number, number] => {
  const [horizonlal, vertical] = transformOrigin;

  let [x, y] = anchorOrigin;

  const rect = popover.getBoundingClientRect();

  if (vertical === 'center') y -= rect.height / 2;
  if (vertical === 'bottom') y -= rect.height;

  if (horizonlal === 'center') x -= rect.width / 2;
  if (horizonlal === 'right') x -= rect.width;

  return [x, y];
};

export const pointInScreen = (x: number, y: number) =>
  x >= 0 && x <= window.innerWidth && y >= 0 && y <= window.innerHeight;
