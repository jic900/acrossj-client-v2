import { FormGroup, FormControl } from '@angular/forms';

import { MomentService } from '../services/moment.service';
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
