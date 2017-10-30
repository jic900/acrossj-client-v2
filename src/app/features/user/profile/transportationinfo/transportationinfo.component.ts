import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatCheckbox } from '@angular/material';
import { TdCollapseAnimation } from '@covalent/core';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

import { IForm, IMessageElement } from 'app/config/interfaces';
import { Util } from 'app/shared/util/util';
import {
  ITransportationInfo,
  ITransportationInfoMessage,
  TransportationInfoConfig
} from 'app/config/user/profile/transportationinfo.config';
import { LocalStorageService } from 'app/shared/services/localstorage.service';
import { ProfileService } from 'app/features/user/services/profile.service';
import { IProfile, ITransportation } from 'app/features/user/model/profile.model';

@Component({
  selector: 'aj-transportationinfo',
  templateUrl: './transportationinfo.component.html',
  styleUrls: ['./transportationinfo.component.scss'],
  animations: [
    TdCollapseAnimation()
  ],
})
export class TransportationInfoComponent implements AfterViewInit, OnDestroy {

  formData: IForm;
  formElements: ITransportationInfo;
  messages: ITransportationInfoMessage;
  formGroup: FormGroup;
  message: IMessageElement;
  showVehicleInfo: boolean;
  processing: boolean;
  subscription: Subscription;
  @ViewChild('vehicleInfoToggle') vehicleInfoToggle: MatCheckbox;
  @ViewChild('anchor') anchorElement: ElementRef;

  constructor(private profileService: ProfileService, private localStorageService: LocalStorageService) {
    this.formData = new TransportationInfoConfig();
    this.formElements = _.mapKeys(this.formData.elements, 'name');
    this.messages = _.mapKeys(this.formData.messages, 'name');
    this.message = null;
    this.showVehicleInfo = false;
    this.processing = false;
    this.formGroup = new FormGroup({});
    this.subscription = this.profileService.profileUpdated$
      .subscribe((profile: IProfile) => this.populateTransportationInfo(profile.transportation));
  }

  ngAfterViewInit(): void {
    const profileInStorage = this.localStorageService.get('profile');
    if (profileInStorage) {
      const profile: IProfile = JSON.parse(profileInStorage);
      this.populateTransportationInfo(profile.transportation);
    } else {
      this.loadTransportationInfo();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  populateTransportationInfo(transportation: ITransportation): void {
    setTimeout(() => {
      if (transportation) {
        Object.keys(transportation).forEach((field) => {
          if (field === 'ownVehicle') {
            if (this.showVehicleInfo !== transportation[field]) {
              this.vehicleInfoToggle.toggle();
              this.showVehicleInfo = transportation[field];
            }
          } else {
            this.formGroup.get(field).setValue(transportation[field]);
          }
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

  toggleShowVehicleInfo(): void {
    this.showVehicleInfo = !this.showVehicleInfo;
    this.message = null;
    this.formGroup.markAsDirty();
  }

  loadTransportationInfo(): void {
    this.processing = true;
    this.message = null;
    this.profileService.getProfile().subscribe(
      (profile: IProfile) => {
        this.populateTransportationInfo(profile.transportation);
        this.processing = false;
      },
      err => {
        this.message = Util.createErrorMessage(err.name, err.message);
        this.processing = false;
      }
    );
  }

  onSave(event: any): void {
    if (this.showVehicleInfo) {
      this.formGroup.value.ownVehicle = true;
    } else {
      this.formGroup.value.ownVehicle = false;
      this.formGroup.value.vehicleMakeModel = '';
      this.formGroup.value.vehicleCapacity = '';
      this.formGroup.value.vehicleOtherInfo = [];
    }
    // console.log(this.formGroup.value);
    event.preventDefault();
    this.message = null;

    this.processing = true;
    const onComplete = () => {
      this.processing = false;
      this.anchorElement.nativeElement.scrollIntoView();
    };

    this.profileService.saveProfile({transportation: this.formGroup.value})
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
