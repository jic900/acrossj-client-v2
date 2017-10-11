import {
  IForm,
  IElement,
  ILinkElement,
  IMessageElement,
  IValidator
} from 'app/config/interfaces';
import { ValidationUtil } from 'app/shared/util/validation-util';

export interface IGeneralInfo {
  saveButton: IElement;
  backLink: ILinkElement;
}

export interface IGeneralInfoMessage {
  success: IMessageElement;
}

export class GeneralInfoConfig implements IForm {

  name = 'USER.PROFILE.EVENT_RELATED.GENERAL.LABEL';
  elements: [IElement, ILinkElement] = [
    {
      name: 'saveButton',
      type: 'button',
      display: 'USER.PROFILE.EVENT_RELATED.GENERAL.BTN_LABEL'
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
        display: 'MESSAGES.USER.PROFILE.EVENT_RELATED.GENERAL.SUCCESS',
        type: 'success',
        icon: {
          class: 'fa-check-circle',
          type: 'fa'
        }
      }
    }
  ];
}
