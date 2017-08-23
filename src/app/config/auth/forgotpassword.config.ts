/**
 * Created by LAE84266 on 11/08/2017.
 */

import { IForm } from 'app/config/interfaces/form.interface';
import { IElement } from 'app/config/interfaces/element.interface';
import { IInputElement } from 'app/config/interfaces/input-element.interface';
import { IMessageElement } from 'app/config/interfaces/message-element';

export interface IForgotPassword {
  username: IInputElement;
  submitButton: IElement;
}

export interface IForgotPasswordMessage {
  hint: IMessageElement;
  success: IMessageElement;
  invalidUsername: IMessageElement;
}

export class ForgotPasswordConfig implements IForm {

  elements: [IInputElement, IElement] = [
    {
      name: 'username',
      type: 'input',
      placeHolder: 'AUTH.FORGOT_PASSWORD.USERNAME',
      validators: [
        {
          name: 'required',
          type: 'builtin',
          error: 'ERRORS.VALIDATION.USER.USERNAME.REQUIRED'
        },
        {
          name: 'minlength',
          type: 'builtin',
          value: 2,
          error: 'ERRORS.VALIDATION.USER.USERNAME.MINLENGTH'
        },
        {
          name: 'pattern',
          type: 'builtin',
          value: /^[^~!#$%^&*()+`{}|\[\]\\:";'<>?,\/]*$/,
          error: 'ERRORS.VALIDATION.USER.USERNAME.PATTERN'
        }
      ]
    },
    {
      name: 'submitButton',
      type: 'button',
      display: 'AUTH.FORGOT_PASSWORD.BTN_LABEL'
    }
  ];

  messages: IMessageElement[] = [
    {
      name: 'hint',
      message: {
        display: 'MESSAGES.AUTH.FORGOT_PASSWORD.HINT'
      }
    },
    {
      name: 'success',
      message: {
        display: 'MESSAGES.AUTH.FORGOT_PASSWORD.SUCCESS',
        type: 'success',
        icon: {
          class: 'fa-check-circle',
          type: 'fa'
        }
      },
      navLink: {
        name: 'backSignIn',
        display: 'AUTH.FORGOT_PASSWORD.BACK_SIGNIN',
        icon: {
          class: 'fa-angle-left',
          type: 'fa'
        },
        link: {
          path: '/auth',
          param: 'signin'
        }
      }
    },
    {
      name: 'invalidUsername',
      message: {
        display: 'MESSAGES.AUTH.FORGOT_PASSWORD.INVALID_USERNAME',
        type: 'error',
        icon: {
          class: 'fa-times-circle',
          type: 'fa'
        }
      }
    }
  ];
}
