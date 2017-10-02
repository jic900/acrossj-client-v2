import {
  Component,
  AfterViewInit,
  HostBinding,
  ViewChild
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';

import {
  ChangePasswordConfig,
  IChangePassword,
  IChangePasswordMessage
} from 'app/config/user/profile/changepassword.config';
import {
  IForm,
  IInputElement,
  IMessageElement
} from 'app/config/interfaces';
import { Util } from 'app/shared/util/util';
import { slideInDownAnimation } from 'app/shared/util/animations';
import { ProfileService } from 'app/features/user/services/profile.service';

@Component({
  selector: 'aj-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss'],
  animations: [ slideInDownAnimation ]
})

export class ChangePasswordComponent implements AfterViewInit {

  @HostBinding('@routeAnimation') routeAnimation = true;

  formData: IForm;
  formElements: IChangePassword;
  inputElements: IInputElement[];
  messages: IChangePasswordMessage;
  @ViewChild('form') form;
  formGroup: FormGroup;
  initializing: boolean;
  passwordType: string;
  processing: boolean;
  message: IMessageElement;

  constructor(private profileService: ProfileService) {
    this.formData = new ChangePasswordConfig();
    this.formElements = _.mapKeys(this.formData.elements, 'name');
    this.inputElements = this.formData.elements.filter(element => {
      return element.type === 'input';
    });
    this.messages = _.mapKeys(this.formData.messages, 'name');
    this.initializing = true;
    this.passwordType = 'password';
    this.message = null;
    this.processing = false;
    this.formGroup = new FormGroup({}, this.formData.validator.validateFunc('password', 'confirmPassword'));
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

  getFormValidatorData(controlName: string) {
    if (controlName === 'confirmPassword') {
      return {'validateFunc': this.formValidateFailed, 'errorFunc': this.getFormValidateError};
    }
    return null;
  }

  formValidateFailed = () => this.formGroup.hasError('passwordMatch');

  getFormValidateError = () => this.formData.validator.error;

  onBindControl(controlData: {}): void {
    this.formGroup.addControl(controlData['name'], controlData['control']);
  }

  onPasswordTypeChange(): void {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  onChangePassword(event): void {
    event.preventDefault();
    this.processing = true;
    this.message = null;
    const requestData = {
      currentPassword: this.formGroup.value.oldPassword,
      newPassword: this.formGroup.value.password
    };

    this.profileService.changePassword(requestData)
      .subscribe(
        data => {
          this.message = this.messages.success;
          this.form.resetForm();
        },
        err => {
          if (err.name === 'InvalidPassword') {
            this.message = this.messages.invalidPassword;
          } else if (err.name === 'SamePassword') {
            this.message = this.messages.samePassword;
          } else {
            this.message = Util.createErrorMessage(err.name, err.message);
            this.form.resetForm();
          }
          this.processing = false;
        }
      );
  }
}
