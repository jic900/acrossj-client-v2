import { IInputElement } from './input-element.interface';
import { IElement } from './element.interface';
import { IChipOptions } from './chip-options.interface';

export interface ISelectItem extends IElement {
  value: boolean;
}

export interface ISelectElement extends IInputElement {
  selectList: ISelectItem[];
}

export interface IMultiSelectElement extends ISelectElement {
  toggleButton: IElement;
  chipOptions: IChipOptions;
}
