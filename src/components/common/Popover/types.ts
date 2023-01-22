type VerticalPosition = 'top' | 'center' | 'bottom';
type HorizontalPosition = 'left' | 'center' | 'right';

export type OriginPosition = [HorizontalPosition, VerticalPosition];
interface PopoverPosition {
  anchorOrigin: OriginPosition;
  transformOrigin: OriginPosition;
}

export interface PopoverProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  position: PopoverPosition | PopoverPosition[];
  children: React.ReactNode;
  onClose: () => void;
}

export type DefaultPopoverProps = Pick<
  PopoverProps,
  'anchorEl' | 'onClose' | 'open'
> &
  Partial<PopoverProps>;
