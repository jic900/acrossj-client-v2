import { ValidationUtil } from 'app/shared/util/validation-util';
import {
  IComponent,
  IElement,
  IInputElement,
  ICalendarOptions
} from 'app/config/interfaces';

export type IDateCalendarConfig = IComponent;
export type IDateRangeCalendarConfig = IComponent;

export interface IDatePicker {
  dateInput: IInputElement;
  calButton: IElement;
  clearButton: IElement;
  dateCalendar: IDateCalendarConfig;
  dateRangeCalendar: IDateRangeCalendarConfig;
}

export interface IDateRangeCalendar {
  startDate: IElement;
  endDate: IElement;
}

class DateCalendarConfig implements IDateCalendarConfig {
  name: string = 'dateCalendar';
  elements = [];
}

class DateRangeCalendarConfig implements IDateRangeCalendarConfig {
  name: string = 'dateRangeCalendar';
  elements: [IElement, IElement] = [
    {
      name: 'startDate',
      type: 'label',
      display: 'SHARED.DATE_PICKER.DATE_RANGE_CALENDAR.START_DATE_LABEL'
    },
    {
      name: 'endDate',
      type: 'label',
      display: 'SHARED.DATE_PICKER.DATE_RANGE_CALENDAR.END_DATE_LABEL'
    }
  ];
}

export class DatePickerConfig implements IComponent {

  elements: [IInputElement, IElement, IElement, IDateCalendarConfig, IDateRangeCalendarConfig] = [
    {
      name: 'dateInput',
      type: 'input',
      placeHolder: '',
      validators: [
        {
          name: 'isValidDate',
          type: 'custom',
          error: 'ERRORS.VALIDATION.DATE_PICKER.INVALID_DATE_FORMAT',
          validateFunc: ValidationUtil.isValidDate
        },
        {
          name: 'dateWithinRange',
          type: 'custom',
          error: 'ERRORS.VALIDATION.DATE_PICKER.DATE_NOT_WITHIN_RANGE',
          validateFunc: ValidationUtil.dateWithinRange
        },
        {
          name: 'isValidDateRange',
          type: 'custom',
          error: 'ERRORS.VALIDATION.DATE_PICKER.INVALID_DATE_RANGE_FORMAT',
          validateFunc: ValidationUtil.isValidDateRange
        },
        {
          name: 'endDateExists',
          type: 'custom',
          error: 'ERRORS.VALIDATION.DATE_PICKER.SELECT_END_DATE',
          validateFunc: ValidationUtil.endDateExists
        }
      ]
    },
    {
      name: 'calButton',
      type: 'button',
      icon: {class: 'fa-calendar', type: 'fa'}
    },
    {
      name: 'clearButton',
      type: 'button',
      icon: {class: 'fa-times', type: 'fa'}
    },
    new DateCalendarConfig(),
    new DateRangeCalendarConfig()
  ];
  calendarOptions: ICalendarOptions = {
    // 'dateFormat': 'SHARED.DATE_PICKER.DATE_FORMAT'
    // weekendHighlight: boolean = true;
    // markDates: IDate[] = [{year: 2017, month: 9, day: 5}, {year: 2017, month: 9, day: 28}];
    // markDates: IDate[] = [];
    // highlightDates: IDate[] = [];
    // showTodayBtn: boolean = false;
  };
}
