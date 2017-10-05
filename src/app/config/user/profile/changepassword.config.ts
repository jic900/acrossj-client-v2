/**
 * Created by LAE84266 on 11/08/2017.
 */

import { ValidationUtil } from 'app/shared/util/validation-util';
import {
  IForm,
  IElement,
  IInputElement,
  ILinkElement,
  IValidator,
  IMessageElement
} from 'app/config/interfaces';

export interface IChangePassword {
  oldPassword: IInputElement;
  password: IInputElement;
  confirmPassword: IInputElement;
  showPassword: IElement;
  submitButton: IElement;
  backLink: ILinkElement;
}

export interface IChangePasswordMessage {
  success: IMessageElement;
  invalidPassword: IMessageElement;
  samePassword: IMessageElement;
}

export class ChangePasswordConfig implements IForm {
  name = 'USER.PROFILE.CHANGE_PASSWORD.LABEL';
  elements: [IInputElement, IInputElement, IInputElement, IElement, IElement, ILinkElement] = [
    {
      name: 'oldPassword',
      type: 'input',
      placeHolder: 'USER.PROFILE.CHANGE_PASSWORD.OLD_PASSWORD',
      validators: [
        {
          name: 'required',
          type: 'builtin',
          error: 'ERRORS.VALIDATION.USER.OLD_PASSWORD.REQUIRED'
        },
        {
          name: 'minlength',
          type: 'builtin',
          value: 4,
          error: 'ERRORS.VALIDATION.USER.OLD_PASSWORD.MINLENGTH'
        }
      ]
    },
    {
      name: 'password',
      type: 'input',
      placeHolder: 'USER.PROFILE.CHANGE_PASSWORD.PASSWORD',
      validators: [
        {
          name: 'required',
          type: 'builtin',
          error: 'ERRORS.VALIDATION.USER.PASSWORD.REQUIRED'
        },
        {
          name: 'minlength',
          type: 'builtin',
          value: 4,
          error: 'ERRORS.VALIDATION.USER.PASSWORD.MINLENGTH'
        }
      ]
    },
    {
      name: 'confirmPassword',
      type: 'input',
      placeHolder: 'USER.PROFILE.CHANGE_PASSWORD.CONFIRM_PASSWORD',
      validators: [
        {
          name: 'required',
          type: 'builtin',
          error: 'ERRORS.VALIDATION.USER.CONFIRM_PASSWORD.REQUIRED'
        },
        {
          name: 'minlength',
          type: 'builtin',
          value: 4,
          error: 'ERRORS.VALIDATION.USER.CONFIRM_PASSWORD.MINLENGTH'
        }
      ]
    },
    {
      name: 'showPassword',
      type: 'checkbox',
      display: 'USER.PROFILE.CHANGE_PASSWORD.SHOW_PASSWORD'
    },
    {
      name: 'submitButton',
      type: 'button',
      display: 'USER.PROFILE.CHANGE_PASSWORD.BTN_LABEL'
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
    name: 'passwordMatch',
    type: 'custom',
    error: 'ERRORS.VALIDATION.USER.PASSWORD_MATCH',
    validateFunc: ValidationUtil.passwordMatch
  };

  messages: IMessageElement[] = [
    {
      name: 'success',
      message: {
        display: 'MESSAGES.USER.PROFILE.CHANGE_PASSWORD.SUCCESS',
        type: 'success',
        icon: {
          class: 'fa-check-circle',
          type: 'fa'
        }
      }
    },
    {
      name: 'invalidPassword',
      message: {
        display: 'MESSAGES.USER.PROFILE.CHANGE_PASSWORD.INVALID_PASSWORD',
        type: 'error',
        icon: {
          class: 'fa-times-circle',
          type: 'fa'
        }
      }
    },
    {
      name: 'samePassword',
      message: {
        display: 'MESSAGES.USER.PROFILE.CHANGE_PASSWORD.SAME_PASSWORD',
        type: 'error',
        icon: {
          class: 'fa-times-circle',
          type: 'fa'
        }
      }
    }
  ];
}
