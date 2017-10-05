/**
 * Created by LAE86643 on 8/6/2017.
 */

import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';

import {
  PersonalInfoConfig,
  IPersonalInfo,
  IPersonalInfoMessage
} from 'app/config/user/profile/personalinfo.config';
import { IForm, IMessageElement, IDateRange, IDate } from 'app/config/interfaces';
import { ProfileService } from 'app/features/user/services/profile.service';
import { MomentService } from 'app/shared/services/moment.service';

@Component({
  selector: 'aj-personalinfo',
  templateUrl: './personalinfo.component.html',
  styleUrls: ['./personalinfo.component.scss']
})

export class PersonalInfoComponent {

  formData: IForm;
  formElements: IPersonalInfo;
  messages: IPersonalInfoMessage;
  formGroup: FormGroup;
  message: IMessageElement;
  processing: boolean;

  constructor(private profileService: ProfileService, private momentService: MomentService) {
    this.formData = new PersonalInfoConfig();
    this.formElements = _.mapKeys(this.formData.elements, 'name');
    this.formElements.birthday.enabledDateRange = this.enabledDOBDateRange();
    this.messages = _.mapKeys(this.formData.messages, 'name');
    this.formGroup = new FormGroup({});
    this.message = null;
    this.processing = false;
  }

  enabledDOBDateRange(): IDateRange {
    const endDate: IDate = this.momentService.getToday();
    return {
      start: this.momentService.addCalendarYears(endDate, -100),
      end: endDate
    };
  }

  isValid(): boolean {
    return this.formGroup.valid && !this.processing;
  }

  onClicked(event): void {
    this.message = null;
  }

  onBindControl(controlData: {}): void {
    this.formGroup.addControl(controlData['name'], controlData['control']);
  }

  onSave(event: any): void {
    // console.log(this.formGroup.value);
  }
}
