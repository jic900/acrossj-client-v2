import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found.component';

export function translateLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent
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

    mdIconRegistry.addSvgIconInNamespace('assets', 'teradata',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/teradata.svg'));
    mdIconRegistry.addSvgIconInNamespace('assets', 'github',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/github.svg'));
    mdIconRegistry.addSvgIconInNamespace('assets', 'covalent',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/covalent.svg'));
    mdIconRegistry.addSvgIconInNamespace('assets', 'covalent-mark',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/covalent-mark.svg'));
    mdIconRegistry.addSvgIconInNamespace('assets', 'teradata-ux',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/teradata-ux.svg'));
    mdIconRegistry.addSvgIconInNamespace('assets', 'appcenter',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/appcenter.svg'));
    mdIconRegistry.addSvgIconInNamespace('assets', 'listener',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/listener.svg'));
    mdIconRegistry.addSvgIconInNamespace('assets', 'querygrid',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/querygrid.svg'));
  }
}
