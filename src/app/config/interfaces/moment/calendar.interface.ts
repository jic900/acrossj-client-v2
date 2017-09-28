import {
  IDate,
  IDateRange
} from 'app/config/interfaces';

export interface ICalendar {
  name: string;
  dateFormat: string;
  weekendHighlight?: boolean;
  markDates?: IDate[];
  highlightDates?: IDate[];
  showTodayBtn?: boolean;
  todayBtnTxt?: string;
  enabledDateRange?: IDateRange;
}
