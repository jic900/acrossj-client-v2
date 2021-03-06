import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

import { IForm, IMessageElement } from 'app/config/interfaces';
import { Util } from 'app/shared/util/util';
import {
  IGeneralInfo,
  IGeneralInfoMessage,
  GeneralInfoConfig
} from 'app/config/user/profile/eventrelated/generalinfo.config';
import { LocalStorageService } from 'app/shared/services/localstorage.service';
import { ProfileService } from 'app/features/user/services/profile.service';
import { IProfile, IGeneral } from 'app/features/user/model/profile.model';

@Component({
  selector: 'aj-generalinfo',
  templateUrl: './generalinfo.component.html',
  styleUrls: ['./generalinfo.component.scss']
})

export class GeneralInfoComponent implements AfterViewInit, OnDestroy {

  formData: IForm;
  formElements: IGeneralInfo;
  messages: IGeneralInfoMessage;
  formGroup: FormGroup;
  message: IMessageElement;
  processing: boolean;
  subscription: Subscription;
  @ViewChild('anchor') anchorElement: ElementRef;

  constructor(private profileService: ProfileService, private localStorageService: LocalStorageService) {
    this.formData = new GeneralInfoConfig();
    this.formElements = _.mapKeys(this.formData.elements, 'name');
    this.messages = _.mapKeys(this.formData.messages, 'name');
    this.message = null;
    this.processing = false;
    this.formGroup = new FormGroup({});
    this.subscription = this.profileService.profileUpdated$.subscribe(
      (profile: IProfile) => this.populateGeneralInfo(profile.relevant ? profile.relevant.general : null)
    );
  }

  ngAfterViewInit(): void {
    const profileInStorage = this.localStorageService.get('profile');
    if (profileInStorage) {
      const profile: IProfile = JSON.parse(profileInStorage);
      this.populateGeneralInfo(profile.relevant ? profile.relevant.general : null);
    } else {
      this.loadGeneralInfo();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  populateGeneralInfo(general: IGeneral): void {
    setTimeout(() => {
      if (general) {
        Object.keys(general).forEach((field) => {
          this.formGroup.get(field).setValue(general[field]);
        });
      }
    });
  }

  isValid(): boolean {
    return this.formGroup.dirty && this.formGroup.valid && !this.processing;
  }

  onClicked(event): void {
    this.message = null;
  }

  onBindControl(controlData: {}): void {
    this.formGroup.addControl(controlData['name'], controlData['control']);
  }

  loadGeneralInfo(): void {
    this.processing = true;
    this.message = null;
    this.profileService.getProfile().subscribe(
      (profile: IProfile) => {
        this.populateGeneralInfo(profile.relevant ? profile.relevant.general : null);
        this.processing = false;
      },
      err => {
        this.message = Util.createErrorMessage(err.name, err.message);
        this.processing = false;
      }
    );
  }

  onSave(event: any): void {
    // console.log(this.formGroup.value);
    event.preventDefault();
    this.message = null;

    this.processing = true;
    const onComplete = () => {
      this.processing = false;
      this.anchorElement.nativeElement.scrollIntoView();
    };

    this.profileService.saveProfile({'relevant.general': this.formGroup.value})
      .subscribe(
        data => {
          this.message = this.messages.success;
          Object.values(this.formGroup.controls).forEach((formControl: FormControl) => formControl.markAsPristine());
          onComplete();
        },
        err => {
          this.message = Util.createErrorMessage(err.name, err.message);
          onComplete();
        }
      );
  }
}
