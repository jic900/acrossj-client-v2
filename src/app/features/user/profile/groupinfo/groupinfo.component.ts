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
  IGroupInfo,
  IGroupInfoMessage,
  GroupInfoConfig
} from 'app/config/user/profile/groupinfo.config';
import { LocalStorageService } from 'app/shared/services/localstorage.service';
import { ProfileService } from 'app/features/user/services/profile.service';
import { IProfile, IGroup } from 'app/features/user/model/profile.model';

@Component({
  selector: 'aj-groupinfo',
  templateUrl: './groupinfo.component.html',
  styleUrls: ['./groupinfo.component.scss']
})
export class GroupInfoComponent implements AfterViewInit, OnDestroy {

  formData: IForm;
  formElements: IGroupInfo;
  messages: IGroupInfoMessage;
  formGroup: FormGroup;
  message: IMessageElement;
  processing: boolean;
  subscription: Subscription;
  @ViewChild('anchor') anchorElement: ElementRef;

  constructor(private profileService: ProfileService, private localStorageService: LocalStorageService) {
    this.formData = new GroupInfoConfig();
    this.formElements = _.mapKeys(this.formData.elements, 'name');
    this.messages = _.mapKeys(this.formData.messages, 'name');
    this.message = null;
    this.processing = false;
    this.formGroup = new FormGroup({}, this.formData.validator.validateFunc());
    this.subscription = this.profileService.profileUpdated$
      .subscribe((profile: IProfile) => this.populateGroupInfo(profile.group));
  }

  ngAfterViewInit(): void {
    const profileInStorage = this.localStorageService.get('profile');
    if (profileInStorage) {
      const profile: IProfile = JSON.parse(profileInStorage);
      this.populateGroupInfo(profile.group);
    } else {
      this.loadGroupInfo();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  populateGroupInfo(group: IGroup): void {
    setTimeout(() => {
      if (group) {
        Object.keys(group).forEach((field) => {
          this.formGroup.get(field).setValue(group[field]);
        });
      }
    });
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

  loadGroupInfo(): void {
    this.processing = true;
    this.message = null;
    this.profileService.getProfile().subscribe(
      (profile: IProfile) => {
        this.populateGroupInfo(profile.group);
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

    this.profileService.saveProfile({group: this.formGroup.value})
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
