import {
  Component,
  Input
} from '@angular/core';
import { Router } from '@angular/router';

import { MediaQueryBreakPoint } from 'app/config/common/app.config';
import { Util } from 'app/shared/util/util';
import { ProfileDetailConfig } from 'app/config/user/profile/profiledetail.config';
import { ProfileService } from 'app/features/user/services/profile.service';
import { IElement } from 'app/config/interfaces/element.interface';

@Component({
  selector: 'aj-profiledetail',
  templateUrl: './profiledetail.component.html',
  styleUrls: ['./profiledetail.component.scss']
})
export class ProfileDetailComponent {

  @Input() title: string;
  backLinkIcon: IElement;

  constructor(private profileService: ProfileService, private router: Router) {
    this.backLinkIcon = new ProfileDetailConfig().elements[0];
  }

  onClicked($event): void {
    if (this.profileService.selectedProfileMenuUrl.includes('eventrelated')) {
      this.router.navigateByUrl('/user/profile/eventrelated/menu');
    } else {
      this.router.navigateByUrl('/user/profile/menu');
    }
  }

  widthLessThanMedium(): boolean {
    return Util.isBreakPointOf(window.innerWidth, MediaQueryBreakPoint.LESS_THAN_MEDIUM);
  }
}
