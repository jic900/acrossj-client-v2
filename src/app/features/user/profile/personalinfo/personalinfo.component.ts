/**
 * Created by LAE86643 on 8/6/2017.
 */

import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

import {
  PersonalInfoConfig,
  IPersonalInfo,
  IPersonalInfoMessage
} from 'app/config/user/profile/personalinfo.config';
import { IForm, IMessageElement, IDateRange, IDate } from 'app/config/interfaces';
import { Util } from 'app/shared/util/util';
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
  @ViewChild('anchor') anchorElement: ElementRef;

  constructor(private profileService: ProfileService,
              private momentService: MomentService,
              private localStorageService: LocalStorageService) {
    this.formData = new PersonalInfoConfig();
    this.formElements = _.mapKeys(this.formData.elements, 'name');
    this.formElements.birthday.enabledDateRange = this.enabledDOBDateRange();
    this.messages = _.mapKeys(this.formData.messages, 'name');
    this.message = null;
    this.processing = false;
    this.formGroup = new FormGroup({}, this.formData.validator.validateFunc());
    this.subscription = this.profileService.profileUpdated$
      .subscribe((profile: IProfile) => this.populatePersonalInfo(profile.personal));
  }

  ngAfterViewInit(): void {
    const profileInStorage = this.localStorageService.get('profile');
    if (profileInStorage) {
      const profile: IProfile = JSON.parse(profileInStorage);
      this.populatePersonalInfo(profile.personal);
    } else {
      this.loadPersonalInfo();
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

  loadPersonalInfo(): void {
    this.processing = true;
    this.message = null;
    this.profileService.getProfile().subscribe(
      (profile: IProfile) => {
        this.populatePersonalInfo(profile.personal);
        this.processing = false;
      },
      err => {
        this.message = Util.createErrorMessage(err.name, err.message);
        this.processing = false;
      }
    );
  }

  onSave(event: any): void {
    event.preventDefault();
    this.processing = true;
    this.message = null;
    if (this.formGroup.value.birthday && this.formGroup.value.birthday.trim() !== '') {
      this.formGroup.value.birthday =
        this.momentService.getTime(this.momentService.parseDate(this.formGroup.value.birthday));
    }

    const onComplete = () => {
      this.processing = false;
      this.anchorElement.nativeElement.scrollIntoView();
    };

    this.profileService.saveProfile({personal: this.formGroup.value})
      .subscribe(
        data => {
          this.message = this.messages.success;
          onComplete();
        },
        err => {
          this.message = Util.createErrorMessage(err.name, err.message);
          onComplete();
        }
      );
  }
}
