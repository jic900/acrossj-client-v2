/**
 * Created by LAE84266 on 31/07/2017.
 */

import { IIcon } from './icon.interface';
import { ITooltip } from './tooltip.interface';

export interface IElement {
  name: string;
  type?: string;
  display?: string;
  description?: string;
  tooltip?: ITooltip;
  icon?: IIcon;
}
