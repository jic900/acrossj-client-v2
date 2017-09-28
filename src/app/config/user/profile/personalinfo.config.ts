/**
 * Created by LAE84266 on 11/08/2017.
 */

import {
  IForm,
  IElement,
  IInputElement,
  IDatePickerElement,
  ILinkElement,
  IListElement,
  IMessageElement
} from 'app/config/interfaces';

export interface IPersonalInfo {
  fullname: IInputElement;
  username: IInputElement;
  email: IInputElement;
  gender: IListElement;
  birthday: IDatePickerElement;
  address: IInputElement;
  postcode: IInputElement;
  phonenumber: IInputElement;
  saveButton: IElement;
  backLink: ILinkElement;
}

export interface IPersonalInfoMessage {
  success: IMessageElement;
}

export class PersonalInfoConfig implements IForm {

  title = 'USER.PROFILE.PERSONAL_INFO.LABEL';
  elements: [IInputElement, IInputElement, IInputElement, IListElement, IDatePickerElement, IInputElement,
    IInputElement, IInputElement, IElement, ILinkElement] = [
    {
      name: 'fullname',
      type: 'input',
      placeHolder: 'USER.PROFILE.PERSONAL_INFO.FULLNAME'
    },
    {
      name: 'username',
      type: 'input',
      placeHolder: 'USER.PROFILE.PERSONAL_INFO.USERNAME'
    },
    {
      name: 'email',
      type: 'input',
      placeHolder: 'USER.PROFILE.PERSONAL_INFO.EMAIL'
    },
    {
      name: 'gender',
      type: 'select',
      placeHolder: 'USER.PROFILE.PERSONAL_INFO.GENDER.LABEL',
      list: [
        {
          name: 'male',
          display: 'USER.PROFILE.PERSONAL_INFO.GENDER.MALE'
        },
        {
          name: 'female',
          display: 'USER.PROFILE.PERSONAL_INFO.GENDER.FEMALE'
        }
      ]
    },
    {
      name: 'birthday',
      type: 'datepicker',
      placeHolder: 'USER.PROFILE.PERSONAL_INFO.BIRTHDAY.LABEL',
      hint: 'USER.PROFILE.PERSONAL_INFO.BIRTHDAY.DATE_FORMAT_HINT'
    },
    {
      name: 'address',
      type: 'input',
      placeHolder: 'USER.PROFILE.PERSONAL_INFO.ADDRESS'
    },
    {
      name: 'postcode',
      type: 'input',
      placeHolder: 'USER.PROFILE.PERSONAL_INFO.POSTCODE'
    },
    {
      name: 'phonenumber',
      type: 'input',
      placeHolder: 'USER.PROFILE.PERSONAL_INFO.PHONE_NUMBER'
    },
    {
      name: 'saveButton',
      type: 'button',
      display: 'USER.PROFILE.PERSONAL_INFO.SAVEBTN_LABEL'
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
}
