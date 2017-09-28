import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

import { MediaQueryBreakPoint } from 'app/config/common/app.config';
import { IComponent, ILinkElement } from 'app/config/interfaces';
import {
  EventRelatedMenuConfig,
  IEventRelatedMenu
} from 'app/config/user/profile/eventrelated/eventrelatedmenu.config';
import { Util } from 'app/shared/util/util';
import {
  ProfileService,
  IProfileEvent,
  ProfileEventType,
  ProfileObserver
} from 'app/features/user/services/profile.service';

@Component({
  selector: 'aj-eventrelatedmenu',
  templateUrl: './eventrelatedmenu.component.html',
  styleUrls: ['./eventrelatedmenu.component.scss']
})
export class EventRelatedMenuComponent implements OnDestroy {

  menuConfig: IComponent;
  menuElements: IEventRelatedMenu;
  selectedIndex: number;
  subscription: Subscription;

  constructor(private profileService: ProfileService, private router: Router) {
    this.menuConfig = new EventRelatedMenuConfig();
    this.menuElements = _.mapKeys(this.menuConfig.elements, 'name');

    this.subscription = this.profileService.profileEvent$
      .filter((event: IProfileEvent) => {
        return event.target === ProfileObserver.ALL || event.target === ProfileObserver.EVENT_RELATED_MENU;
      })
      .filter((event: IProfileEvent) => event.type === ProfileEventType.MENU_SELECTED)
      .subscribe((event: IProfileEvent) => this.onMenuSelected(event.value));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onMenuSelected(selectedUrl: string): void {
    this.menuElements.menuList.list.forEach((item, index) => {
      if ((<ILinkElement>item).link.path === selectedUrl) {
        this.selectedIndex = index;
      }
    });
  }
  // onClicked(event): void {
  //   this.router.navigateByUrl('/user/profile/menu');
  // }

  widthLessThanMedium(): boolean {
    return Util.isBreakPointOf(window.innerWidth, MediaQueryBreakPoint.LESS_THAN_MEDIUM);
  }
}
