/**
 * Created by LAE86643 on 8/6/2017.
 */

import {
  Component,
  OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

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

export class ProfileComponent implements OnDestroy {

  menuMode: string;
  menuOpened: string;
  eventRelatedSelected: boolean;
  subscription: Subscription;

  constructor(private profileService: ProfileService) {
    this.menuMode = this.profileService.getMenuMode();
    this.menuOpened = this.profileService.getDefaultMenuOpened();
    this.eventRelatedSelected = false;

    this.subscription = this.profileService.profileEvent$
      .filter((event: IProfileEvent) => {
        return event.target === ProfileObserver.ALL || event.target === ProfileObserver.PROFILE;
      })
      .subscribe((event: IProfileEvent) => this.onProfileEvent(event));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.profileService.selectedProfileMenuUrl = null;
  }

  onProfileEvent(event: IProfileEvent): void {
    if (event.type === ProfileEventType.MENU_MODE_CHANGE) {
      this.menuMode = event.value;
    } else if (event.type === ProfileEventType.MENU_OPENED_CHANGE) {
      console.log('MENU_OPENED_CHANGE: ' + event.value);
      if (event.delay) {
        setTimeout(() => this.menuOpened = event.value);
      } else {
        this.menuOpened = event.value;
      }
    } else if (event.type === ProfileEventType.MENU_SELECTED) {
      this.eventRelatedSelected = event.value.includes('eventrelated') ? true : false;
    }
  }
}
