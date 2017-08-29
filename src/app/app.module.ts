import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MdIconRegistry } from '@angular/material';

import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './features/auth/services/auth.service';
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
    MdIconRegistry
  ],
  bootstrap: [AppComponent]
})

export class AppModule {

  constructor(private translate: TranslateService, mdIconRegistry: MdIconRegistry, private domSanitizer: DomSanitizer) {
    translate.addLangs(['en', 'ja', 'zh']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|ja|zh/) ? browserLang : 'en');
    // translate.use('zh');

    mdIconRegistry.registerFontClassAlias('fontawesome', 'fa');
    mdIconRegistry.registerFontClassAlias('flag-icon-css', 'flag-icon');
    mdIconRegistry.addSvgIconInNamespace('assets', 'logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/logo.svg'));
    mdIconRegistry.addSvgIconInNamespace('assets', 'logo_iconed',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/logo-iconed.svg'));
    mdIconRegistry.addSvgIconInNamespace('assets', 'fa-calendar-plus-o',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/calendar-plus-o.svg'));
  }
}
