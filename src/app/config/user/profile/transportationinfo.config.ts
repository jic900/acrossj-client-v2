/**
 * Created by LAE84266 on 11/08/2017.
 */

import {
  IForm,
  IElement,
  ILinkElement,
  IMessageElement
} from 'app/config/interfaces';

export interface ITransportationInfo {
  saveButton: IElement;
  backLink: ILinkElement;
}

export interface ITransportationInfoMessage {
  success: IMessageElement;
}

export class TransportationInfoConfig implements IForm {

  name = 'USER.PROFILE.TRANSPORTATION_INFO.LABEL';
  elements: [IElement, ILinkElement] = [
    {
      name: 'saveButton',
      type: 'button',
      display: 'USER.PROFILE.TRANSPORTATION_INFO.BTN_LABEL'
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
        display: 'MESSAGES.USER.PROFILE.TRANSPORTATION_INFO.SUCCESS',
        type: 'success',
        icon: {
          class: 'fa-check-circle',
          type: 'fa'
        }
      }
    }
  ];
}
