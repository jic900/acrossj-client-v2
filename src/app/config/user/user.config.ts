/**
 * Created by LAE84266 on 10/08/2017.
 */

import { IComponent, ILinkElement } from 'app/config/interfaces';

export interface IUser {
  dashboard: ILinkElement;
  profile: ILinkElement;
  events: ILinkElement;
  messages: ILinkElement;
  uploads: ILinkElement;
}

export class UserConfig implements IComponent {
  elements: ILinkElement[] = [
    {
      name: 'dashboard',
      type: 'link',
      display: 'USER.DASHBOARD.LABEL',
      link: {
        path: '/user/dashboard'
      }
    },
    {
      name: 'profile',
      type: 'link',
      display: 'USER.PROFILE.LABEL',
      link: {
        path: '/user/profile'
      }
    },
    {
      name: 'events',
      type: 'link',
      display: 'USER.EVENTS.LABEL',
      link: {
        path: '/user/events'
      }
    },
    {
      name: 'messages',
      type: 'link',
      display: 'USER.MESSAGES.LABEL',
      link: {
        path: '/user/messages'
      }
    },
    {
      name: 'uploads',
      type: 'link',
      display: 'USER.UPLOADS.LABEL',
      link: {
        path: '/user/uploads'
      }
    }
  ];
}
