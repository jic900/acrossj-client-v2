/**
 * Created by LAE84266 on 11/08/2017.
 */

import { IComponent, IElement } from 'app/config/interfaces';

export interface IAuth {
  signin: IElement;
  signup: IElement;
  verifyEmail: IElement;
  sendVerifyEmail: IElement;
  forgotPassword: IElement;
  resetPassword: IElement;
}

export class AuthConfig implements IComponent {
  elements: IElement[] = [
    {
      name: 'signin',
      type: 'label',
      display: 'AUTH.SIGNIN.LABEL'
    },
    {
      name: 'signup',
      type: 'label',
      display: 'AUTH.SIGNUP.LABEL'
    },
    {
      name: 'verifyEmail',
      type: 'label',
      display: 'AUTH.VERIFY_EMAIL.LABEL'
    },
    {
      name: 'sendVerifyEmail',
      type: 'label',
      display: 'AUTH.SEND_VERIFY_EMAIL.LABEL'
    },
    {
      name: 'forgotPassword',
      type: 'label',
      display: 'AUTH.FORGOT_PASSWORD.LABEL'
    },
    {
      name: 'resetPassword',
      type: 'label',
      display: 'AUTH.RESET_PASSWORD.LABEL'
    }
  ];
}
