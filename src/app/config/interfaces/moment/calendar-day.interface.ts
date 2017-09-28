import { IDate } from './date.interface';

export interface ICalendarDay {
  dateObj: IDate;
  isToday: boolean;
  marked: boolean;
  highlighted: boolean;
  disabled: boolean;
}
