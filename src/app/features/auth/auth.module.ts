/**
 * Created by LAE84266 on 11/08/2017.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from 'app/features/auth/auth-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { AuthComponent } from 'app/features/auth/auth.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    SharedModule
  ],
  declarations: [
    AuthComponent
  ]
})

export class AuthModule {
}
