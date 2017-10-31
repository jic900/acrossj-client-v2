import {
  IForm,
  IElement,
  ILinkElement,
  IMessageElement,
  IInputElement,
  ISelectElement,
  SelectMode
} from 'app/config/interfaces';

export interface ISkiInfo {
  proficient: ISelectElement;
  license: ISelectElement;
  bootsSize: ISelectElement;
  jacketSize: ISelectElement;
  pantsSize: ISelectElement;
  skillLevel: ISelectElement;
  otherSkills: ISelectElement;
  certificate: IInputElement;
  saveButton: IElement;
  backLink: ILinkElement;
}

export interface ISkiInfoMessage {
  success: IMessageElement;
}

export class SkiInfoConfig implements IForm {

  name = 'USER.PROFILE.EVENT_RELATED.SKI.LABEL';
  elements: [ISelectElement, ISelectElement, ISelectElement, ISelectElement, ISelectElement,
             ISelectElement, ISelectElement, IInputElement, IElement, ILinkElement] = [
    {
      name: 'proficient',
      type: 'select',
      placeHolder: 'USER.PROFILE.EVENT_RELATED.SKI.PROFICIENT.LABEL',
      mode: SelectMode.MULTI,
      readOnly: true,
      chipOptions: {
        selectable: true,
        removable: true,
        addOnBlur: true
      },
      selectList: [
        {
          name: 'ski',
          display: 'USER.PROFILE.EVENT_RELATED.SKI.PROFICIENT.SKI',
          value: false
        },
        {
          name: 'snowboard',
          display: 'USER.PROFILE.EVENT_RELATED.SKI.PROFICIENT.SNOWBOARD',
          value: false
        }
      ]
    },
    {
      name: 'license',
      type: 'select',
      placeHolder: 'USER.PROFILE.EVENT_RELATED.SKI.LICENSE.LABEL',
      mode: SelectMode.SINGLE,
      readOnly: true,
      chipOptions: {
        selectable: false,
        removable: false,
        addOnBlur: false
      },
      selectList: [
        {
          name: 'grade1',
          display: 'USER.PROFILE.EVENT_RELATED.SKI.LICENSE.GRADE_1',
          value: 'grade1'
        },
        {
          name: 'grade2',
          display: 'USER.PROFILE.EVENT_RELATED.SKI.LICENSE.GRADE_2',
          value: 'grade2'
        },
        {
          name: 'grade3',
          display: 'USER.PROFILE.EVENT_RELATED.SKI.LICENSE.GRADE_3',
          value: 'grade3'
        }
      ]
    },
    {
      name: 'bootsSize',
      type: 'select',
      placeHolder: 'USER.PROFILE.EVENT_RELATED.SKI.BOOTS_SIZE.LABEL',
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
          display: 'USER.PROFILE.EVENT_RELATED.SKI.BOOTS_SIZE.XXL',
          value: 'xxl'
        },
        {
          name: 'xl',
          display: 'USER.PROFILE.EVENT_RELATED.SKI.BOOTS_SIZE.XL',
          value: 'xl'
        },
        {
          name: 'l',
          display: 'USER.PROFILE.EVENT_RELATED.SKI.BOOTS_SIZE.L',
          value: 'l'
        },
        {
          name: 'm',
          display: 'USER.PROFILE.EVENT_RELATED.SKI.BOOTS_SIZE.M',
          value: 'm'
        },
        {
          name: 's',
          display: 'USER.PROFILE.EVENT_RELATED.SKI.BOOTS_SIZE.S',
          value: 's'
        },
        {
          name: 'xs',
          display: 'USER.PROFILE.EVENT_RELATED.SKI.BOOTS_SIZE.XS',
          value: 'xs'
        }
      ]
    },
    {
      name: 'jacketSize',
      type: 'select',
      placeHolder: 'USER.PROFILE.EVENT_RELATED.SKI.JACKET_SIZE.LABEL',
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
          display: 'USER.PROFILE.EVENT_RELATED.SKI.JACKET_SIZE.XXL',
          value: 'xxl'
        },
        {
          name: 'xl',
          display: 'USER.PROFILE.EVENT_RELATED.SKI.JACKET_SIZE.XL',
          value: 'xl'
        },
        {
          name: 'l',
          display: 'USER.PROFILE.EVENT_RELATED.SKI.JACKET_SIZE.L',
          value: 'l'
        },
        {
          name: 'm',
          display: 'USER.PROFILE.EVENT_RELATED.SKI.JACKET_SIZE.M',
          value: 'm'
        },
        {
          name: 's',
          display: 'USER.PROFILE.EVENT_RELATED.SKI.JACKET_SIZE.S',
          value: 's'
        },
        {
          name: 'xs',
          display: 'USER.PROFILE.EVENT_RELATED.SKI.JACKET_SIZE.XS',
          value: 'xs'
        }
      ]
    },
    {
      name: 'pantsSize',
      type: 'select',
      placeHolder: 'USER.PROFILE.EVENT_RELATED.SKI.PANTS_SIZE.LABEL',
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
          display: 'USER.PROFILE.EVENT_RELATED.SKI.PANTS_SIZE.XXL',
          value: 'xxl'
        },
        {
          name: 'xl',
          display: 'USER.PROFILE.EVENT_RELATED.SKI.PANTS_SIZE.XL',
          value: 'xl'
        },
        {
          name: 'l',
          display: 'USER.PROFILE.EVENT_RELATED.SKI.PANTS_SIZE.L',
          value: 'l'
        },
        {
          name: 'm',
          display: 'USER.PROFILE.EVENT_RELATED.SKI.PANTS_SIZE.M',
          value: 'm'
        },
        {
          name: 's',
          display: 'USER.PROFILE.EVENT_RELATED.SKI.PANTS_SIZE.S',
          value: 's'
        },
        {
          name: 'xs',
          display: 'USER.PROFILE.EVENT_RELATED.SKI.PANTS_SIZE.XS',
          value: 'xs'
        }
      ]
    },
    {
      name: 'skillLevel',
      type: 'select',
      placeHolder: 'USER.PROFILE.EVENT_RELATED.SKI.SKILL_LEVEL.LABEL',
      mode: SelectMode.SINGLE,
      readOnly: true,
      chipOptions: {
        selectable: false,
        removable: false,
        addOnBlur: false
      },
      selectList: [
        {
          name: 'entry',
          display: 'USER.PROFILE.EVENT_RELATED.SKI.SKILL_LEVEL.ENTRY',
          value: 'entry'
        },
        {
          name: 'intermediate',
          display: 'USER.PROFILE.EVENT_RELATED.SKI.SKILL_LEVEL.INTERMEDIATE',
          value: 'intermediate'
        },
        {
          name: 'advanced',
          display: 'USER.PROFILE.EVENT_RELATED.SKI.SKILL_LEVEL.ADVANCED',
          value: 'advanced'
        }
      ]
    },
    {
      name: 'otherSkills',
      type: 'select',
      placeHolder: 'USER.PROFILE.EVENT_RELATED.SKI.OTHER_SKILLS.LABEL',
      hint: 'USER.PROFILE.EVENT_RELATED.SKI.OTHER_SKILLS.HINT',
      mode: SelectMode.MULTI,
      chipOptions: {
        selectable: true,
        removable: true,
        addOnBlur: true
      },
      selectList: [
        {
          name: 'jump',
          display: 'USER.PROFILE.EVENT_RELATED.SKI.OTHER_SKILLS.JUMP',
          value: false
        },
        {
          name: 'pipe',
          display: 'USER.PROFILE.EVENT_RELATED.SKI.OTHER_SKILLS.PIPE',
          value: false
        },
        {
          name: 'mogul',
          display: 'USER.PROFILE.EVENT_RELATED.SKI.OTHER_SKILLS.MOGUL',
          value: false
        }
      ]
    },
    {
      name: 'certificate',
      type: 'input',
      placeHolder: 'USER.PROFILE.EVENT_RELATED.SKI.CERTIFICATE.LABEL'
    },
    {
      name: 'saveButton',
      type: 'button',
      display: 'USER.PROFILE.EVENT_RELATED.SKI.BTN_LABEL'
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
        display: 'MESSAGES.USER.PROFILE.EVENT_RELATED.SKI.SUCCESS',
        type: 'success',
        icon: {
          class: 'fa-check-circle',
          type: 'fa'
        }
      }
    }
  ];
}
