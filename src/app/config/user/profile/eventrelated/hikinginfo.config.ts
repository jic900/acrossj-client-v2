import {
  IForm,
  IElement,
  ILinkElement,
  IMessageElement
} from 'app/config/interfaces';

export interface IHikingInfo {
  saveButton: IElement;
  backLink: ILinkElement;
}

export interface IHikingInfoMessage {
  success: IMessageElement;
}

export class HikingInfoConfig implements IForm {

  name = 'USER.PROFILE.EVENT_RELATED.HIKING.LABEL';
  elements: [IElement, ILinkElement] = [
    {
      name: 'saveButton',
      type: 'button',
      display: 'USER.PROFILE.EVENT_RELATED.HIKING.BTN_LABEL'
    },
    {
      name: 'backLink',
      display: '',
      icon: {
        class: 'fa-angle-left',
        type: 'fa'
      },
      link: {
        path: '/user/profile'
      }
    },
  ];

  messages: IMessageElement[] = [
    {
      name: 'success',
      message: {
        display: 'MESSAGES.USER.PROFILE.EVENT_RELATED.HIKING.SUCCESS',
        type: 'success',
        icon: {
          class: 'fa-check-circle',
          type: 'fa'
        }
      }
    }
  ];
}
