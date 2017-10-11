import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

import { IForm, IMessageElement } from 'app/config/interfaces';
import { Util } from 'app/shared/util/util';
import {
  ICampingInfo,
  ICampingInfoMessage,
  CampingInfoConfig
} from 'app/config/user/profile/eventrelated/campinginfo.config';
import { LocalStorageService } from 'app/shared/services/localstorage.service';
import { ProfileService } from 'app/features/user/services/profile.service';
import { IProfile, ICamping } from 'app/features/user/model/profile.model';

@Component({
  selector: 'aj-campinginfo',
  templateUrl: './campinginfo.component.html',
  styleUrls: ['./campinginfo.component.scss']
})

export class CampingInfoComponent implements AfterViewInit, OnDestroy {

  formData: IForm;
  formElements: ICampingInfo;
  messages: ICampingInfoMessage;
  formGroup: FormGroup;
  message: IMessageElement;
  processing: boolean;
  subscription: Subscription;
  @ViewChild('anchor') anchorElement: ElementRef;

  constructor(private profileService: ProfileService, private localStorageService: LocalStorageService) {
    this.formData = new CampingInfoConfig();
    this.formElements = _.mapKeys(this.formData.elements, 'name');
    this.messages = _.mapKeys(this.formData.messages, 'name');
    this.message = null;
    this.processing = false;
    this.formGroup = new FormGroup({});
    this.subscription = this.profileService.profileUpdated$.subscribe(
      (profile: IProfile) => this.populateCampingInfo(profile.relevant ? profile.relevant.camping : null)
    );
  }

  ngAfterViewInit(): void {
    const profileInStorage = this.localStorageService.get('profile');
    if (profileInStorage) {
      const profile: IProfile = JSON.parse(profileInStorage);
      this.populateCampingInfo(profile.relevant ? profile.relevant.camping : null);
    } else {
      this.loadCampingInfo();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  populateCampingInfo(camping: ICamping): void {
    setTimeout(() => {
      if (camping) {
        Object.keys(camping).forEach((field) => {
          this.formGroup.get(field).setValue(camping[field]);
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

  loadCampingInfo(): void {
    this.processing = true;
    this.message = null;
    this.profileService.getProfile().subscribe(
      (profile: IProfile) => {
        this.populateCampingInfo(profile.relevant ? profile.relevant.camping : null);
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

    const onComplete = () => {
      this.processing = false;
      this.anchorElement.nativeElement.scrollIntoView();
    };

    this.profileService.saveProfile({'relevant.camping': this.formGroup.value})
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
