/**
 * Created by LAE84266 on 31/07/2017.
 */

import { IComponent } from './component.interface';
import { IValidator } from './validator.interface';

export interface IForm extends IComponent {
  validator?: IValidator;
  asyncValidator?: IValidator;
}
