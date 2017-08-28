import {
  Component,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';

import { SignUpConfig, ISignUp, ISignUpMessage } from 'app/config/auth/signup.config';
import { AuthService } from '../services/auth.service';
import { Util } from 'app/shared/util/util';
import { IForm } from 'app/config/interfaces/form.interface';
import { IInputElement } from 'app/config/interfaces/input-element.interface';
import { IMessageElement } from 'app/config/interfaces/message-element';
import { IFormValidatorData } from 'app/shared/components/input/input.component';

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
    this.formGroup = new FormGroup({}, this.passwordMatch);
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

  passwordMatch(formGroup: FormGroup): {} {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');
    if (passwordControl && confirmPasswordControl) {
      return passwordControl.value === confirmPasswordControl.value ? null : {'passwordMatch': true};
    }
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
      this.processing = false;
    };

    this.authService.signup(this.formGroup.value)
      .subscribe(
        data => {
          onSuccess();
        },
        err => {
          // Ignore error when verify email is failed to be sent
          if (err.name === 'SendVerifyMail') {
            onSuccess();
          } else {
            this.message = Util.createErrorMessage(err.name, err.message);
            this.processing = false;
          }
        }
      );
  }

  reset(): void {
    this.message = null;
    this.form.resetForm();
    // this.formGroup.reset();
  }

  // errorStateMatcher(control: FormControl, form: FormGroupDirective | NgForm): boolean {
  //   // Error when invalid control is dirty, touched, or submitted
  //   const isSubmitted = form && form.submitted;
  //   return !!(control.invalid && isSubmitted);
  //   // return !!(control.invalid && (control.dirty || control.touched || isSubmitted));
  // }
}
