/**
 * Created by LAE84266 on 11/08/2017.
 */

import {
  IForm,
  IElement,
  IInputElement,
  IValidator,
  IMessageElement
} from 'app/config/interfaces';

export interface IResetPassword {
  username: IInputElement;
  password: IInputElement;
  confirmPassword: IInputElement;
  showPassword: IElement;
  submitButton: IElement;
}

export interface IResetPasswordMessage {
  success: IMessageElement;
  invalidToken: IMessageElement;
}

export class ResetPasswordConfig implements IForm {

  elements: [IInputElement, IInputElement, IInputElement, IElement, IElement] = [
    {
      name: 'username',
      type: 'input',
      placeHolder: 'AUTH.RESET_PASSWORD.USERNAME',
      readOnly: true
    },
    {
      name: 'password',
      type: 'input',
      placeHolder: 'AUTH.RESET_PASSWORD.PASSWORD',
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
      placeHolder: 'AUTH.RESET_PASSWORD.CONFIRM_PASSWORD',
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
      display: 'AUTH.RESET_PASSWORD.SHOW_PASSWORD'
    },
    {
      name: 'submitButton',
      type: 'button',
      display: 'AUTH.RESET_PASSWORD.BTN_LABEL'
    }
  ];

  validator: IValidator = {
    name: 'passwordMatch',
    type: 'custom',
    error: 'ERRORS.VALIDATION.USER.PASSWORD_MATCH'
  };

  messages: IMessageElement[] = [
    {
      name: 'success',
      message: {
        display: 'MESSAGES.AUTH.RESET_PASSWORD.SUCCESS',
        type: 'success',
        icon: {
          class: 'fa-check-circle',
          type: 'fa'
        }
      },
      navLink: {
        name: 'backSignIn',
        display: 'AUTH.RESET_PASSWORD.BACK_SIGNIN',
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
      name: 'invalidToken',
      message: {
        display: 'MESSAGES.AUTH.RESET_PASSWORD.INVALID_TOKEN',
        type: 'error',
        icon: {
          class: 'fa-times-circle',
          type: 'fa'
        }
      },
      link: {
        name: 'sendEmail',
        display: 'AUTH.RESET_PASSWORD.SEND_EMAIL',
        link: {
          path: '/auth',
          param: 'forgotpassword'
        }
      }
    }
  ];
}
