/**
 * Created by LAE84266 on 11/08/2017.
 */

import {
  IForm,
  IElement,
  IInputElement,
  IDatePickerElement,
  ILinkElement,
  IMessageElement,
  IMultiSelectElement
} from 'app/config/interfaces';

export interface IPersonalInfo {
  fullname: IInputElement;
  username: IInputElement;
  email: IInputElement;
  gender: IMultiSelectElement;
  gender2: IMultiSelectElement;
  birthday: IDatePickerElement;
  dateRangePicker: IDatePickerElement;
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

  name = 'USER.PROFILE.PERSONAL_INFO.LABEL';
  elements: [IInputElement, IInputElement, IInputElement, IMultiSelectElement, IMultiSelectElement, IDatePickerElement, IDatePickerElement,
    IInputElement, IInputElement, IInputElement, IElement, ILinkElement] = [
    {
      name: 'fullname',
      type: 'input',
      placeHolder: 'USER.PROFILE.PERSONAL_INFO.FULLNAME'
    },
    {
      name: 'username',
      type: 'input',
      placeHolder: 'USER.PROFILE.PERSONAL_INFO.USERNAME',
      readOnly: true
    },
    {
      name: 'email',
      type: 'input',
      placeHolder: 'USER.PROFILE.PERSONAL_INFO.EMAIL',
      readOnly: true
    },
    {
      name: 'gender',
      type: 'select',
      placeHolder: 'USER.PROFILE.PERSONAL_INFO.GENDER.LABEL',
      hint: 'Enter new value if not listed',
      toggleButton: {
        name: 'toggleButton',
        type: 'button',
        icon: {class: 'keyboard_arrow_down', type: 'md'}
      },
      chipOptions: {
        selectable: true,
        removable: true,
        addOnBlur: true
      },
      selectList: [
        {
          name: 'male',
          display: 'USER.PROFILE.PERSONAL_INFO.GENDER.MALE',
          value: false
        },
        {
          name: 'female',
          display: 'USER.PROFILE.PERSONAL_INFO.GENDER.FEMALE',
          value: false
        }
      ]
    },
    {
      name: 'gender2',
      type: 'select',
      placeHolder: 'USER.PROFILE.PERSONAL_INFO.GENDER.LABEL',
      readOnly: true,
      toggleButton: {
        name: 'toggleButton',
        type: 'button',
        icon: {class: 'keyboard_arrow_down', type: 'md'}
      },
      chipOptions: {
        selectable: true,
        removable: true,
        addOnBlur: true
      },
      selectList: [
        {
          name: 'male',
          display: 'USER.PROFILE.PERSONAL_INFO.GENDER.MALE',
          value: false
        },
        {
          name: 'female',
          display: 'USER.PROFILE.PERSONAL_INFO.GENDER.FEMALE',
          value: false
        }
      ]
    },
    // {
    //   name: 'gender',
    //   type: 'select',
    //   placeHolder: 'USER.PROFILE.PERSONAL_INFO.GENDER.LABEL',
    //   list: [
    //     {
    //       name: 'male',
    //       display: 'USER.PROFILE.PERSONAL_INFO.GENDER.MALE'
    //     },
    //     {
    //       name: 'female',
    //       display: 'USER.PROFILE.PERSONAL_INFO.GENDER.FEMALE'
    //     }
    //   ]
    // },
    {
      name: 'birthday',
      type: 'datepicker',
      placeHolder: 'USER.PROFILE.PERSONAL_INFO.BIRTHDAY.LABEL',
      hint: 'USER.PROFILE.PERSONAL_INFO.BIRTHDAY.DATE_FORMAT_HINT'
    },
    {
      name: 'dateRangePicker',
      type: 'datepicker',
      placeHolder: 'MAIN.SEARCH_MENU.DATE_RANGE_PICKER.LABEL',
      readOnly: true
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
      display: 'USER.PROFILE.PERSONAL_INFO.BTN_LABEL'
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
        display: 'MESSAGES.USER.PROFILE.PERSONAL_INFO.SUCCESS',
        type: 'success',
        icon: {
          class: 'fa-check-circle',
          type: 'fa'
        }
      }
    }
  ];
}
