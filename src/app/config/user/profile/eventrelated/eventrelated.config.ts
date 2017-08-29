import { IComponent } from 'app/config/interfaces/component.interface';
import { IElement } from 'app/config/interfaces/element.interface';

export class EventRelatedConfig implements IComponent {
  elements: [IElement] = [
    {
      name: 'title',
      type: 'label',
      display: 'USER.PROFILE.EVENT_RELATED.LABEL'
    }
  ];
}
