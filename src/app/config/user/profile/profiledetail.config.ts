/**
 * Created by LAE84266 on 14/08/2017.
 */

import { IComponent, IElement } from 'app/config/interfaces';

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
