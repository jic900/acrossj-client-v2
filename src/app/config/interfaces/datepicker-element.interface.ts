import { IDateRange, IMonth } from './moment';
import { IInputElement } from './input-element.interface';

export interface IDatePickerElement extends IInputElement {
  enabledDateRange?: IDateRange;
  defaultMonth?: IMonth;
  hint: string;
}
