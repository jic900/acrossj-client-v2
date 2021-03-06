import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';

import {
  SignUpConfig,
  ISignUp,
  ISignUpMessage
} from 'app/config/auth/signup.config';
import {
  IForm,
  IInputElement,
  IMessageElement,
  IFormValidatorData
} from 'app/config/interfaces';
import { Util } from 'app/shared/util/util';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'aj-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../auth.component.scss']
})

export class SignUpComponent implements AfterViewInit {

  formData: IForm;
  formElements: ISignUp;
  inputElements: IInputElement[];
  messages: ISignUpMessage;
  @ViewChild('form') form;
  formGroup: FormGroup;
  initializing: boolean;
  passwordType: string;
  processing: boolean;
  message: IMessageElement;
  @ViewChild('anchor') anchorElement: ElementRef;

  constructor(private authService: AuthService) {
    this.formData = new SignUpConfig();
    this.formElements = _.mapKeys(this.formData.elements, 'name');
    this.inputElements = this.formData.elements.filter(element => {
      return element.type === 'input';
    });
    this.messages = _.mapKeys(this.formData.messages, 'name');
    this.initializing = true;
    this.passwordType = 'password';
    this.processing = false;
    this.message = null;
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

  onBindControl(controlData: {}): void {
    this.formGroup.addControl(controlData['name'], controlData['control']);
  }

  onPasswordTypeChange(): void {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  getFormValidatorData(controlName: string): IFormValidatorData {
    if (controlName === 'confirmPassword') {
      return {'validateFunc': this.formValidateFailed, 'errorFunc': this.getFormValidateError};
    }
    return null;
  }

  formValidateFailed = () => this.formGroup.hasError('passwordMatch');

  getFormValidateError = () => this.formData.validator.error;

  onSignUp(event): void {
    event.preventDefault();
    // this.message = null;
    this.processing = true;

    const onSuccess = () => {
      this.message = this.messages.success;
      this.form.resetForm();
    };
    const onComplete = () => {
      this.processing = false;
      this.anchorElement.nativeElement.scrollIntoView();
    };

    this.authService.signup(this.formGroup.value)
      .subscribe(
        data => {
          onSuccess();
          onComplete();
        },
        err => {
          // Ignore error when verify email is failed to be sent
          if (err.name === 'SendVerifyMail') {
            onSuccess();
          } else {
            this.message = Util.createErrorMessage(err.name, err.message);
          }
          onComplete();
        }
      );
  }

  reset(): void {
    this.message = null;
    this.form.resetForm();
    // this.formGroup.reset();
  }
}
