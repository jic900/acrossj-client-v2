/**
 * Created by LAE86643 on 8/6/2017.
 */

import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MatSidenav } from '@angular/material';

import {
  ProfileService,
  IProfileEvent,
  ProfileEventType,
  ProfileObserver
} from '../services/profile.service';

@Component({
  selector: 'aj-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
  //   animations: [fadeAnimation],
})

export class ProfileComponent implements AfterViewInit, OnDestroy {

  @ViewChild('sidenav') sideNav: MatSidenav;
  menuMode: string;
  menuOpenedDefault: string;
  eventRelatedSelected: boolean;
  initializing: boolean;
  subscription: Subscription;

  constructor(public profileService: ProfileService) {
    this.menuMode = this.profileService.getMenuMode();
    this.menuOpenedDefault = this.profileService.getDefaultMenuOpened();
    this.eventRelatedSelected = false;
    this.initializing = true;

    this.subscription = this.profileService.profileEvent$
      .filter((event: IProfileEvent) => event.target === ProfileObserver.ALL || event.target === ProfileObserver.PROFILE)
      .subscribe((event: IProfileEvent) => {
        if (this.initializing) {
          setTimeout(() => this.onProfileEvent(event));
        } else {
          this.onProfileEvent(event);
        }
    });
  }

  ngAfterViewInit(): void {
    this.initializing = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.profileService.selectedProfileMenuUrl = null;
  }

  onProfileEvent(event: IProfileEvent): void {
    if (event.type === ProfileEventType.MENU_MODE_CHANGE) {
      this.menuMode = event.value;
    } else if (event.type === ProfileEventType.MENU_OPENED_CHANGE) {
      // console.log('Profile MENU_OPENED_CHANGE: ' + event.value);
      if (event.value === 'true') {
        this.sideNav.open();
      } else {
        this.sideNav.close();
      }
    } else if (event.type === ProfileEventType.MENU_SELECTED) {
      this.eventRelatedSelected = event.value && event.value.includes('eventrelated') ? true : false;
    }
  }
}
