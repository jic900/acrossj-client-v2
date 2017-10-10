/**
 * Created by LAE84266 on 11/08/2017.
 */

import {
  IForm,
  IElement,
  ILinkElement,
  IMessageElement,
  IValidator
} from 'app/config/interfaces';
import { ValidationUtil } from 'app/shared/util/validation-util';

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

  validator: IValidator = {
    name: 'fieldsTouched',
    type: 'custom',
    error: 'ERRORS.VALIDATION.SHARED.FIELDS_TOUCHED',
    validateFunc: ValidationUtil.fieldsTouched
  };

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
