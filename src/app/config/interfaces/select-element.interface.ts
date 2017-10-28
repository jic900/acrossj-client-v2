import { IInputElement } from './input-element.interface';
import { IElement } from './element.interface';
import { IChipOptions } from './chip-options.interface';

export enum SelectMode {SINGLE, MULTI}
export enum SelectLayout {COLUMN, ROW}

export interface ISelectItem extends IElement {
  value: any;
}

export interface ISimpleSelectElement extends IInputElement {
  selectList: ISelectItem[];
  mode: SelectMode;
  layout?: SelectLayout;
}

export interface ISelectElement extends ISimpleSelectElement {
  chipOptions: IChipOptions;
}
