import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Http, RequestOptions } from '@angular/http';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import {
  MdButtonModule, MdCardModule, MdIconModule,
  MdListModule, MdMenuModule, MdTooltipModule,
  MdSlideToggleModule, MdInputModule, MdCheckboxModule,
  MdToolbarModule, MdSnackBarModule, MdSidenavModule,
  MdTabsModule, MdSelectModule, MdProgressBarModule, OverlayModule,
  PortalModule, StyleModule, A11yModule
} from '@angular/material';
import {
  CovalentDataTableModule, CovalentMediaModule, CovalentLoadingModule,
  CovalentNotificationsModule, CovalentLayoutModule, CovalentMenuModule,
  CovalentPagingModule, CovalentSearchModule, CovalentStepsModule,
  CovalentCommonModule, CovalentDialogsModule, CovalentExpansionPanelModule
} from '@covalent/core';
import { FlexLayoutModule, } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { AuthConfig } from 'angular2-jwt';

import { ValidateOnBlurDirective } from './directives/validate-onblur.directive';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderService } from './components/loader/loader.service';
import { LocalStorageService } from './services/localstorage.service';
import { MomentService } from './services/moment.service';
import { HttpService } from './services/http.service';
import { MenuComponent } from './components/menu/menu.component';
import { NavListComponent } from './components/navlist/navlist.component';
import { IconComponent } from './components/icon/icon.component';
import { InputComponent } from './components/input/input.component';
import { MessageComponent } from './components/message/message.component';
import { SelectComponent } from './components/select/select.component';
import { DatePickerComponent, DatePickerContentComponent } from './components/datepicker/datepicker.component';
import { CalendarComponent } from './components/datepicker/calendar/calendar.component';

const FLEX_LAYOUT_MODULES: any[] = [
  FlexLayoutModule,
];

const ANGULAR_MODULES: any[] = [
  FormsModule, ReactiveFormsModule,
];

const MATERIAL_MODULES: any[] = [
  MdButtonModule, MdCardModule, MdIconModule,
  MdListModule, MdMenuModule, MdTooltipModule,
  MdSlideToggleModule, MdInputModule, MdCheckboxModule,
  MdToolbarModule, MdSnackBarModule, MdSidenavModule,
  MdTabsModule, MdSelectModule, MdProgressBarModule, OverlayModule,
  PortalModule, StyleModule, A11yModule
];

const COVALENT_MODULES: any[] = [
  CovalentDataTableModule, CovalentMediaModule, CovalentLoadingModule,
  CovalentNotificationsModule, CovalentLayoutModule, CovalentMenuModule,
  CovalentPagingModule, CovalentSearchModule, CovalentStepsModule,
  CovalentCommonModule, CovalentDialogsModule, CovalentExpansionPanelModule
];

export function httpServiceFactory(
  http: Http,
  options: RequestOptions,
  loaderService: LoaderService,
  localStorageService: LocalStorageService
) {
  return new HttpService(new AuthConfig({
    tokenName: 'token',
    tokenGetter: (() => localStorage.getItem('token')),
    globalHeaders: [{'Content-Type': 'application/json'}],
    noJwtError: true
  }), http, options, loaderService, localStorageService);
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ANGULAR_MODULES,
    MATERIAL_MODULES,
    COVALENT_MODULES,
    FLEX_LAYOUT_MODULES,
    OverlayModule,
    TranslateModule.forChild({}),
  ],
  declarations: [
    ValidateOnBlurDirective,
    LoaderComponent,
    MenuComponent,
    NavListComponent,
    IconComponent,
    InputComponent,
    MessageComponent,
    SelectComponent,
    DatePickerComponent,
    DatePickerContentComponent,
    CalendarComponent
  ],
  exports: [
    ANGULAR_MODULES,
    MATERIAL_MODULES,
    COVALENT_MODULES,
    FLEX_LAYOUT_MODULES,
    TranslateModule,
    ValidateOnBlurDirective,
    LoaderComponent,
    MenuComponent,
    NavListComponent,
    IconComponent,
    InputComponent,
    MessageComponent,
    SelectComponent,
    DatePickerComponent
  ],
  providers: [
    LoaderService,
    LocalStorageService,
    MomentService,
    {
      provide: HttpService,
      useFactory: httpServiceFactory,
      deps: [Http, RequestOptions, LoaderService, LocalStorageService]
    }
  ],
  entryComponents: [
    DatePickerContentComponent
  ]
})

export class SharedModule {}
