/**
 * Created by LAE84266 on 11/08/2017.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './features/auth/services/authguard.service';
import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { CustomPreloadingStrategy } from './custom-preloading-strategy';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './main/home/home.component';
import { PageNotFoundComponent } from './page-not-found.component';

const appRoutes: Routes = [
  {path: '', component: MainComponent,
    children: [
      {path: '', redirectTo: '/home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {
        path: 'auth',
        loadChildren: 'app/features/auth/auth.module#AuthModule',
        data: {preload: true}
      },
      // {
      //   path: 'user',
      //   loadChildren: 'common/features/user/user.module#UserModule',
      //   data: {preload: true}
      // },
      // {
      //   path: 'event',
      //   loadChildren: 'common/features/event/event.module#EventModule',
      //   data: {preload: true}
      // },
      // {
      //   path: 'admin',
      //   loadChildren: 'common/admin/admin.module#AdminModule',
      //   canLoad: [AuthGuard]
      // },
      {path: '404', component: PageNotFoundComponent},
      {path: '**', redirectTo: '/404'}
    ]
  }];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: CustomPreloadingStrategy})
    // RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard,
    CanDeactivateGuard,
    CustomPreloadingStrategy
  ]
})
export class AppRoutingModule { }
