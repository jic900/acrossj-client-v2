/**
 * Created by LAE84266 on 07/08/2017.
 */

import {
  Injectable,
  OnDestroy,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { MediaQueryBreakPoint } from 'app/config/common/app.config';
import { EndPoint } from 'app/config/common/http.config';
import { HttpService } from 'app/shared/services/http.service';
import { LocalStorageService } from 'app/shared/services/localstorage.service';
import { Util } from 'app/shared/util/util';
import { IProfile } from '../model/profile.model';

export enum ProfileObserver {
  ALL,
  PROFILE,
  PROFILE_MENU,
  EVENT_RELATED,
  EVENT_RELATED_MENU
}

export enum ProfileEventType {
  MENU_OPENED_CHANGE,
  MENU_MODE_CHANGE,
  MENU_SELECTED
}

export interface IProfileEvent {
  target: ProfileObserver;
  type: ProfileEventType;
  value: string;
}

const PROFILE_MENU_URL = '/user/profile/menu';
const EVENT_RELATED_MENU_URL = '/user/profile/eventrelated/menu';

@Injectable()
export class ProfileService implements OnDestroy {

  profileEvent$: Subject<IProfileEvent>;
  profileUpdated$: Subject<IProfile>;
  subscription: Subscription;
  menuMode: string;
  selectedProfileMenuUrl: string;
  previousBreakPoint: MediaQueryBreakPoint;
  activeUrl: string;
  menuRedirect: boolean;

  constructor(private httpService: HttpService,
              private localStorageService: LocalStorageService,
              private router: Router) {
    this.profileEvent$ = new Subject<IProfileEvent>();
    this.profileUpdated$ = new Subject<IProfile>();
    this.menuMode = this.getMenuMode();
    this.selectedProfileMenuUrl = null;
    this.previousBreakPoint = Util.currentMediaQueryBreakPoint();

    this.subscription = this.router.events
      .filter((event) => event instanceof NavigationEnd && event.url.includes('user/profile'))
      .subscribe((event: any) => {
        this.activeUrl = event.urlAfterRedirects ? event.urlAfterRedirects : event.url;
        this.onRouteEvents();
      });
    window.addEventListener('resize', event => this.onWindowResize(event));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onWindowResize(event): void {
    const currentBreakPoint = Util.currentMediaQueryBreakPoint();
    if (currentBreakPoint !== this.previousBreakPoint) {
      this.updateMenuMode();
      this.updateMenuOpened();
      this.redirectFromMenu();
      if (this.selectedProfileMenuUrl) {
        this.onMenuSelected(this.selectedProfileMenuUrl);
      }
      this.previousBreakPoint = currentBreakPoint;
    }
  }

  onRouteEvents(): void {
    // console.log('onRouteEvents  ' + this.activeUrl);
    this.updateMenuOpened();
    this.redirectFromMenu();
    if (this.activeUrl === PROFILE_MENU_URL || this.activeUrl === EVENT_RELATED_MENU_URL) {
      this.selectedProfileMenuUrl = null;
    } else {
      this.selectedProfileMenuUrl = this.activeUrl;
      this.onMenuSelected(this.selectedProfileMenuUrl);
    }
  }

  getMenuMode(): string {
    return this.widthIsMedium() ? 'side' : 'over';
  }

  updateMenuMode(): void {
    const curMenuMode = this.getMenuMode();
    if (curMenuMode !== this.menuMode) {
      this.menuMode = curMenuMode;
      this.profileEvent$.next({
        target: ProfileObserver.ALL,
        type: ProfileEventType.MENU_MODE_CHANGE,
        value: this.menuMode
      });
    }
  }

  getDefaultMenuOpened(): string {
    return this.widthIsMedium() ? 'true' : 'false';
  }

  updateMenuOpened(): void {
    if (this.widthIsExtraSmall()) {
      if (this.activeUrl === PROFILE_MENU_URL) {
        this.onMenuOpenedChanged(ProfileObserver.EVENT_RELATED, 'false');
        setTimeout(() => this.onMenuOpenedChanged(ProfileObserver.PROFILE, 'true'), 200);
        return;
      } else if (this.activeUrl === EVENT_RELATED_MENU_URL) {
        this.onMenuOpenedChanged(ProfileObserver.PROFILE, 'false');
        setTimeout(() => this.onMenuOpenedChanged(ProfileObserver.EVENT_RELATED, 'true'), 200);
        return;
      }
    } else if (this.widthIsSmall()) {
      if (this.menuRedirect) {
        if (this.activeUrl.includes('eventrelated')) {
          this.onMenuOpenedChanged(ProfileObserver.PROFILE, 'false');
          setTimeout(() => this.onMenuOpenedChanged(ProfileObserver.EVENT_RELATED, 'true'), 200);
        } else {
          setTimeout(() => this.onMenuOpenedChanged(ProfileObserver.PROFILE, 'true'), 100);
        }
        this.menuRedirect = false;
        return;
      }
    }
    if (this.activeUrl && this.activeUrl !== PROFILE_MENU_URL && this.activeUrl !== EVENT_RELATED_MENU_URL) {
      if (!this.activeUrl.includes('eventrelated')) {
        this.onMenuOpenedChanged(ProfileObserver.EVENT_RELATED, this.getDefaultMenuOpened());
        this.onMenuOpenedChanged(ProfileObserver.PROFILE, this.getDefaultMenuOpened());
      } else {
        this.onMenuOpenedChanged(ProfileObserver.PROFILE, this.getDefaultMenuOpened());
        this.onMenuOpenedChanged(ProfileObserver.EVENT_RELATED, this.getDefaultMenuOpened());
      }
    }
  }

  onMenuOpenedChanged(target: ProfileObserver, value: string) {
    this.profileEvent$.next({
      target: target,
      type: ProfileEventType.MENU_OPENED_CHANGE,
      value: value
    });
  }

  redirectFromMenu() {
    if (! this.widthIsExtraSmall()) {
      if (this.activeUrl === PROFILE_MENU_URL || this.activeUrl === EVENT_RELATED_MENU_URL) {
        if (this.widthIsSmall()) {
          this.menuRedirect = true;
        }
        let redirectUrl;
        if (this.activeUrl === PROFILE_MENU_URL) {
          redirectUrl = this.selectedProfileMenuUrl && !this.selectedProfileMenuUrl.includes('eventrelated') ?
            this.selectedProfileMenuUrl : '/user/profile/personalinfo';
        } else {
          redirectUrl = this.selectedProfileMenuUrl && this.selectedProfileMenuUrl.includes('eventrelated') ?
            this.selectedProfileMenuUrl : '/user/profile/eventrelated/general';
        }
        this.router.navigateByUrl(redirectUrl);
      }
    }
  }

  onMenuSelected(selectedUrl: string): void {
    this.profileEvent$.next({
      target: ProfileObserver.ALL,
      type: ProfileEventType.MENU_SELECTED,
      value: selectedUrl
    });
  }

  getProfile(): Observable<{}> {
    return this.httpService.get(EndPoint.getUrl('profile.getProfile'))
      .map(response => response.json())
      .map(data => this.processProfileData(data));
  }

  saveProfile(profileData: {}): Observable<{}> {
    return this.httpService.post(EndPoint.getUrl('profile.saveProfile'), profileData)
      .map(response => response.json())
      .map(data => this.processProfileData(data));
  }

  processProfileData(profileData: {}): IProfile {
    const profile: IProfile = {
      personal: profileData['personal'],
      relevant: profileData['relevant'],
      transportation: null,
      group: null
    };
    this.localStorageService.saveProfile(profile);
    this.profileUpdated$.next(profile);
    return profile;
  }

  changePassword(changePasswordData: {}): Observable<{}> {
    return this.httpService.post(EndPoint.getUrl('profile.changePassword'), changePasswordData)
      .map(response => response.json());
  }

  widthIsMedium(width?: number): boolean {
    return Util.isBreakPointOf(width ? width : window.innerWidth, MediaQueryBreakPoint.MEDIUM);
  }

  widthIsSmall(width?: number): boolean {
    return Util.isBreakPointOf(width ? width : window.innerWidth, MediaQueryBreakPoint.SMALL);
  }

  widthIsExtraSmall(width?: number): boolean {
    return Util.isBreakPointOf(width ? width : window.innerWidth, MediaQueryBreakPoint.EXTRA_SMALL);
  }
}
