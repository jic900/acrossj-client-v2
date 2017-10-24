import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MomentService, DateField } from '../services/moment.service';
import {
  IDate,
  IDateRange,
  IValidator,
  SelectMode
} from 'app/config/interfaces';
import { SelectComponent } from '../components/select/select.component';

export class ValidationUtil {

  public static generateFormControl = (controlValidators: IValidator[]) => {
    const validators = [];
    const asyncValidators = [];
    if (controlValidators) {
      controlValidators.forEach(validator => {
        if (validator.type === 'builtin') {
          validators.push(ValidationUtil.getBuiltinValidator(validator));
        } else if (validator.type === 'custom') {
          validators.push(validator.validateFunc);
        } else if (validator.type === 'customAsync') {
          asyncValidators.push(validator.validateFunc);
        }
      });
    }
    return new FormControl('', validators, asyncValidators);
  }

  public static getBuiltinValidator = (validator: IValidator) => {
    switch (validator.name) {
      case 'required':
        return Validators.required;
      case 'minlength':
        return Validators.minLength(validator.value);
      case 'maxlength':
        return Validators.maxLength(validator.value);
      case 'pattern':
        return Validators.pattern(validator.value);
    }
  }

  public static getValidatorError = (validators: IValidator[], formControl: FormControl) => {
    for (const validator of validators) {
      if (formControl.hasError(validator.name)) {
        return validator.error;
      }
    }
    return null;
  }

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

  public static validSelectInput = (select: SelectComponent) => (formControl: FormControl) => {
    if (select.mode === SelectMode.SINGLE && select.chips.length === 0 && select.inputValue && select.inputValue !== '') {
      return {'validSelectInput': true};
    }
    return null;
  }

  public static passwordMatch = (passwordField: string, confirmPasswordField: string) => (formGroup: FormGroup) => {
    const passwordControl = formGroup.get(passwordField);
    const confirmPasswordControl = formGroup.get(confirmPasswordField);
    if (passwordControl && confirmPasswordControl) {
      return passwordControl.value === confirmPasswordControl.value ? null : {'passwordMatch': true};
    }
    return null;
  }
}
