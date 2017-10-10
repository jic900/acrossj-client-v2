import {
  IForm,
  IElement,
  ILinkElement,
  IMessageElement,
  IValidator
} from 'app/config/interfaces';
import { ValidationUtil } from 'app/shared/util/validation-util';

export interface IBicyclingInfo {
  saveButton: IElement;
  backLink: ILinkElement;
}

export interface IBicyclingInfoMessage {
  success: IMessageElement;
}

export class BicyclingInfoConfig implements IForm {

  name = 'USER.PROFILE.EVENT_RELATED.BICYCLING.LABEL';
  elements: [IElement, ILinkElement] = [
    {
      name: 'saveButton',
      type: 'button',
      display: 'USER.PROFILE.EVENT_RELATED.BICYCLING.BTN_LABEL'
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
        display: 'MESSAGES.USER.PROFILE.EVENT_RELATED.BICYCLING.SUCCESS',
        type: 'success',
        icon: {
          class: 'fa-check-circle',
          type: 'fa'
        }
      }
    }
  ];
}
