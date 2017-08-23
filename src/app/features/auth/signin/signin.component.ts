import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';

import { SignInConfig, ISignIn, ISignInMessage } from 'app/config/auth/signin.config';
import { AuthService } from '../services/auth.service';
import { Util } from 'app/shared/util/util';
import { IForm } from 'app/config/interfaces/form.interface';
import { IInputElement } from 'app/config/interfaces/input-element.interface';
import { IMessageElement } from 'app/config/interfaces/message-element';

@Component({
  selector: 'aj-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['../auth.component.scss']
})

export class SignInComponent {

  formData: IForm;
  formElements: ISignIn;
  inputElements: IInputElement[];
  messages: ISignInMessage;
  @ViewChild('form') form;
  formGroup: FormGroup;
  passwordType: string;
  processing: boolean;
  message: IMessageElement;

  constructor(private authService: AuthService, private router: Router) {
    this.formData = new SignInConfig();
    this.formElements = _.mapKeys(this.formData.elements, 'name');
    this.inputElements = this.formData.elements.filter(element => {
      return element.type === 'input';
    });
    this.messages = _.mapKeys(this.formData.messages, 'name');
    this.passwordType = 'password';
    this.processing = false;
    this.message = null;
    this.formGroup = new FormGroup({});
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

  onPasswordTypeChange(): void {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  onSignIn(event): void {
    event.preventDefault();
    this.processing = true;
    // this.message = null;

    this.authService.signin(this.formGroup.value)
      .subscribe(
        data => {
          this.message = this.messages.success;
          this.processing = false;
          this.reset();
          // TODO: navigate to previous page if exisits.
          const redirectUrl = this.authService.redirectUrl;
          if (redirectUrl) {
            this.router.navigateByUrl(redirectUrl);
          } else {
            this.router.navigateByUrl('/');
          }
        },
        err => {
          if (err.name === 'UserNotFound') {
            this.message = this.messages.invalidUsername;
          } else if (err.name === 'InvalidPassword') {
            this.message = this.messages.invalidPassword;
          } else if (err.name === 'NotVerified') {
            this.message = this.messages.notVerified;
          } else {
            this.message = Util.createErrorMessage(err.name, err.message);
          }
          this.processing = false;
        }
      );
  }

  reset(): void {
    this.message = null;
    this.form.resetForm();
    // this.formGroup.reset();
  }
}
