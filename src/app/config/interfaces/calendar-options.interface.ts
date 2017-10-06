import {
  IDate,
  IDateRange
} from 'app/config/interfaces';

export interface ICalendarOptions {
  dateFormat?: string;
  weekendHighlight?: boolean;
  markDates?: IDate[];
  highlightDates?: IDate[];
  enabledDateRange?: IDateRange;
}
