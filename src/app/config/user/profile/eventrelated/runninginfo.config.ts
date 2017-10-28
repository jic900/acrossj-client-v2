import {
  IForm,
  IElement,
  ILinkElement,
  IMessageElement
} from 'app/config/interfaces';
import { ValidationUtil } from 'app/shared/util/validation-util';
import { ISelectElement, ISimpleSelectElement, IInputElement, SelectMode } from 'app/config/interfaces';

export interface IRunningInfo {
  shoeSize: ISelectElement;
  tShirtSize: ISelectElement;
  runnetId: IInputElement;
  marathon: ISimpleSelectElement;
  saveButton: IElement;
  backLink: ILinkElement;
}

export interface IRunningInfoMessage {
  success: IMessageElement;
}

export class RunningInfoConfig implements IForm {

  name = 'USER.PROFILE.EVENT_RELATED.RUNNING.LABEL';
  elements: [ISelectElement, ISelectElement, IInputElement, ISelectElement, IElement, ILinkElement] = [
    {
      name: 'shoeSize',
      type: 'select',
      placeHolder: 'USER.PROFILE.EVENT_RELATED.RUNNING.SHOE_SIZE.LABEL',
      mode: SelectMode.SINGLE,
      chipOptions: {
        selectable: false,
        removable: false,
        addOnBlur: false
      },
      selectList: [
        {
          name: 'us',
          display: 'USER.PROFILE.EVENT_RELATED.RUNNING.SHOE_SIZE.UNIT.US',
          value: null
        },
        {
          name: 'europe',
          display: 'USER.PROFILE.EVENT_RELATED.RUNNING.SHOE_SIZE.UNIT.EUROPE',
          value: null
        },
        {
          name: 'china',
          display: 'USER.PROFILE.EVENT_RELATED.RUNNING.SHOE_SIZE.UNIT.CHINA',
          value: null
        },
        {
          name: 'japan',
          display: 'USER.PROFILE.EVENT_RELATED.RUNNING.SHOE_SIZE.UNIT.JAPAN',
          value: null
        },
        {
          name: 'cm',
          display: 'USER.PROFILE.EVENT_RELATED.RUNNING.SHOE_SIZE.UNIT.CM',
          value: null
        }
      ],
      validators: [
        {
          name: 'validSelectInput',
          type: 'custom',
          error: 'ERRORS.VALIDATION.PROFILE.EVENT_RELATED.RUNNING.SHOE_SIZE_UNIT_REQUIRED',
          validateFunc: ValidationUtil.validSelectInput
        },
        {
          name: 'selectInputPattern',
          type: 'custom',
          value: /^[1-4]?[0-9](\.[0,5])?$/,
          // value: /^\d{1,2}(\.\d)?$/,
          // value: /^\d{1,2}\.?\d?$/,
          error: 'ERRORS.VALIDATION.PROFILE.EVENT_RELATED.RUNNING.INVALID_SHOE_SIZE',
          validateFunc: ValidationUtil.selectInputPattern
        }
      ]
    },
    {
      name: 'tShirtSize',
      type: 'select',
      placeHolder: 'USER.PROFILE.EVENT_RELATED.RUNNING.TSHIRT_SIZE.LABEL',
      mode: SelectMode.SINGLE,
      readOnly: true,
      chipOptions: {
        selectable: false,
        removable: false,
        addOnBlur: false
      },
      selectList: [
        {
          name: 'xxl',
          display: 'USER.PROFILE.EVENT_RELATED.RUNNING.TSHIRT_SIZE.XXL',
          value: 'xxl'
        },
        {
          name: 'xl',
          display: 'USER.PROFILE.EVENT_RELATED.RUNNING.TSHIRT_SIZE.XL',
          value: 'xl'
        },
        {
          name: 'l',
          display: 'USER.PROFILE.EVENT_RELATED.RUNNING.TSHIRT_SIZE.L',
          value: 'l'
        },
        {
          name: 'm',
          display: 'USER.PROFILE.EVENT_RELATED.RUNNING.TSHIRT_SIZE.M',
          value: 'm'
        },
        {
          name: 's',
          display: 'USER.PROFILE.EVENT_RELATED.RUNNING.TSHIRT_SIZE.S',
          value: 's'
        },
        {
          name: 'xs',
          display: 'USER.PROFILE.EVENT_RELATED.RUNNING.TSHIRT_SIZE.XS',
          value: 'xs'
        }
      ]
    },
    {
      name: 'runnetId',
      type: 'input',
      placeHolder: 'USER.PROFILE.EVENT_RELATED.RUNNING.RUNNET_ID.LABEL'
    },
    {
      name: 'marathon',
      type: 'select',
      placeHolder: 'USER.PROFILE.EVENT_RELATED.RUNNING.MARATHON.LABEL',
      mode: SelectMode.MULTI,
      readOnly: true,
      chipOptions: {
        selectable: true,
        removable: true,
        addOnBlur: true
      },
      selectList: [
        {
          name: 'full',
          display: 'USER.PROFILE.EVENT_RELATED.RUNNING.MARATHON.FULL',
          value: false
        },
        {
          name: 'half',
          display: 'USER.PROFILE.EVENT_RELATED.RUNNING.MARATHON.HALF',
          value: false
        }
      ]
    },
    {
      name: 'saveButton',
      type: 'button',
      display: 'USER.PROFILE.EVENT_RELATED.RUNNING.BTN_LABEL'
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
        display: 'MESSAGES.USER.PROFILE.EVENT_RELATED.RUNNING.SUCCESS',
        type: 'success',
        icon: {
          class: 'fa-check-circle',
          type: 'fa'
        }
      }
    }
  ];
}
