/**
 * Created by LAE86643 on 8/6/2017.
 */

import {
  Component,
  OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

import { MediaQueryBreakPoint } from 'app/config/common/app.config';
import { Util } from 'app/shared/util/util';
import {
  ProfileService,
  IProfileEvent,
  ProfileObserver,
  ProfileEventType
} from 'app/features/user/services/profile.service';
import { ProfileMenuConfig, IProfileMenu } from 'app/config/user/profile/profilemenu.config';
import { IComponent, ILinkElement } from 'app/config/interfaces';
import { IListItem } from '../../../../config/interfaces/list-item';

@Component({
  selector: 'aj-profilemenu',
  templateUrl: './profilemenu.component.html',
  styleUrls: ['./profilemenu.component.scss']
})

export class ProfileMenuComponent implements OnDestroy {

  menuConfig: IComponent;
  menuElements: IProfileMenu;
  selectedIndex: number;
  subscription: Subscription;

  constructor(private profileService: ProfileService) {
    this.menuConfig = new ProfileMenuConfig();
    this.menuElements = _.mapKeys(this.menuConfig.elements, 'name');

    this.subscription = this.profileService.profileEvent$
      .filter((event: IProfileEvent) => {
        return event.target === ProfileObserver.ALL || event.target === ProfileObserver.PROFILE_MENU;
      })
      .filter((event: IProfileEvent) => event.type === ProfileEventType.MENU_SELECTED)
      .subscribe((event: IProfileEvent) => this.onMenuSelected(event.value));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onMenuSelected(selectedUrl: string): void {
    this.menuElements.menuList.list.forEach((item, index) => {
      const menuName = (<ILinkElement>item).link.path.split('/')[3];
      const selectedMenuName = selectedUrl.split('/')[3];
      if (menuName === selectedMenuName) {
        this.selectedIndex = index;
      }
    });
  }

  onClicked(item: IListItem): void {
    if (item.type === 'link') {
      const linkItem = <ILinkElement> item;
      if (linkItem.link.path === this.profileService.selectedProfileMenuUrl) {
        this.profileService.onMenuOpenedChanged(ProfileObserver.PROFILE, 'false');
      }
    }
  }

  widthLessThanMedium(): boolean {
    return Util.isBreakPointOf(window.innerWidth, MediaQueryBreakPoint.LESS_THAN_MEDIUM);
  }
}
