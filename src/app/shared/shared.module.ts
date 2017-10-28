import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Http, RequestOptions } from '@angular/http';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';

import {
  MatButtonModule, MatCardModule, MatIconModule,
  MatListModule, MatMenuModule, MatTooltipModule,
  MatSlideToggleModule, MatInputModule, MatCheckboxModule,
  MatToolbarModule, MatSnackBarModule, MatSidenavModule,
  MatTabsModule, MatSelectModule, MatProgressBarModule,
  MatChipsModule, MatRadioModule, MatFormFieldModule,
  MatAutocompleteModule
} from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { A11yModule } from '@angular/cdk/a11y';

import {
  CovalentDataTableModule, CovalentMediaModule, CovalentLoadingModule,
  CovalentNotificationsModule, CovalentLayoutModule, CovalentMenuModule,
  CovalentPagingModule, CovalentSearchModule, CovalentStepsModule,
  CovalentCommonModule, CovalentDialogsModule, CovalentExpansionPanelModule,
  TdLoadingService
} from '@covalent/core';
import { FlexLayoutModule, } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { AuthConfig } from 'angular2-jwt';

import { ValidateOnBlurDirective } from './directives/validate-onblur.directive';
import { LocalStorageService } from './services/localstorage.service';
import { MomentService } from './services/moment.service';
import { HttpService } from './services/http.service';
import { MenuComponent } from './components/menu/menu.component';
import { NavListComponent } from './components/navlist/navlist.component';
import { IconComponent } from './components/icon/icon.component';
import { InputComponent } from './components/input/input.component';
import { MessageComponent } from './components/message/message.component';
import { MatSelectComponent } from './components/mat-select/mat-select.component';
import { DatePickerComponent, DatePickerContentComponent } from './components/datepicker/datepicker.component';
import { DateCalendarComponent } from './components/datepicker/calendar/date-calendar.component';
import { DateRangeCalendarComponent } from './components/datepicker/calendar/date-range-calendar.component';
import { SelectComponent } from './components/select/select.component';
import { SimpleSelectComponent } from './components/simple-select/simple-select.component';

const FLEX_LAYOUT_MODULES: any[] = [
  FlexLayoutModule,
];

const ANGULAR_MODULES: any[] = [
  FormsModule, ReactiveFormsModule,
];

const MATERIAL_MODULES: any[] = [
  MatButtonModule, MatCardModule, MatIconModule,
  MatListModule, MatMenuModule, MatTooltipModule,
  MatSlideToggleModule, MatInputModule, MatCheckboxModule,
  MatToolbarModule, MatSnackBarModule, MatSidenavModule,
  MatTabsModule, MatSelectModule, MatProgressBarModule,
  MatChipsModule, MatRadioModule, MatFormFieldModule,
  OverlayModule, PortalModule, A11yModule
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
  loaderService: TdLoadingService,
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
    MenuComponent,
    NavListComponent,
    IconComponent,
    InputComponent,
    MessageComponent,
    MatSelectComponent,
    DatePickerComponent,
    DatePickerContentComponent,
    DateCalendarComponent,
    DateRangeCalendarComponent,
    SimpleSelectComponent,
    SelectComponent
  ],
  exports: [
    ANGULAR_MODULES,
    MATERIAL_MODULES,
    COVALENT_MODULES,
    FLEX_LAYOUT_MODULES,
    TranslateModule,
    ValidateOnBlurDirective,
    MenuComponent,
    NavListComponent,
    IconComponent,
    InputComponent,
    MessageComponent,
    MatSelectComponent,
    DatePickerComponent,
    SimpleSelectComponent,
    SelectComponent
  ],
  providers: [
    LocalStorageService,
    MomentService,
    {
      provide: HttpService,
      useFactory: httpServiceFactory,
      deps: [Http, RequestOptions, TdLoadingService, LocalStorageService]
    }
  ],
  entryComponents: [
    DatePickerContentComponent
  ]
})

export class SharedModule {}
