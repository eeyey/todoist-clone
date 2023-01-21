export interface CalendarProps {
  onSelect: (date: Date) => void;
  selectedDate?: Date | null;
}

export interface IMonthBorder {
  start: number;
  end: number;
}

export interface DateInfo {
  date: Date;
  active: boolean;
}

export interface IDetail {
  date: Date;
  taskCount: number;
}
