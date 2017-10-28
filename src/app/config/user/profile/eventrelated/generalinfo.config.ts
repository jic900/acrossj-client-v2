import {
  IForm,
  IElement,
  ILinkElement,
  IMessageElement,
  IInputElement,
  ISelectElement,
  ISimpleSelectElement,
  SelectMode,
  SelectLayout
} from 'app/config/interfaces';

export interface IGeneralInfo {
  language: ISelectElement;
  height: IInputElement;
  weight: IInputElement;
  organizational: ISimpleSelectElement;
  saveButton: IElement;
  backLink: ILinkElement;
}

export interface IGeneralInfoMessage {
  success: IMessageElement;
}

export class GeneralInfoConfig implements IForm {

  name = 'USER.PROFILE.EVENT_RELATED.GENERAL.LABEL';
  elements: [ISelectElement, IInputElement, IInputElement, ISimpleSelectElement, IElement, ILinkElement] = [
    {
      name: 'language',
      type: 'select',
      placeHolder: 'USER.PROFILE.EVENT_RELATED.GENERAL.LANGUAGE.LABEL',
      hint: 'USER.PROFILE.EVENT_RELATED.GENERAL.LANGUAGE.HINT',
      mode: SelectMode.MULTI,
      chipOptions: {
        selectable: true,
        removable: true,
        addOnBlur: true
      },
      selectList: [
        {
          name: 'english',
          display: 'USER.PROFILE.EVENT_RELATED.GENERAL.LANGUAGE.ENGLISH',
          value: false
        },
        {
          name: 'chinese',
          display: 'USER.PROFILE.EVENT_RELATED.GENERAL.LANGUAGE.CHINESE',
          value: false
        },
        {
          name: 'japanese',
          display: 'USER.PROFILE.EVENT_RELATED.GENERAL.LANGUAGE.JAPANESE',
          value: false
        }
      ]
    },
    {
      name: 'height',
      type: 'input',
      placeHolder: 'USER.PROFILE.EVENT_RELATED.GENERAL.HEIGHT.LABEL'
    },
    {
      name: 'weight',
      type: 'input',
      placeHolder: 'USER.PROFILE.EVENT_RELATED.GENERAL.WEIGHT.LABEL'
    },
    {
      name: 'organizational',
      type: 'select',
      placeHolder: 'USER.PROFILE.EVENT_RELATED.GENERAL.ORGANIZATIONAL.LABEL',
      mode: SelectMode.MULTI,
      layout: SelectLayout.COLUMN,
      selectList: [
        {
          name: 'skill',
          display: 'USER.PROFILE.EVENT_RELATED.GENERAL.ORGANIZATIONAL.SKILL',
          value: false
        },
        {
          name: 'motivation',
          display: 'USER.PROFILE.EVENT_RELATED.GENERAL.ORGANIZATIONAL.MOTIVATION',
          value: false
        }
      ]
    },
    {
      name: 'saveButton',
      type: 'button',
      display: 'USER.PROFILE.EVENT_RELATED.GENERAL.BTN_LABEL'
    },
    {
      name: 'backLink',
      display: '',
      icon: {
        class: 'fa-angle-left',
        type: 'fa'
      },
      link: {
        path: '/user/profile'
      }
    },
  ];

  messages: IMessageElement[] = [
    {
      name: 'success',
      message: {
        display: 'MESSAGES.USER.PROFILE.EVENT_RELATED.GENERAL.SUCCESS',
        type: 'success',
        icon: {
          class: 'fa-check-circle',
          type: 'fa'
        }
      }
    }
  ];
}
