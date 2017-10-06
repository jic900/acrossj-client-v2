import { FormGroup, FormControl } from '@angular/forms';

import { MomentService, DateField } from '../services/moment.service';
import { IDate, IDateRange } from 'app/config/interfaces';

export class ValidationUtil {

  public static isValidDate = (momentService: MomentService) => (formControl: FormControl) => {
    return momentService.isValidDate(formControl.value) ? null : {'isValidDate': true};
  }

  public static dateWithinRange = (dateRange: IDateRange, momentService: MomentService) => (formControl: FormControl) => {
    const parsedDate: IDate = momentService.parseDate(formControl.value);
    return momentService.dateWithinRange(parsedDate, dateRange) ? null : {'dateWithinRange': true};
  }

  public static isValidDateRange = (momentService: MomentService) => (formControl: FormControl) => {
    if (!formControl.value || formControl.value.trim() === '') {
      return null;
    }
    const dateRangeParts = formControl.value.trim().split('-');
    if (dateRangeParts.length !== 2) {
      return {'isValidDateRange': true};
    }
    const startDateValid = momentService.isValidDate(dateRangeParts[0]);
    const endDateValid = momentService.isValidDate(dateRangeParts[1]);
    const parsedStartDate: IDate = momentService.parseDate(dateRangeParts[0]);
    const parsedEndDate: IDate = momentService.parseDate(dateRangeParts[1]);
    const endDateAfterStartDate = !momentService.isBefore(DateField.DAY, parsedStartDate, parsedEndDate);
    return startDateValid && endDateValid && endDateAfterStartDate ? null : {'isValidDateRange': true};
  }

  public static endDateExists = (momentService: MomentService) => (formControl: FormControl) => {
    const dateRangeParts = formControl.value.trim().split('-');
    return momentService.isValidDate(dateRangeParts[1]) ? null : {'endDateExists': true};
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
