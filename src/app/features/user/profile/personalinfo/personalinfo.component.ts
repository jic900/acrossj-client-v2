/**
 * Created by LAE86643 on 8/6/2017.
 */

import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

import {
  PersonalInfoConfig,
  IPersonalInfo,
  IPersonalInfoMessage
} from 'app/config/user/profile/personalinfo.config';
import { IForm, IMessageElement, IDateRange, IDate } from 'app/config/interfaces';
import { ProfileService } from 'app/features/user/services/profile.service';
import { MomentService } from 'app/shared/services/moment.service';
import { LocalStorageService } from 'app/shared/services/localstorage.service';
import { IProfile, IPersonal } from 'app/features/user/model/profile.model';


@Component({
  selector: 'aj-personalinfo',
  templateUrl: './personalinfo.component.html',
  styleUrls: ['./personalinfo.component.scss']
})

export class PersonalInfoComponent implements AfterViewInit, OnDestroy {

  formData: IForm;
  formElements: IPersonalInfo;
  messages: IPersonalInfoMessage;
  formGroup: FormGroup;
  message: IMessageElement;
  processing: boolean;
  subscription: Subscription;
  selectedGender: string;

  constructor(private profileService: ProfileService,
              private momentService: MomentService,
              private localStorageService: LocalStorageService) {
    this.formData = new PersonalInfoConfig();
    this.formElements = _.mapKeys(this.formData.elements, 'name');
    this.formElements.birthday.enabledDateRange = this.enabledDOBDateRange();
    this.messages = _.mapKeys(this.formData.messages, 'name');
    this.formGroup = new FormGroup({});
    this.message = null;
    this.processing = false;
    this.subscription = this.profileService.profileUpdated$
      .subscribe((profile: IProfile) => this.populatePersonalInfo(profile.personal));
  }

  ngAfterViewInit(): void {
    const profileInStorage = this.localStorageService.get('profile');
    if (profileInStorage) {
      const profile: IProfile = JSON.parse(profileInStorage);
      this.populatePersonalInfo(profile.personal);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  populatePersonalInfo(personalInfo: IPersonal) {
    setTimeout(() => {
      if (personalInfo) {
        if (personalInfo.birthday) {
          const jsDate = new Date(personalInfo.birthday);
          personalInfo.birthday = this.momentService.formatDate(this.momentService.parseJSDate(jsDate));
        }
        Object.keys(personalInfo).forEach((field) => {
          this.formGroup.get(field).setValue(personalInfo[field]);
        });
      }
    });
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
    const user = JSON.parse(this.localStorageService.get('user'));
    if (controlData['name'] === 'username') {
      controlData['control'].setValue(user.userName);
    } else if (controlData['name'] === 'email') {
      controlData['control'].setValue(user.email);
    }
    this.formGroup.addControl(controlData['name'], controlData['control']);

  }

  onSave(event: any): void {
    if (this.formGroup.value.birthday && this.formGroup.value.birthday.trim() !== '') {
      this.formGroup.value.birthday =
        this.momentService.getTime(this.momentService.parseDate(this.formGroup.value.birthday));
    }
    this.profileService.saveProfile({personal: this.formGroup.value})
      .subscribe(
        data => {
          this.message = this.messages.success;
        },
        err => {
        },
        () => this.processing = false
      );
  }
}
