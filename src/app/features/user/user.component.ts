import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

import { AppConfig, MediaQueryBreakPoint } from 'app/config/common/app.config';
import { Util } from 'app/shared/util/util';
import { ProfileService } from 'app/features/user/services/profile.service';
import { UserConfig, IUser } from 'app/config/user/user.config';
import { IComponent } from 'app/config/interfaces/component.interface';
import { ILinkElement } from 'app/config/interfaces/link-element.interface';

@Component({
  selector: 'aj-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent {

  userData: IComponent;
  userElements: IUser;
  tabLinks: ILinkElement[];
  backgroundImage: string;

  constructor(private profileService: ProfileService, private router: Router) {
    this.userData = new UserConfig();
    this.userElements = _.mapKeys(this.userData.elements, 'name');
    this.tabLinks = this.userData.elements.filter((element) => {
      return element.type === 'link';
    });
    this.backgroundImage = AppConfig.USER_BACKGROUND;
  }

  getProfileLink(): string {
    if (this.profileService.selectedProfileMenuUrl) {
      return this.profileService.selectedProfileMenuUrl;
    } else {
      return '/user/profile/personalinfo';
    }
  }

  widthIsMedium(): boolean {
    return Util.isBreakPointOf(window.innerWidth, MediaQueryBreakPoint.MEDIUM);
  }
}
