import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as _ from 'lodash';

import { VerifyEmailConfig, IVerifyEmailMessage } from 'app/config/auth/verifyemail.config';
import { IMessageElement } from 'app/config/interfaces';
import { Util } from 'app/shared/util/util';

@Component({
  selector: 'aj-verifyemail',
  templateUrl: './verifyemail.component.html',
  styleUrls: ['../auth.component.scss']
})

export class VerifyEmailComponent {

  messages: IVerifyEmailMessage;
  message: IMessageElement;

  constructor(private authService: AuthService) {
    this.messages = _.mapKeys(new VerifyEmailConfig().messages, 'name');
  }

  verifyEmail(token: string): void {
    this.message = this.messages.inProgress;
    this.authService.verifyEmail({'token': token})
      .subscribe(
        data => {
          if (data['status'] === 'Verified') {
            this.message = this.messages.success;
          } else if (data['status'] === 'AlreadyVerified') {
            this.message = this.messages.alreadyVerified;
          }
        },
        err => {
          if (err.name === 'EmailLinkExpired' || err.name === 'InvalidEmailLink' || err.name === 'VerifyToken' || err.name === 'UserNotFound') {
            this.message = this.messages.invalidToken;
          } else {
            this.message = Util.createErrorMessage(err.name, err.message);
          }
        }
      );
  }
}
