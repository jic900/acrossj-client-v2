import {
  IForm,
  IElement,
  ILinkElement,
  IMessageElement
} from 'app/config/interfaces';

export interface IOthersInfo {
  saveButton: IElement;
  backLink: ILinkElement;
}

export interface IOthersInfoMessage {
  success: IMessageElement;
}

export class OthersInfoConfig implements IForm {

  name = 'USER.PROFILE.EVENT_RELATED.OTHERS.LABEL';
  elements: [IElement, ILinkElement] = [
    {
      name: 'saveButton',
      type: 'button',
      display: 'USER.PROFILE.EVENT_RELATED.OTHERS.BTN_LABEL'
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
        display: 'MESSAGES.USER.PROFILE.EVENT_RELATED.OTHERS.SUCCESS',
        type: 'success',
        icon: {
          class: 'fa-check-circle',
          type: 'fa'
        }
      }
    }
  ];
}
