/**
 * Created by LAE84266 on 05/08/2017.
 */
import { IIcon } from './icon.interface';

export interface IMessage {
  display: string;
  type?: string;
  icon?: IIcon;
}
