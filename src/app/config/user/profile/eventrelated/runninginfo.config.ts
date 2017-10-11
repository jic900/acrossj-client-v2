import {
  IForm,
  IElement,
  ILinkElement,
  IMessageElement,
  IValidator
} from 'app/config/interfaces';
import { ValidationUtil } from 'app/shared/util/validation-util';

export interface IRunningInfo {
  saveButton: IElement;
  backLink: ILinkElement;
}

export interface IRunningInfoMessage {
  success: IMessageElement;
}

export class RunningInfoConfig implements IForm {

  name = 'USER.PROFILE.EVENT_RELATED.RUNNING.LABEL';
  elements: [IElement, ILinkElement] = [
    {
      name: 'saveButton',
      type: 'button',
      display: 'USER.PROFILE.EVENT_RELATED.RUNNING.BTN_LABEL'
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
        display: 'MESSAGES.USER.PROFILE.EVENT_RELATED.RUNNING.SUCCESS',
        type: 'success',
        icon: {
          class: 'fa-check-circle',
          type: 'fa'
        }
      }
    }
  ];
}
