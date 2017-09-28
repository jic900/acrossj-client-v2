import { IComponent, IElement } from 'app/config/interfaces';

export class EventRelatedConfig implements IComponent {
  elements: [IElement] = [
    {
      name: 'title',
      type: 'label',
      display: 'USER.PROFILE.EVENT_RELATED.LABEL'
    }
  ];
}
