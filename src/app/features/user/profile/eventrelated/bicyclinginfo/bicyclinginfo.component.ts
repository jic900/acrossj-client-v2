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
  IBicyclingInfo,
  IBicyclingInfoMessage,
  BicyclingInfoConfig
} from 'app/config/user/profile/eventrelated/bicyclinginfo.config';
import { LocalStorageService } from 'app/shared/services/localstorage.service';
import { ProfileService } from 'app/features/user/services/profile.service';
import { IProfile, IBicycling } from 'app/features/user/model/profile.model';

@Component({
  selector: 'aj-bicyclinginfo',
  templateUrl: './bicyclinginfo.component.html',
  styleUrls: ['./bicyclinginfo.component.scss']
})

export class BicyclingInfoComponent implements AfterViewInit, OnDestroy {

  formData: IForm;
  formElements: IBicyclingInfo;
  messages: IBicyclingInfoMessage;
  formGroup: FormGroup;
  message: IMessageElement;
  processing: boolean;
  subscription: Subscription;
  @ViewChild('anchor') anchorElement: ElementRef;

  constructor(private profileService: ProfileService, private localStorageService: LocalStorageService) {
    this.formData = new BicyclingInfoConfig();
    this.formElements = _.mapKeys(this.formData.elements, 'name');
    this.messages = _.mapKeys(this.formData.messages, 'name');
    this.message = null;
    this.processing = false;
    this.formGroup = new FormGroup({}, this.formData.validator.validateFunc());
    this.subscription = this.profileService.profileUpdated$.subscribe(
      (profile: IProfile) => this.populateBicylingInfo(profile.relevant ? profile.relevant.bicycling : null)
    );
  }

  ngAfterViewInit(): void {
    const profileInStorage = this.localStorageService.get('profile');
    if (profileInStorage) {
      const profile: IProfile = JSON.parse(profileInStorage);
      this.populateBicylingInfo(profile.relevant ? profile.relevant.bicycling : null);
    } else {
      this.loadBicylingInfo();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  populateBicylingInfo(bicyling: IBicycling): void {
    setTimeout(() => {
      if (bicyling) {
        Object.keys(bicyling).forEach((field) => {
          this.formGroup.get(field).setValue(bicyling[field]);
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

  loadBicylingInfo(): void {
    this.processing = true;
    this.message = null;
    this.profileService.getProfile().subscribe(
      (profile: IProfile) => {
        this.populateBicylingInfo(profile.relevant ? profile.relevant.bicycling : null);
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

    this.profileService.saveProfile({'relevant.bicyling': this.formGroup.value})
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
