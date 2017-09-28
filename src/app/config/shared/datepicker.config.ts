import { FormControl } from '@angular/forms';

import {
  IComponent,
  IElement,
  IInputElement,
  ICalendar,
  IDate,
  IDateRange
} from 'app/config/interfaces';
import { MomentService } from 'app/shared/services/moment.service';

const isValidDate = (dateFormat: string, momentService: MomentService) => (formControl: FormControl) => {
  return momentService.isValidDate(formControl.value, dateFormat) ? null : {'isValidDate': true};
};

const dateWithinRange = (dateRange: IDateRange, dateFormat: string, momentService: MomentService) => (formControl: FormControl) => {
  const parsedDate: IDate = momentService.parseDate(formControl.value, dateFormat);
  return momentService.dateWithinRange(parsedDate, dateRange) ? null : {'dateWithinRange': true};
};

export interface IDatePicker {
  dateInput: IInputElement;
  calButton: IElement;
  clearButton: IElement;
  calendar: ICalendar;
}

export class CalendarConfig implements ICalendar {

  name: string = 'calendar';
  dateFormat: string = 'SHARED.DATE_PICKER.DATE_FORMAT';
  // weekendHighlight: boolean = true;
  // markDates: IDate[] = [{year: 2017, month: 9, day: 5}, {year: 2017, month: 9, day: 28}];
  // markDates: IDate[] = [];
  // highlightDates: IDate[] = [];
  // showTodayBtn: boolean = false;
  todayBtnTxt: string = 'SHARED.DATE_PICKER.TODAY_BUTTON_TXT';
}

export class DatePickerConfig implements IComponent {

  elements: [IInputElement, IElement, IElement, ICalendar] = [
    {
      name: 'dateInput',
      type: 'input',
      placeHolder: '',
      validators: [
        {
          name: 'isValidDate',
          type: 'custom',
          error: 'ERRORS.VALIDATION.DATE_PICKER.INVALID_DATE_FORMAT',
          validateFunc: isValidDate
        },
        {
          name: 'dateWithinRange',
          type: 'custom',
          error: 'ERRORS.VALIDATION.DATE_PICKER.DATE_NOT_WITHIN_RANGE',
          validateFunc: dateWithinRange
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
    new CalendarConfig()
  ];
}
