/**
 * Created by LAE86643 on 8/6/2017.
 */

import { Component, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';

import {
  PersonalInfoConfig,
  IPersonalInfo,
  IPersonalInfoMessage
} from 'app/config/user/profile/personalinfo.config';
import { ProfileService } from 'app/features/user/services/profile.service';
import { IForm } from 'app/config/interfaces/form.interface';
import { IMessageElement } from 'app/config/interfaces/message-element';

@Component({
  selector: 'aj-personalinfo',
  templateUrl: './personalinfo.component.html',
  styleUrls: ['./personalinfo.component.scss']
})

export class PersonalInfoComponent implements AfterViewInit {

  formData: IForm;
  formElements: IPersonalInfo;
  messages: IPersonalInfoMessage;
  formGroup: FormGroup;
  message: IMessageElement;
  initializing: boolean;
  processing: boolean;

  constructor(private profileService: ProfileService) {
    this.formData = new PersonalInfoConfig();
    this.formElements = _.mapKeys(this.formData.elements, 'name');
    this.messages = _.mapKeys(this.formData.messages, 'name');
    this.formGroup = new FormGroup({});
    this.initializing = true;
    this.message = null;
    this.processing = false;
  }

  ngAfterViewInit(): void {
    this.initializing = false;
  }

  isValid(): boolean {
    return !this.initializing && this.formGroup.valid && !this.processing;
  }

  onClicked(event): void {
    this.message = null;
  }

  onBindControl(controlData: {}): void {
    this.formGroup.addControl(controlData['name'], controlData['control']);
  }

  onSelected(event): void {
  }
}
