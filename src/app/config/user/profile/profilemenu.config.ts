/**
 * Created by LAE84266 on 12/08/2017.
 */

import {
  IComponent,
  IListElement,
  IElement
} from 'app/config/interfaces';

export interface IProfileMenu {
  title: IElement;
  menuList: IListElement;
}

export class ProfileMenuConfig implements IComponent {
  elements: [IElement, IListElement] = [
    {
      name: 'title',
      type: 'label',
      display: 'USER.PROFILE.LABEL'
    },
    {
      name: 'menuList',
      type: 'list',
      list: [
        {
          name: 'personalInfo',
          type: 'link',
          display: 'USER.PROFILE.PERSONAL_INFO.LABEL',
          icon: {
            class: 'fa-user',
            type: 'fa'
          },
          link: {
            path: '/user/profile/personalinfo'
          },
          navIcon: {
            class: 'fa-angle-right',
            type: 'fa'
          }
        },
        {
          name: 'changePassword',
          type: 'link',
          display: 'USER.PROFILE.CHANGE_PASSWORD.LABEL',
          icon: {
            class: 'fa-info-circle',
            type: 'fa'
          },
          link: {
            path: '/user/profile/changepassword'
          },
          navIcon: {
            class: 'fa-angle-right',
            type: 'fa'
          }
        },
        {
          name: 'eventRelated',
          type: 'link',
          display: 'USER.PROFILE.EVENT_RELATED.LABEL',
          icon: {
            class: 'fa-info-circle',
            type: 'fa'
          },
          link: {
            path: '/user/profile/eventrelated/menu'
          },
          navIcon: {
            class: 'fa-angle-right',
            type: 'fa'
          }
        },
        {
          name: 'transportationinfo',
          type: 'link',
          display: 'USER.PROFILE.TRANSPORTATION_INFO.LABEL',
          icon: {
            class: 'fa-car',
            type: 'fa'
          },
          link: {
            path: '/user/profile/transportation'
          },
          navIcon: {
            class: 'fa-angle-right',
            type: 'fa'
          }
        },
        {
          name: 'groupInfo',
          type: 'link',
          display: 'USER.PROFILE.GROUP_INFO.LABEL',
          icon: {
            class: 'fa-info-circle',
            type: 'fa'
          },
          link: {
            path: '/user/profile/groupinfo'
          },
          navIcon: {
            class: 'fa-angle-right',
            type: 'fa'
          }
        }
      ]
    }
  ];
}
