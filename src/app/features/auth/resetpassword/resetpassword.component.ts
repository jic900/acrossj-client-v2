import { Component, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { JwtHelper } from 'angular2-jwt';
import * as _ from 'lodash';

import {
  ResetPasswordConfig,
  IResetPassword,
  IResetPasswordMessage
} from 'app/config/auth/resetpassword.config';
import {
  IForm,
  IInputElement,
  IMessageElement,
  IFormValidatorData
} from 'app/config/interfaces';
import { Util } from 'app/shared/util/util';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'aj-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['../auth.component.scss']
})

export class ResetPasswordComponent implements AfterViewInit {

  formData: IForm;
  formElements: IResetPassword;
  inputElements: IInputElement[];
  messages: IResetPasswordMessage;
  formGroup: FormGroup;
  initializing: boolean;
  passwordType: string;
  processing: boolean;
  message: IMessageElement;
  jwtHelper: JwtHelper;
  token: string;
  showInput: boolean;

  constructor(private authService: AuthService) {
    this.formData = new ResetPasswordConfig();
    this.formElements = _.mapKeys(this.formData.elements, 'name');
    this.inputElements = this.formData.elements.filter(element => {
      return element.type === 'input';
    });
    this.messages = _.mapKeys(this.formData.messages, 'name');
    this.initializing = true;
    this.passwordType = 'password';
    this.message = null;
    this.processing = false;
    this.showInput = true;
    this.formGroup = new FormGroup({}, this.formData.validator.validateFunc('password', 'confirmPassword'));
    this.jwtHelper = new JwtHelper();
  }

  ngAfterViewInit(): void {
    this.initializing = false;
  }

  isValid(): boolean {
    return !this.initializing && this.formGroup.valid && !this.processing;
  }

  setToken(token: string): void {
    this.token = token;
    let decodedToken;
    try {
      decodedToken = this.jwtHelper.decodeToken(token);
    } catch (e) {}
    if (!decodedToken) {
      this.message = this.messages.invalidToken;
      this.showInput = false;
    } else {
      this.formGroup.get('username').setValue(decodedToken.username);
    }
  }

  onClicked(event): void {
    this.message = null;
  }

  getFormValidatorData(controlName: string): IFormValidatorData {
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

  onResetPassword(event): void {
    event.preventDefault();
    this.processing = true;
    this.message = null;
    const requestData = {
      token: this.token,
      newPassword: this.formGroup.value.password
    };

    this.authService.resetPassword(requestData)
      .subscribe(
        data => {
          this.message = this.messages.success;
          this.showInput = false;
        },
        err => {
          if (err.name === 'EmailLinkExpired' ||
              err.name === 'InvalidEmailLink' ||
              err.name === 'VerifyToken' ||
              err.name === 'UserNotFound') {
            this.message = this.messages.invalidToken;
            this.showInput = false;
          } else {
            this.message = Util.createErrorMessage(err.name, err.message);
            // this.form.resetForm();
            // const decodedToken = this.jwtHelper.decodeToken(this.token);
            // this.formGroup.get('username').setValue(decodedToken.username);
          }
        },
        () => this.processing = false
      );
  }
}
