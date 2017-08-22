/**
 * Created by LAE84266 on 31/07/2017.
 */

import { IElement } from './element.interface';
import { IListItem } from './list-item';

export interface IListElement extends IElement {
  placeHolder?: string;
  list: IListItem[];
  navIconClass?: string;
}
