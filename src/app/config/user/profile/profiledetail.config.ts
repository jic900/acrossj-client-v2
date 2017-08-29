/**
 * Created by LAE84266 on 14/08/2017.
 */

import { IComponent } from 'app/config/interfaces/component.interface';
import { IElement } from 'app/config/interfaces/element.interface';

export class ProfileDetailConfig implements IComponent {
  elements: [IElement] = [
    {
      name: 'backLink',
      type: 'icon',
      icon: {
        class: 'arrow_back',
        type: 'md'
      }
    }
  ];
}
