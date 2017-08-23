/**
 * Created by LAE84266 on 11/08/2017.
 */

import { IForm } from 'app/config/interfaces/form.interface';
import { IElement } from 'app/config/interfaces/element.interface';
import { IInputElement } from 'app/config/interfaces/input-element.interface';
import { IMessageElement } from 'app/config/interfaces/message-element';

export interface ISendVerifyEmail {
  username: IInputElement;
  submitButton: IElement;
}

export interface ISendVerifyEmailMessage {
  hint: IMessageElement;
  success: IMessageElement;
  invalidUsername: IMessageElement;
}

export class SendVerifyEmailConfig implements IForm {

  elements: [IInputElement, IElement] = [
    {
      name: 'username',
      type: 'input',
      placeHolder: 'AUTH.SEND_VERIFY_EMAIL.USERNAME',
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
      display: 'AUTH.SEND_VERIFY_EMAIL.BTN_LABEL'
    }
  ];

  messages: IMessageElement[] = [
    {
      name: 'hint',
      message: {
        display: 'MESSAGES.AUTH.SEND_VERIFY_EMAIL.HINT'
      }
    },
    {
      name: 'success',
      message: {
        display: 'MESSAGES.AUTH.SEND_VERIFY_EMAIL.SUCCESS',
        type: 'success',
        icon: {
          class: 'fa-check-circle',
          type: 'fa'
        }
      },
      navLink: {
        name: 'backSignIn',
        display: 'AUTH.SEND_VERIFY_EMAIL.BACK_SIGNIN',
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
        display: 'MESSAGES.AUTH.SEND_VERIFY_EMAIL.INVALID_USERNAME',
        type: 'error',
        icon: {
          class: 'fa-times-circle',
          type: 'fa'
        }
      }
    }
  ];
}

