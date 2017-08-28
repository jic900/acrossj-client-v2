/**
 * Created by LAE84266 on 31/07/2017.
 */

import { IIcon } from './icon.interface';

export interface IElement {
  name: string;
  type?: string;
  display?: string;
  description?: string;
  tooltip?: string;
  icon?: IIcon;
}
