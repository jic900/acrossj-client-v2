import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatIconRegistry } from '@angular/material';

import { LOCALE, DEFAULT_LOCALE } from './config/common/app.config';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './features/auth/services/auth.service';
import { ProfileService } from './features/user/services/profile.service';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './main/home/home.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { SearchMenuComponent } from './main/searchmenu/searchmenu.component';

export function translateLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HomeComponent,
    PageNotFoundComponent,
    SearchMenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CovalentHighlightModule,
    CovalentMarkdownModule,
    HttpModule,
    HttpClientModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateLoaderFactory,
        deps: [HttpClient],
      },
      isolate: false
    }),
    AppRoutingModule
  ],
  providers: [
    AuthService,
    ProfileService,
    MatIconRegistry
  ],
  bootstrap: [AppComponent]
})

export class AppModule {

  constructor(private translate: TranslateService, matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    translate.addLangs([LOCALE.CHINESE, LOCALE.JAPANESE, LOCALE.ENGLISH]);
    translate.setDefaultLang(DEFAULT_LOCALE);
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|ja|zh/) ? browserLang : 'en');
    // translate.use('zh');

    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
    matIconRegistry.registerFontClassAlias('flag-icon-css', 'flag-icon');
    matIconRegistry.addSvgIconInNamespace('assets', 'logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/logo.svg'));
    matIconRegistry.addSvgIconInNamespace('assets', 'logo_iconed',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/logo-iconed.svg'));
    matIconRegistry.addSvgIconInNamespace('assets', 'general',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/general.svg'));
    matIconRegistry.addSvgIconInNamespace('assets', 'ski',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/ski.svg'));
    matIconRegistry.addSvgIconInNamespace('assets', 'running',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/running.svg'));
    matIconRegistry.addSvgIconInNamespace('assets', 'camping',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/camping.svg'));
    matIconRegistry.addSvgIconInNamespace('assets', 'hike',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/hike.svg'));
    matIconRegistry.addSvgIconInNamespace('assets', 'bicycle',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/bicycle.svg'));
    matIconRegistry.addSvgIconInNamespace('assets', 'skills',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/skills.svg'));
    matIconRegistry.addSvgIconInNamespace('assets', 'fa-calendar-plus-o',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/calendar-plus-o.svg'));
  }
}
