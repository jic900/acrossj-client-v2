/**
 * Created by LAE84266 on 12/08/2017.
 */

import {
  IComponent,
  IElement,
  IListElement,
  ILinkElement
} from 'app/config/interfaces';

export interface IEventRelatedMenu {
  title: IElement;
  menuList: IListElement;
  backLink: ILinkElement;
}

export class EventRelatedMenuConfig implements IComponent {
  elements: [IElement, IListElement, ILinkElement] = [
    {
      name: 'title',
      type: 'label',
      display: 'USER.PROFILE.EVENT_RELATED.MENU_LABEL'
    },
    {
      name: 'menuList',
      type: 'list',
      list: [
        {
          name: 'general',
          type: 'link',
          display: 'USER.PROFILE.EVENT_RELATED.GENERAL.LABEL',
          icon: {
            class: 'fa-info-circle',
            type: 'fa'
          },
          link: {
            path: '/user/profile/eventrelated/general'
          },
          navIconClass: 'fa-angle-right'
        },
        {
          name: 'running',
          type: 'link',
          display: 'USER.PROFILE.EVENT_RELATED.RUNNING.LABEL',
          icon: {
            class: 'fa-info-circle',
            type: 'fa'
          },
          link: {
            path: '/user/profile/eventrelated/running'
          },
          navIconClass: 'fa-angle-right'
        },
        {
          name: 'skii',
          type: 'link',
          display: 'USER.PROFILE.EVENT_RELATED.SKII.LABEL',
          icon: {
            class: 'fa-info-circle',
            type: 'fa'
          },
          link: {
            path: '/user/profile/eventrelated/skii'
          },
          navIconClass: 'fa-angle-right'
        },
        {
          name: 'hiking',
          type: 'link',
          display: 'USER.PROFILE.EVENT_RELATED.HIKING.LABEL',
          icon: {
            class: 'fa-info-circle',
            type: 'fa'
          },
          link: {
            path: '/user/profile/eventrelated/hiking'
          },
          navIconClass: 'fa-angle-right'
        },
        {
          name: 'camping',
          type: 'link',
          display: 'USER.PROFILE.EVENT_RELATED.CAMPING.LABEL',
          icon: {
            class: 'fa-info-circle',
            type: 'fa'
          },
          link: {
            path: '/user/profile/eventrelated/camping'
          },
          navIconClass: 'fa-angle-right'
        },
        {
          name: 'bicycling',
          type: 'link',
          display: 'USER.PROFILE.EVENT_RELATED.BICYCLING.LABEL',
          icon: {
            class: 'fa-info-circle',
            type: 'fa'
          },
          link: {
            path: '/user/profile/eventrelated/bicycling'
          },
          navIconClass: 'fa-angle-right'
        },
        {
          name: 'others',
          type: 'link',
          display: 'USER.PROFILE.EVENT_RELATED.OTHERS.LABEL',
          icon: {
            class: 'fa-info-circle',
            type: 'fa'
          },
          link: {
            path: '/user/profile/eventrelated/others'
          },
          navIconClass: 'fa-angle-right'
        }
      ]
    },
    {
      name: 'backLink',
      type: 'icon',
      icon: {
        class: 'arrow_back',
        type: 'md'
      },
      link: {
        path: '/user/profile/menu'
      }
    }
  ];
}
