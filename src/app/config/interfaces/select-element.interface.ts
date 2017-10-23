import { IInputElement } from './input-element.interface';
import { IElement } from './element.interface';
import { IChipOptions } from './chip-options.interface';

export enum SelectMode {SINGLE, MULTI}

export interface ISelectItem extends IElement {
  value: any;
}

export interface ISelectElement extends IInputElement {
  selectList: ISelectItem[];
  chipOptions: IChipOptions;
  mode: SelectMode;
}

