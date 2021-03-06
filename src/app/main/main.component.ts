import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';

import { MediaQueryBreakPoint } from '../config/common/app.config';
import { Util } from '../shared/util/util';
import { AuthService } from 'app/features/auth/services/auth.service';
import {
  MainConfig, IMainConfig, ISideNavConfig, IHeaderConfig, IFooterConfig,
  IMain, ISideNav, IHeader, IFooter
} from '../config/main/main.config';
import { IListItem } from '../config/interfaces/list-item';

@Component({
  selector: 'aj-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
  // encapsulation: ViewEncapsulation.None
})

export class MainComponent implements OnInit, OnDestroy {

  mainConfig: IMainConfig;
  mainData: IMain;
  sideNavConfig: ISideNavConfig;
  sideNavData: ISideNav;
  headerConfig: IHeaderConfig;
  headerData: IHeader;
  footerConfig: IFooterConfig;
  footerData: IFooter;
  authenticated: boolean;
  subscription: Subscription;

  constructor(private authService: AuthService, private router: Router, private translateService: TranslateService) {
    this.mainConfig = new MainConfig();
    this.mainData = _.mapKeys(this.mainConfig.elements, 'name');
    this.sideNavConfig = this.mainData.sideNav;
    this.sideNavData = _.mapKeys(this.sideNavConfig.elements, 'name');
    this.headerConfig = this.mainData.header;
    this.headerData = _.mapKeys(this.headerConfig.elements, 'name');
    this.footerConfig = this.mainData.footer;
    this.footerData = _.mapKeys(this.footerConfig.elements, 'name');
    this.authenticated = authService.authenticated;
  }

  ngOnInit(): void {
    this.subscription = this.authService.authenticated$.subscribe(
      isAuthenticated => this.authenticated = isAuthenticated);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getName(): string {
    return this.authenticated ? `Hello, ${this.authService.getUsername()}` : '';
  }

  widthIsMedium(): boolean {
    return Util.isBreakPointOf(window.innerWidth, MediaQueryBreakPoint.MEDIUM);
  }

  onClicked(item: IListItem): void {
    if (item.name.startsWith('lang')) {
      const selectedLang = item.name.substring(5);
      const curLang = this.translateService.currentLang;
      if (selectedLang !== curLang) {
        this.translateService.use(selectedLang);
      }
    }
  }
}
