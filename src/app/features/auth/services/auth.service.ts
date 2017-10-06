import {
  OnDestroy,
  Injectable
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { HttpService } from 'app/shared/services/http.service';
import { LocalStorageService } from 'app/shared/services/localstorage.service';
import { EndPoint } from 'app/config/common/http.config';
import { ProfileService } from 'app/features/user/services/profile.service';

@Injectable()
export class AuthService implements OnDestroy {

  authenticated: boolean;
  authenticated$: BehaviorSubject<boolean>;
  subscription: Subscription;
  redirectUrl: string;

  constructor(private httpService: HttpService,
              private localStorageService: LocalStorageService,
              private profileService: ProfileService) {
    this.authenticated = false;
    this.authenticated$ = new BehaviorSubject<boolean>(this.authenticated);
    if (localStorageService.tokenNotExpired()) {
      this.setAuthenticated(true);
    } else {
      this.localStorageService.deleteToken();
    }
    this.subscription = this.localStorageService.tokenDeleted$
      .subscribe(() => this.setAuthenticated(false));
    this.redirectUrl = null;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setAuthenticated(isAuthenticated: boolean): void {
    this.authenticated = isAuthenticated;
    this.authenticated$.next(isAuthenticated);
  }

  getUsername(): string {
    return JSON.parse(this.localStorageService.get('user')).userName;
  }

  signup(signupData: {}): Observable<{}> {
    return this.httpService.post(EndPoint.getUrl('auth.signup'), signupData)
      .map(response => response.json());
  }

  signin(signinData: {}): Observable<{}> {
    return this.httpService.post(EndPoint.getUrl('auth.signin'), signinData)
      .map(response => response.json())
      .map(data => {
        this.localStorageService.saveToken(data.token);
        this.setAuthenticated(true);
        this.profileService.getProfile().subscribe();
        return data;
      });
  }

  signout(): void {
    this.localStorageService.deleteToken();
  }

  verifyEmail(verifyEmailData: {}): Observable<{}> {
    return this.httpService.post(EndPoint.getUrl('auth.verifyEmail'), verifyEmailData)
      .map(response => response.json());
  }

  forgotPassword(forgotPasswordData: {}): Observable<{}> {
    return this.httpService.post(EndPoint.getUrl('auth.forgotPassword'), forgotPasswordData)
      .map(response => response.json());
  }

  resetPassword(resetPasswordData: {}): Observable<{}> {
    return this.httpService.post(EndPoint.getUrl('auth.resetPassword'), resetPasswordData)
      .map(response => response.json());
  }

  sendVerifyEmail(sendVerifyEmailData: {}): Observable<{}> {
    return this.httpService.post(EndPoint.getUrl('auth.sendVerifyEmail'), sendVerifyEmailData)
      .map(response => response.json());
  }
}
