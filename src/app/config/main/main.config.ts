import { IComponent } from '../interfaces/component.interface';
import { IElement } from '../interfaces/element.interface';
import { IListElement } from '../interfaces/list-element.interface';
import { ILinkElement } from '../interfaces/link-element.interface';

export type IMainConfig = IComponent;
export type ISideNavConfig = IComponent;
export type IHeaderConfig = IComponent;
export type IFooterConfig = IComponent;

export interface IMain {
  sideNav: ISideNavConfig;
  header: IHeaderConfig;
  footer: IFooterConfig;
}

export interface ISideNav {
  logo: IElement;
  appMenu: IListElement;
  userMenu: IListElement;
}

export interface IHeader {
  toggleButton: IElement;
  logo: ILinkElement;
  searchLink: ILinkElement;
  languageMenu: IListElement;
  userMenu: IListElement;
  userMenuAuthed: IListElement;
}

export interface IFooter {
  content: IElement;
}

export class MainConfig implements IMainConfig {
  elements: [ISideNavConfig, IHeaderConfig, IFooterConfig] = [
    new SideNavConfig(),
    new HeaderConfig(),
    new FooterConfig()
  ];
}

class SideNavConfig implements ISideNavConfig {
  title = 'sideNav';
  elements: [IElement, IListElement, IListElement] = [
    {
      name: 'logo',
      type: 'icon',
      icon: {class: 'assets:logo_iconed', type: 'svg'}
    },
    {
      name: 'appMenu',
      type: 'list',
      list: [
        {
          name: 'aboutUs',
          type: 'link',
          display: 'MAIN.SIDE_NAV.ABOUT_US',
          icon: {class: 'info', type: 'md'},
          link: {path: '/aboutus'}
        },
        {
          name: 'createEvent',
          type: 'link',
          display: 'MAIN.SIDE_NAV.CREATE_EVENT',
          icon: {class: 'assets:fa-calendar-plus-o', type: 'svg'},
          link: {path: '/createevent'}
        },
        {
          name: 'help',
          type: 'link',
          display: 'MAIN.SIDE_NAV.HELP',
          icon: {class: 'help', type: 'md'},
          link: {path: '/help'}
        },
        {
          name: 'language',
          type: 'list',
          display: 'MAIN.SIDE_NAV.LANGUAGE.LABEL',
          icon: {class: 'language', type: 'md'},
          list: [
            {
              name: 'en',
              display: 'MAIN.SIDE_NAV.LANGUAGE.MENU.ENGLISH',
              icon: {class: 'flag-icon-us', type: 'flag-icon'}
            },
            {
              name: 'ja',
              display: 'MAIN.SIDE_NAV.LANGUAGE.MENU.JAPANESE',
              icon: {class: 'flag-icon-jp', type: 'flag-icon'}
            },
            {
              name: 'zh',
              display: 'MAIN.SIDE_NAV.LANGUAGE.MENU.CHINESE',
              icon: {class: 'flag-icon-cn', type: 'flag-icon'}
            }
          ]
        }
      ]
    },
    {
      name: 'userMenu',
      list: [
        {
          name: 'profile',
          type: 'link',
          display: 'MAIN.SIDE_NAV.USER.MENU.PROFILE',
          icon: {class: 'fa-user-o', type: 'fa'},
          link: {path: '/user/profile'}
        },
        {
          name: 'events',
          type: 'link',
          display: 'MAIN.SIDE_NAV.USER.MENU.EVENTS',
          icon: {class: 'fa-calendar', type: 'fa'},
          link: {path: '/user/events'}
        },
        {
          name: 'messages',
          type: 'link',
          display: 'MAIN.SIDE_NAV.USER.MENU.MESSAGES',
          icon: {class: 'fa-envelope-o', type: 'fa'},
          link: {path: '/user/messages'}
        },
        {
          name: 'uploads',
          type: 'link',
          display: 'MAIN.SIDE_NAV.USER.MENU.UPLOADS',
          icon: {class: 'fa-upload', type: 'fa'},
          link: {path: '/user/uploads'}
        },
        {
          name: 'signout',
          type: 'link',
          display: 'MAIN.SIDE_NAV.USER.MENU.SIGNOUT',
          icon: {class: 'fa-sign-out', type: 'fa'}
        }
      ]
    }
  ];
}

class HeaderConfig implements IHeaderConfig {
  title = 'header';
  elements: [IElement, ILinkElement, IElement, IListElement, IListElement] = [
    {
      name: 'toggleButton',
      type: 'button',
      icon: {class: 'menu', type: 'md'}
    },
    {
      name: 'logo',
      type: 'link',
      icon: {class: 'assets:logo', type: 'svg'},
      link: {path: '/'}
    },
    {
      name: 'searchLink',
      type: 'button',
      icon: {class: 'search', type: 'md'}
    },
    {
      name: 'languageMenu',
      type: 'list',
      icon: {class: 'language', type: 'md'},
      tooltip: 'MAIN.HEADER.LANGUAGE.TOOLTIP',
      list: [
        {
          name: 'en',
          display: 'MAIN.HEADER.LANGUAGE.MENU.ENGLISH',
          icon: {class: 'flag-icon-us', type: 'flag-icon'}
        },
        {
          name: 'ja',
          display: 'MAIN.HEADER.LANGUAGE.MENU.JAPANESE',
          icon: {class: 'flag-icon-jp', type: 'flag-icon'}
        },
        {
          name: 'zh',
          display: 'MAIN.HEADER.LANGUAGE.MENU.CHINESE',
          icon: {class: 'flag-icon-cn', type: 'flag-icon'}
        }
      ]
    },
    {
      name: 'userMenu',
      type: 'list',
      icon: {class: 'account_circle', type: 'md'},
      tooltip: 'MAIN.HEADER.USER.TOOLTIP',
      list: [
        {
          name: 'signin',
          display: 'MAIN.HEADER.USER.MENU.SIGNIN',
          icon: {class: 'fa-sign-in', type: 'fa'},
          link: {path: '/auth', param: 'signin'}
        },
        {
          name: 'signup',
          display: 'MAIN.HEADER.USER.MENU.SIGNUP',
          icon: {class: 'fa-user-plus', type: 'fa'},
          link: {path: '/auth', param: 'signup'}
        }
      ]
    },
    {
      name: 'userMenuAuthed',
      type: 'list',
      icon: {class: 'account_circle', type: 'md'},
      list: [
        {
          name: 'signout',
          display: 'MAIN.HEADER.USER_AUTHED.MENU.SIGNOUT',
          icon: {class: 'fa-sign-out', type: 'fa'}
        }
      ]
    }
  ];
}

class FooterConfig implements IFooterConfig {
  title = 'footer';
  elements: [IElement] = [
    {
      name: 'content',
      display: 'MAIN.FOOTER.CONTENT'
    }
  ];
}
