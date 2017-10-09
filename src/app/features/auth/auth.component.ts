import {
  Component,
  OnDestroy,
  ViewChild,
  HostListener
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

import { AuthConfig, IAuth } from 'app/config/auth/auth.config';
import { KeyCode } from 'app/shared/util/util';
import { AuthService } from './services/auth.service';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';
import { VerifyEmailComponent } from './verifyemail/verifyemail.component';
import { SendVerifyEmailComponent } from './sendverifyemail/sendverifyemail.component';
import { ForgotPasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetPasswordComponent } from './resetpassword/resetpassword.component';

@Component({
  selector: 'aj-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnDestroy {

  authData: IAuth;
  @ViewChild(SignInComponent) signInComponent: SignInComponent;
  @ViewChild(SignUpComponent) signUpComponent: SignUpComponent;
  @ViewChild(VerifyEmailComponent) verifyEmailComponent: VerifyEmailComponent;
  @ViewChild(SendVerifyEmailComponent) sendVerifyEmailComponent: SendVerifyEmailComponent;
  @ViewChild(ForgotPasswordComponent) forgotPasswordComponent: ForgotPasswordComponent;
  @ViewChild(ResetPasswordComponent) resetPasswordComponent: ResetPasswordComponent;
  selectedIndex: number;
  subscription: Subscription;
  authState: string;

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) {
    this.authData = _.mapKeys(new AuthConfig().elements, 'name');
    this.subscription = this.route.params.subscribe(params => {
      this.onRouteChange(params['id']);
    });
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.keyCode === KeyCode.LEFT_ARROW) {
      this.selectedIndex = 0;
    } else if (event.keyCode === KeyCode.RIGHT_ARROW) {
      this.selectedIndex = 1;
    }
  }

  onRouteChange(newRoute: string): void {
    this.authState = newRoute;
    switch (this.authState) {
      case 'signin': this.onSignin(); break;
      case 'signup': this.onSignup(); break;
      case 'signout': this.onSignout(); break;
      case 'verifyemail': this.onVerifyEmail(); break;
      case 'sendverifyemail': this.onSendVerifyEmail(); break;
      case 'forgotpassword': this.onForgotPassword(); break;
      case 'resetpassword': this.onResetPassword(); break;
      default: this.router.navigateByUrl('404');
    }
  }

  onSignin(): void {
    this.selectedIndex = 0;
    if (this.signInComponent) {
      this.signInComponent.reset();
    }
  }

  onSignup(): void {
    this.selectedIndex = 1;
    if (this.signUpComponent) {
      this.signUpComponent.reset();
    }
  }

  onSignout(): void {
    this.authService.signout();
    this.router.navigateByUrl('/');
  }

  onVerifyEmail(): void {
    setTimeout(() => {
      const token = this.route.snapshot.queryParams['token'];
      if (!token || this.authService.authenticated) {
        this.router.navigateByUrl('/');
      } else {
        this.router.navigateByUrl(`/auth/${this.route.snapshot.url.join('/')}`);
        this.verifyEmailComponent.verifyEmail(this.route.snapshot.queryParams['token']);
      }
    });
  }

  onSendVerifyEmail(): void {
    setTimeout(() => {
      if (this.sendVerifyEmailComponent) {
        this.sendVerifyEmailComponent.reset();
      }
    });
  }

  onForgotPassword(): void {
    setTimeout(() => {
      if (this.forgotPasswordComponent) {
        this.forgotPasswordComponent.reset();
      }
    });
  }

  onResetPassword(): void {
    setTimeout(() => {
      if (this.authService.authenticated) {
        this.router.navigateByUrl('/');
      } else {
        const token = this.route.snapshot.queryParams['token'];
        if (!token) {
          this.router.navigateByUrl('/');
        } else {
          this.router.navigateByUrl(`/auth/${this.route.snapshot.url.join('/')}`);
          this.resetPasswordComponent.setToken(token);
        }
      }
    });
  }

  onSelectedTabIndexChange(): void {
    this.selectedIndex === 0 ? this.signInComponent.reset() : this.signUpComponent.reset();
    this.selectedIndex === 0 ? this.router.navigateByUrl('/auth/signin') : this.router.navigateByUrl('/auth/signup');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
