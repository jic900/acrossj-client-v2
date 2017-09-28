/**
 * Created by LAE84266 on 05/08/2017.
 */

import { ILinkElement } from './link-element.interface';
import { IMessage } from './message.interface';

export interface IMessageElement {
  name: string;
  message: IMessage;
  link?: ILinkElement;
  navLink?: ILinkElement;
}
