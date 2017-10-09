import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';

import {
  SignInConfig,
  ISignIn,
  ISignInMessage
} from 'app/config/auth/signin.config';
import {
  IForm,
  IInputElement,
  IMessageElement
} from 'app/config/interfaces';
import { Util } from 'app/shared/util/util';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'aj-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['../auth.component.scss']
})

export class SignInComponent implements AfterViewInit {

  formData: IForm;
  formElements: ISignIn;
  inputElements: IInputElement[];
  messages: ISignInMessage;
  @ViewChild('form') form;
  formGroup: FormGroup;
  initializing: boolean;
  passwordType: string;
  processing: boolean;
  message: IMessageElement;
  @ViewChild('anchor') anchorElement: ElementRef;

  constructor(private authService: AuthService, private router: Router) {
    this.formData = new SignInConfig();
    this.formElements = _.mapKeys(this.formData.elements, 'name');
    this.inputElements = this.formData.elements.filter(element => {
      return element.type === 'input';
    });
    this.messages = _.mapKeys(this.formData.messages, 'name');
    this.initializing = true;
    this.passwordType = 'password';
    this.processing = false;
    this.message = null;
    this.formGroup = new FormGroup({});
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

  onSignIn(event): void {
    event.preventDefault();
    this.processing = true;
    // this.message = null;

    const onComplete = () => {
      this.processing = false;
      this.anchorElement.nativeElement.scrollIntoView();
    };

    this.authService.signin(this.formGroup.value)
      .subscribe(
        data => {
          this.message = this.messages.success;
          this.reset();
          const redirectUrl = this.authService.redirectUrl;
          if (redirectUrl) {
            this.router.navigateByUrl(redirectUrl);
          } else {
            this.router.navigateByUrl('/');
          }
          onComplete();
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
