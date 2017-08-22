/**
 * Created by LAE84266 on 31/07/2017.
 */

import { IMessageElement } from './message-element';

export interface IComponent {
  title?: string;
  elements: any[];
  messages?: IMessageElement[];
}
