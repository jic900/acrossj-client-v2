/**
 * Created by LAE84266 on 31/07/2017.
 */

import { IElement } from './element.interface';
import { IValidator } from './validator.interface';

export interface IInputElement extends IElement {
  placeHolder: string;
  readOnly?: boolean;
  validators?: IValidator[];
  hint?: string;
}
