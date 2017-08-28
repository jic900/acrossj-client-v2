import {
  Component,
  Input
} from '@angular/core';

import { MediaQueryBreakPoint } from 'app/config/common/app.config';
import { Util } from 'app/shared/util/util';
import { ProfileDetailConfig } from 'app/config/user/profile/profiledetail.config';
import { ILinkElement } from 'app/config/interfaces/link-element.interface';

@Component({
  selector: 'aj-profiledetail',
  templateUrl: './profiledetail.component.html',
  styleUrls: ['./profiledetail.component.scss']
})
export class ProfileDetailComponent {

  @Input() title: string;
  backLinkIcon: ILinkElement;

  constructor() {
    this.backLinkIcon = new ProfileDetailConfig().elements[0];
  }

  widthLessThanMedium(): boolean {
    return Util.isBreakPointOf(window.innerWidth, MediaQueryBreakPoint.LESS_THAN_MEDIUM);
  }
}
