/**
 * Created by LAE84266 on 15/08/2017.
 */

import { IElement } from './element.interface';
import { ILinkElement } from './link-element.interface';
import { IListElement } from './list-element.interface';

export type IListItem = IElement | ILinkElement | IListElement;
