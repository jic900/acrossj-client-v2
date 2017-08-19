/**
 * Created by LAE84266 on 11/08/2017.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from 'app/features/auth/auth.component';

const authRoutes: Routes = [
  {path: '', redirectTo: '/auth/signin', pathMatch: 'full'},
  {path: ':id', component: AuthComponent}
]

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AuthRoutingModule { }
