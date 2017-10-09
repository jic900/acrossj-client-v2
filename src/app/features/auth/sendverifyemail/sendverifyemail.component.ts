import {
  Component,
  ViewChild,
  ElementRef
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';

import {
  SendVerifyEmailConfig,
  ISendVerifyEmail,
  ISendVerifyEmailMessage
} from 'app/config/auth/sendverifyemail.config';
import { IForm, IMessageElement } from 'app/config/interfaces';
import { Util } from 'app/shared/util/util';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'aj-sendverifyemail',
  templateUrl: './sendverifyemail.component.html',
  styleUrls: ['../auth.component.scss']
})
export class SendVerifyEmailComponent {

  formData: IForm;
  formElements: ISendVerifyEmail;
  messages: ISendVerifyEmailMessage;
  @ViewChild('form') form;
  formGroup: FormGroup;
  processing: boolean;
  message: IMessageElement;
  showInput: boolean;
  @ViewChild('anchor') anchorElement: ElementRef;

  constructor(private authService: AuthService) {
    this.formData = new SendVerifyEmailConfig();
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

  onSendVerifyEmail(event): void {
    event.preventDefault();
    this.processing = true;
    // this.message = null;

    const onSuccess = () => {
      this.message = this.messages.success;
      this.showInput = false;
      this.form.resetForm();
    }
    const onComplete = () => {
      this.processing = false;
      this.anchorElement.nativeElement.scrollIntoView();
    };

    this.authService.sendVerifyEmail(this.formGroup.value)
      .subscribe(
        data => {
          onSuccess();
          onComplete();
        },
        err => {
          if (err.name === 'UserNotFound') {
            this.message = this.messages.invalidUsername;
            this.showInput = true;
          } else if (err.name === 'SendVerifyMail') {
            onSuccess();
          } else {
            this.message = Util.createErrorMessage(err.name, err.message);
          }
          onComplete();
        }
      );
  }
}
