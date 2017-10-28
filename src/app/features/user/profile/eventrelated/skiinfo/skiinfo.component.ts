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
  ISkiInfo,
  ISkiInfoMessage,
  SkiInfoConfig
} from 'app/config/user/profile/eventrelated/skiinfo.config';
import { LocalStorageService } from 'app/shared/services/localstorage.service';
import { ProfileService } from 'app/features/user/services/profile.service';
import { IProfile, ISki } from 'app/features/user/model/profile.model';

@Component({
  selector: 'aj-skiinfo',
  templateUrl: './skiinfo.component.html',
  styleUrls: ['./skiinfo.component.scss']
})

export class SkiInfoComponent implements AfterViewInit, OnDestroy {

  formData: IForm;
  formElements: ISkiInfo;
  messages: ISkiInfoMessage;
  formGroup: FormGroup;
  message: IMessageElement;
  processing: boolean;
  subscription: Subscription;
  @ViewChild('anchor') anchorElement: ElementRef;

  constructor(private profileService: ProfileService, private localStorageService: LocalStorageService) {
    this.formData = new SkiInfoConfig();
    this.formElements = _.mapKeys(this.formData.elements, 'name');
    this.messages = _.mapKeys(this.formData.messages, 'name');
    this.message = null;
    this.processing = false;
    this.formGroup = new FormGroup({});
    this.subscription = this.profileService.profileUpdated$.subscribe(
      (profile: IProfile) => this.populateSkiInfo(profile.relevant ? profile.relevant.ski : null)
    );
  }

  ngAfterViewInit(): void {
    const profileInStorage = this.localStorageService.get('profile');
    if (profileInStorage) {
      const profile: IProfile = JSON.parse(profileInStorage);
      this.populateSkiInfo(profile.relevant ? profile.relevant.ski : null);
    } else {
      this.loadSkiInfo();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  populateSkiInfo(ski: ISki): void {
    setTimeout(() => {
      if (ski) {
        Object.keys(ski).forEach((field) => {
          this.formGroup.get(field).setValue(ski[field]);
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

  loadSkiInfo(): void {
    this.processing = true;
    this.message = null;
    this.profileService.getProfile().subscribe(
      (profile: IProfile) => {
        this.populateSkiInfo(profile.relevant ? profile.relevant.ski : null);
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

    this.profileService.saveProfile({'relevant.ski': this.formGroup.value})
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
