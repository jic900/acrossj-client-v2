import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';

import { ForgotPasswordConfig, IForgotPassword, IForgotPasswordMessage } from 'app/config/auth/forgotpassword.config';
import { IForm, IMessageElement } from 'app/config/interfaces';
import { AuthService } from '../services/auth.service';
import { Util } from 'app/shared/util/util';

@Component({
  selector: 'aj-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['../auth.component.scss']
})

export class ForgotPasswordComponent {

  formData: IForm;
  formElements: IForgotPassword;
  messages: IForgotPasswordMessage;
  @ViewChild('form') form;
  formGroup: FormGroup;
  processing: boolean;
  message: IMessageElement;
  showInput: boolean;

  constructor(private authService: AuthService) {
    this.formData = new ForgotPasswordConfig();
    this.formElements = _.mapKeys(this.formData.elements, 'name');
    this.messages = _.mapKeys(this.formData.messages, 'name');
    this.formGroup = new FormGroup({});
    this.reset();
  }

  isValid(): boolean {
    return this.formGroup.valid && !this.processing;
  }

  reset(): void {
    this.processing = false;
    this.message = this.messages.hint;
    this.showInput = true;
  }

  onClicked(event): void {
    this.message = this.messages.hint;
  }

  onBindControl(controlData: {}): void {
    this.formGroup.addControl(controlData['name'], controlData['control']);
  }

  onForgotPassword(event): void {
    event.preventDefault();
    this.processing = true;
    // this.message = null;

    const onSuccess = () => {
      this.message = this.messages.success;
      this.showInput = false;
      this.form.resetForm();
    }

    this.authService.forgotPassword(this.formGroup.value)
      .subscribe(
        data => {
          onSuccess();
        },
        err => {
          if (err.name === 'UserNotFound') {
            this.message = this.messages.invalidUsername;
            this.showInput = true;
          } else if (err.name === 'SendResetPasswordMail') {
            onSuccess();
          } else {
            this.message = Util.createErrorMessage(err.name, err.message);
          }
        },
        () => this.processing = false
      );
  }
}
