/**
 * Created by LAE84266 on 11/08/2017.
 */

import {
  IForm,
  IElement,
  ILinkElement,
  IMessageElement,
  IInputElement,
  ISimpleSelectElement,
  SelectMode,
  SelectLayout
} from 'app/config/interfaces';

export interface ITransportationInfo {
  station: IInputElement;
  driverLicense: IInputElement;
  ownVehicle: IElement;
  vehicleMakeModel: IInputElement;
  vehicleCapacity: IInputElement;
  vehicleOtherInfo: ISimpleSelectElement;
  saveButton: IElement;
  backLink: ILinkElement;
}

export interface ITransportationInfoMessage {
  success: IMessageElement;
}

export class TransportationInfoConfig implements IForm {

  name = 'USER.PROFILE.TRANSPORTATION_INFO.LABEL';
  elements: [IInputElement, IInputElement, IElement, IInputElement, IInputElement, ISimpleSelectElement, IElement, ILinkElement] = [
    {
      name: 'station',
      type: 'input',
      hint: 'USER.PROFILE.TRANSPORTATION_INFO.STATION.HINT',
      placeHolder: 'USER.PROFILE.TRANSPORTATION_INFO.STATION.LABEL'
    },
    {
      name: 'driverLicense',
      type: 'input',
      hint: 'USER.PROFILE.TRANSPORTATION_INFO.DRIVER_LICENSE.HINT',
      placeHolder: 'USER.PROFILE.TRANSPORTATION_INFO.DRIVER_LICENSE.LABEL'
    },
    {
      name: 'ownVehicle',
      type: 'checkbox',
      display: 'USER.PROFILE.TRANSPORTATION_INFO.VEHICLE.LABEL'
    },
    {
      name: 'vehicleMakeModel',
      type: 'input',
      hint: 'USER.PROFILE.TRANSPORTATION_INFO.VEHICLE.MAKE_MODEL.HINT',
      placeHolder: 'USER.PROFILE.TRANSPORTATION_INFO.VEHICLE.MAKE_MODEL.LABEL'
    },
    {
      name: 'vehicleCapacity',
      type: 'input',
      hint: 'USER.PROFILE.TRANSPORTATION_INFO.VEHICLE.CAPACITY.HINT',
      placeHolder: 'USER.PROFILE.TRANSPORTATION_INFO.VEHICLE.CAPACITY.LABEL'
    },
    {
      name: 'vehicleOtherInfo',
      type: 'simple-select',
      placeHolder: 'USER.PROFILE.TRANSPORTATION_INFO.VEHICLE.OTHER_INFO.LABEL',
      mode: SelectMode.MULTI,
      layout: SelectLayout.COLUMN,
      selectList: [
        {
          name: 'winterTires',
          display: 'USER.PROFILE.TRANSPORTATION_INFO.VEHICLE.OTHER_INFO.WINTER_TIRES',
          value: false
        },
        {
          name: 'rack',
          display: 'USER.PROFILE.TRANSPORTATION_INFO.VEHICLE.OTHER_INFO.RACK',
          value: false
        }
      ]
    },
    {
      name: 'saveButton',
      type: 'button',
      display: 'USER.PROFILE.TRANSPORTATION_INFO.BTN_LABEL'
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
        display: 'MESSAGES.USER.PROFILE.TRANSPORTATION_INFO.SUCCESS',
        type: 'success',
        icon: {
          class: 'fa-check-circle',
          type: 'fa'
        }
      }
    }
  ];
}
