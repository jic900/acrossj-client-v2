import { FormGroup, FormControl } from '@angular/forms';

import { MomentService, DateField } from '../services/moment.service';
import { IDate, IDateRange } from 'app/config/interfaces';

export class ValidationUtil {

  public static isValidDate =
    (dateFormat: string, momentService: MomentService) => (formControl: FormControl) => {
      return momentService.isValidDate(formControl.value, dateFormat) ? null : {'isValidDate': true};
    }

  public static dateWithinRange =
    (dateRange: IDateRange, dateFormat: string, momentService: MomentService) => (formControl: FormControl) => {
      const parsedDate: IDate = momentService.parseDate(formControl.value, dateFormat);
      return momentService.dateWithinRange(parsedDate, dateRange) ? null : {'dateWithinRange': true};
    }

  public static isValidDateRange =
    (dateFormat: string, momentService: MomentService) => (formControl: FormControl) => {
      if (! formControl.value || formControl.value.trim() === '') {
        return null;
      }
      const dateRangeParts = formControl.value.trim().split('-');
      if (dateRangeParts.length !== 2) {
        return {'isValidDateRange': true};
      }
      const startDateValid = momentService.isValidDate(dateRangeParts[0], dateFormat);
      const endDateValid = momentService.isValidDate(dateRangeParts[1], dateFormat);
      const parsedStartDate: IDate = momentService.parseDate(dateRangeParts[0], dateFormat);
      const parsedEndDate: IDate = momentService.parseDate(dateRangeParts[1], dateFormat);
      const endDateAfterStartDate = ! momentService.isBefore(DateField.DAY, parsedStartDate, parsedEndDate);
      return startDateValid && endDateValid && endDateAfterStartDate ? null : {'isValidDateRange': true};
    }

  public static endDateExists =
    (dateFormat: string, momentService: MomentService) => (formControl: FormControl) => {
      const dateRangeParts = formControl.value.trim().split('-');
      return momentService.isValidDate(dateRangeParts[1], dateFormat) ? null : {'endDateExists': true};
    }

  public static passwordMatch =
    (passwordField: string, confirmPasswordField: string) => (formGroup: FormGroup) => {
      const passwordControl = formGroup.get(passwordField);
      const confirmPasswordControl = formGroup.get(confirmPasswordField);
      if (passwordControl && confirmPasswordControl) {
        return passwordControl.value === confirmPasswordControl.value ? null : {'passwordMatch': true};
      }
      return null;
    }
}
