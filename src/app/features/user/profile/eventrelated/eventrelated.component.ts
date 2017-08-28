import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

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

export class EventRelatedComponent {

  menuOpened: string;
  menuMode: string;
  subscription: Subscription;

  constructor(private profileService: ProfileService) {
    this.menuMode = this.profileService.getMenuMode();
    this.menuOpened = this.profileService.getDefaultMenuOpened();

    this.subscription = this.profileService.profileEvent$
      .filter((event: IProfileEvent) => {
        return event.target === ProfileObserver.ALL || event.target === ProfileObserver.EVENT_RELATED;
      })
      .subscribe((event: IProfileEvent) => this.onProfileEvent(event));
  }

  onProfileEvent(event: IProfileEvent): void {
    if (event.type === ProfileEventType.MENU_MODE_CHANGE) {
      this.menuMode = event.value;
    } else if (event.type === ProfileEventType.MENU_OPENED_CHANGE) {
      this.menuOpened = event.value;
    }
  }

  // widthIsMedium(width: number): boolean {
  //   return Util.isBreakPointOf(width, MediaQueryBreakPoint.MEDIUM);
  // }
}
