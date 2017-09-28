/**
 * Created by LAE84266 on 11/08/2017.
 */

import {
  IForm,
  IElement,
  ILinkElement,
  IInputElement,
  IMessageElement
} from 'app/config/interfaces';

export interface ISignIn {
  username: IInputElement;
  password: IInputElement;
  showPassword: IElement;
  forgotPassword: ILinkElement;
  submitButton: IElement;
}

export interface ISignInMessage {
  success: IMessageElement;
  invalidUsername: IMessageElement;
  invalidPassword: IMessageElement;
  notVerified: IMessageElement;
}

export class SignInConfig implements IForm {

  elements: [IInputElement, IInputElement, IElement, ILinkElement, IElement] = [
    {
      name: 'username',
      type: 'input',
      placeHolder: 'AUTH.SIGNIN.USERNAME',
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
      name: 'password',
      type: 'input',
      placeHolder: 'AUTH.SIGNIN.PASSWORD',
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
      name: 'showPassword',
      type: 'checkbox',
      display: 'AUTH.SIGNIN.SHOW_PASSWORD'
    },
    {
      name: 'forgotPassword',
      type: 'link',
      display: 'AUTH.SIGNIN.FORGOT_PASSWORD',
      link: {
        path: '/auth',
        param: 'forgotpassword'
      }
    },
    {
      name: 'submitButton',
      type: 'button',
      display: 'AUTH.SIGNIN.BTN_LABEL'
    }
  ];

  messages: IMessageElement[] = [
    {
      name: 'success',
      message: {
        display: 'MESSAGES.AUTH.SIGNIN.SUCCESS',
        type: 'success',
        icon: {
          class: 'fa-check-circle',
          type: 'fa'
        }
      }
    },
    {
      name: 'invalidUsername',
      message: {
        display: 'MESSAGES.AUTH.SIGNIN.INVALID_USERNAME',
        type: 'error',
        icon: {
          class: 'fa-times-circle',
          type: 'fa'
        }
      }
    },
    {
      name: 'invalidPassword',
      message: {
        display: 'MESSAGES.AUTH.SIGNIN.INVALID_PASSWORD',
        type: 'error',
        icon: {
          class: 'fa-times-circle',
          type: 'fa'
        }
      }
    },
    {
      name: 'notVerified',
      message: {
        display: 'MESSAGES.AUTH.SIGNIN.NOT_VERIFIED',
        type: 'error',
        icon: {
          class: 'fa-times-circle',
          type: 'fa'
        }
        },
      link: {
        name: 'sendVerifyEmail',
        display: 'AUTH.SIGNIN.SEND_EMAIL',
        link: {
          path: '/auth',
          param: 'sendverifyemail'
        }
      }
    }
  ];
}
