import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

import { IForm, IMessageElement } from 'app/config/interfaces';
import { Util } from 'app/shared/util/util';
import {
  IRunningInfo,
  IRunningInfoMessage,
  RunningInfoConfig
} from 'app/config/user/profile/eventrelated/runninginfo.config';
import { LocalStorageService } from 'app/shared/services/localstorage.service';
import { ProfileService } from 'app/features/user/services/profile.service';
import { IProfile, IRunning } from 'app/features/user/model/profile.model';

@Component({
  selector: 'aj-runninginfo',
  templateUrl: './runninginfo.component.html',
  styleUrls: ['./runninginfo.component.scss']
})

export class RunningInfoComponent implements AfterViewInit, OnDestroy {

  formData: IForm;
  formElements: IRunningInfo;
  messages: IRunningInfoMessage;
  formGroup: FormGroup;
  message: IMessageElement;
  processing: boolean;
  subscription: Subscription;
  @ViewChild('anchor') anchorElement: ElementRef;

  constructor(private profileService: ProfileService, private localStorageService: LocalStorageService) {
    this.formData = new RunningInfoConfig();
    this.formElements = _.mapKeys(this.formData.elements, 'name');
    this.messages = _.mapKeys(this.formData.messages, 'name');
    this.message = null;
    this.processing = false;
    this.formGroup = new FormGroup({});
    this.subscription = this.profileService.profileUpdated$.subscribe(
      (profile: IProfile) => this.populateRunningInfo(profile.relevant ? profile.relevant.running : null)
    );
  }

  ngAfterViewInit(): void {
    const profileInStorage = this.localStorageService.get('profile');
    if (profileInStorage) {
      const profile: IProfile = JSON.parse(profileInStorage);
      this.populateRunningInfo(profile.relevant ? profile.relevant.running : null);
    } else {
      this.loadRunningInfo();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  populateRunningInfo(running: IRunning): void {
    setTimeout(() => {
      if (running) {
        Object.keys(running).forEach((field) => {
          this.formGroup.get(field).setValue(running[field]);
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

  loadRunningInfo(): void {
    this.processing = true;
    this.message = null;
    this.profileService.getProfile().subscribe(
      (profile: IProfile) => {
        this.populateRunningInfo(profile.relevant ? profile.relevant.running : null);
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

    this.profileService.saveProfile({'relevant.running': this.formGroup.value})
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
