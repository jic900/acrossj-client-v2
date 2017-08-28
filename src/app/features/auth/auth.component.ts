import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

import { AuthConfig, IAuth } from 'app/config/auth/auth.config';
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

export class AuthComponent implements AfterViewInit, OnDestroy {

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
    this.selectedIndex = 1;
  }

  ngAfterViewInit(): void {
    this.subscription = this.route.params.subscribe(params => {
      setTimeout(() => {
        this.onRouteChange(params['id']);
      });
    });
  }

  onRouteChange(newRoute: string): void {
    this.authState = newRoute;
    switch (this.authState) {
      case 'signin': {
        this.selectedIndex = 0;
        this.signInComponent.reset();
        break;
      }
      case 'signup': {
        this.selectedIndex = 1;
        this.signUpComponent.reset();
        break;
      }
      case 'signout': {
        this.authService.signout();
        this.router.navigateByUrl('/');
        break;
      }
      case 'verifyemail': {
        const token = this.route.snapshot.queryParams['token'];
        if (!token || this.authService.authenticated) {
          this.router.navigateByUrl('/');
        } else {
          this.router.navigateByUrl(`/auth/${this.route.snapshot.url.join('/')}`);
          this.verifyEmailComponent.verifyEmail(this.route.snapshot.queryParams['token']);
        }
        break;
      }
      case 'sendverifyemail': {
        this.sendVerifyEmailComponent.reset();
        break;
      }
      case 'forgotpassword': {
        this.forgotPasswordComponent.reset();
        break;
      }
      case 'resetpassword': {
        if (this.authService.authenticated) {
          this.router.navigateByUrl('/');
          // this.router.navigateByUrl('/profile/changepassword');
        } else {
          const token = this.route.snapshot.queryParams['token'];
          if (!token) {
            this.router.navigateByUrl('/');
          } else {
            this.router.navigateByUrl(`/auth/${this.route.snapshot.url.join('/')}`);
            // setTimeout(() => {
            //   if (token) {
            //     this.resetPasswordComponent.setToken(token);
            //   }
            // }, 500);
            this.resetPasswordComponent.setToken(token);
          }
        }
        break;
      }
    }
  }
  onSelectedTabIndexChange(): void {
    // this.selectedIndex === 0 ? this.signUpForm.reset() : this.signInForm.reset();
    this.selectedIndex === 0 ? this.router.navigateByUrl('/auth/signin') : this.router.navigateByUrl('/auth/signup');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
