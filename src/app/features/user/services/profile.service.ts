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
import { Util } from 'app/shared/util/util';


export enum ProfileObserver {
  ALL,
  PROFILE,
  PROFILE_MENU,
  EVENT_RELATED
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
  delay?: boolean;
}

const PROFILE_MENU_URL = '/user/profile/menu';
const EVENT_MENU_URL = '/user/profile/eventrelated/menu';

@Injectable()
export class ProfileService implements OnDestroy {

  profileEvent$: Subject<IProfileEvent>;
  subscription: Subscription;
  menuMode: string;
  selectedProfileMenuUrl: string;
  previousBreakPoint: MediaQueryBreakPoint;
  activeUrl: string;
  menuRedirect: boolean;

  constructor(private httpService: HttpService, private router: Router) {
    this.profileEvent$ = new Subject<IProfileEvent>();
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
      this.previousBreakPoint = currentBreakPoint;
    }
  }

  onRouteEvents(): void {
    console.log('onRouteEvents  ' + this.activeUrl);

    this.updateMenuOpened();
    this.redirectFromMenu();
    if (this.activeUrl === PROFILE_MENU_URL) {
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

  updateMenuOpened(target?: ProfileObserver, value?: string): void {
    let menuOpenedValue = this.getDefaultMenuOpened();
    let delay = false;
    if (this.widthIsExtraSmall()) {
      if (this.activeUrl === PROFILE_MENU_URL) {
        menuOpenedValue = 'true';
      }
    } else if (this.widthIsSmall()) {
      if (this.menuRedirect) {
        menuOpenedValue = 'true';
        this.menuRedirect = false;
        delay = true;
      }
    }
    this.profileEvent$.next({
      target: target ? target : ProfileObserver.ALL,
      type: ProfileEventType.MENU_OPENED_CHANGE,
      value: menuOpenedValue,
      delay: delay
    });
  }

  redirectFromMenu() {
    if (this.activeUrl === PROFILE_MENU_URL) {
      if (! this.widthIsExtraSmall()) {
        this.menuRedirect = true;
        this.router.navigateByUrl(
          this.selectedProfileMenuUrl ? this.selectedProfileMenuUrl : '/user/profile/personalinfo');
      }
    } else if (this.activeUrl === EVENT_MENU_URL) {
      this.menuRedirect = true;
      this.router.navigateByUrl(
        this.selectedProfileMenuUrl ? this.selectedProfileMenuUrl : '/user/profile/eventrelated/general');
    }
  }

  onMenuSelected(selectedUrl: string): void {
    this.profileEvent$.next({
      target: ProfileObserver.ALL,
      type: ProfileEventType.MENU_SELECTED,
      value: selectedUrl
    });
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
