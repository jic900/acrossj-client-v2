import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MatSidenav } from '@angular/material';

import { MediaQueryBreakPoint } from 'app/config/common/app.config';
import { Util } from 'app/shared/util/util';
import { EventRelatedConfig } from 'app/config/user/profile/eventrelated/eventrelated.config';
import {
  ProfileService,
  IProfileEvent,
  ProfileEventType,
  ProfileObserver
} from 'app/features/user/services/profile.service';

@Component({
  selector: 'aj-eventrelated',
  templateUrl: './eventrelated.component.html',
  styleUrls: ['./eventrelated.component.scss']
})

export class EventRelatedComponent implements AfterViewInit, OnDestroy {

  @ViewChild('sidenav') sideNav: MatSidenav;
  title: string;
  menuOpenedDefault: string;
  menuMode: string;
  initializing: boolean;
  subscription: Subscription;

  constructor(private profileService: ProfileService) {
    this.title = new EventRelatedConfig().elements[0].display;
    this.menuMode = this.profileService.getMenuMode();
    this.menuOpenedDefault = this.profileService.getDefaultMenuOpened();
    this.initializing = true;

    this.subscription = this.profileService.profileEvent$
      .filter((event: IProfileEvent) => event.target === ProfileObserver.ALL || event.target === ProfileObserver.EVENT_RELATED)
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onProfileEvent(event: IProfileEvent): void {
    // console.log('EventRelated onProfileEvent: ' + event.value);
    if (event.type === ProfileEventType.MENU_MODE_CHANGE) {
      this.menuMode = event.value;
    } else if (event.type === ProfileEventType.MENU_OPENED_CHANGE) {
      // console.log('EventRelated MENU_OPENED_CHANGE: ' + event.value);
      if (event.value === 'true') {
        this.sideNav.open();
      } else {
        this.sideNav.close();
      }
    }
  }

  widthIsMedium(): boolean {
    return Util.isBreakPointOf(window.innerWidth, MediaQueryBreakPoint.MEDIUM);
  }
}
