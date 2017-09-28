/**
 * Created by LAE84266 on 11/08/2017.
 */

import { IComponent, IMessageElement } from 'app/config/interfaces';

export interface IVerifyEmailMessage {
  inProgress: IMessageElement;
  success: IMessageElement;
  alreadyVerified: IMessageElement;
  invalidToken: IMessageElement;
}

export class VerifyEmailConfig implements IComponent {

  elements = [];

  messages: IMessageElement[] = [
    {
      name: 'inProgress',
      message: {
        display: 'MESSAGES.AUTH.VERIFY_EMAIL.INPROGRESS'
      },
      navLink: {
        name: 'backSignIn',
        display: 'AUTH.VERIFY_EMAIL.BACK_SIGNIN',
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
      name: 'success',
      message: {
        display: 'MESSAGES.AUTH.VERIFY_EMAIL.SUCCESS',
        type: 'success',
        icon: {
          class: 'fa-check-circle',
          type: 'fa'
        }
      },
      navLink: {
        name: 'backSignIn',
        display: 'AUTH.VERIFY_EMAIL.BACK_SIGNIN',
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
      name: 'alreadyVerified',
      message: {
        display: 'MESSAGES.AUTH.VERIFY_EMAIL.ALREADY_VERIFIED',
        type: 'warning',
        icon: {
          class: 'fa-exclamation-circle',
          type: 'fa'
        }
      },
      navLink: {
        name: 'backSignIn',
        display: 'AUTH.VERIFY_EMAIL.BACK_SIGNIN',
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
        display: 'MESSAGES.AUTH.VERIFY_EMAIL.INVALID_TOKEN',
        type: 'error',
        icon: {
          class: 'fa-times-circle',
          type: 'fa'
        }
      },
      link: {
        name: 'sendVerifyEmail',
        display: 'AUTH.VERIFY_EMAIL.SEND_EMAIL',
        link: {
          path: '/auth',
          param: 'sendverifyemail'
        }
      },
      navLink: {
        name: 'backSignIn',
        display: 'AUTH.VERIFY_EMAIL.BACK_SIGNIN',
        icon: {
          class: 'fa-angle-left',
          type: 'fa'
        },
        link: {
          path: '/auth',
          param: 'signin'
        }
      }
    }
  ];
}
