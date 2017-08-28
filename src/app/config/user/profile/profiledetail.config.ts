/**
 * Created by LAE84266 on 14/08/2017.
 */

import { IComponent } from 'app/config/interfaces/component.interface';
import { ILinkElement } from 'app/config/interfaces/link-element.interface';

export class ProfileDetailConfig implements IComponent {
  elements: [ILinkElement] = [
    {
      name: 'backLink',
      type: 'icon',
      icon: {
        class: 'arrow_back',
        type: 'md'
      },
      link: {
        path: '/user/profile/menu'
      }
    }
  ];
}
