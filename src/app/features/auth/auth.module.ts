/**
 * Created by LAE84266 on 11/08/2017.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from 'app/features/auth/auth-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { AuthComponent } from 'app/features/auth/auth.component';
import { SignUpComponent } from 'app/features/auth/signup/signup.component';
import { SignInComponent } from 'app/features/auth/signin/signin.component';
import { VerifyEmailComponent } from 'app/features/auth/verifyemail/verifyemail.component';
import { ForgotPasswordComponent } from 'app/features/auth/forgotpassword/forgotpassword.component';
import { ResetPasswordComponent } from 'app/features/auth/resetpassword/resetpassword.component';
import { SendVerifyEmailComponent } from 'app/features/auth/sendverifyemail/sendverifyemail.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    SharedModule
  ],
  declarations: [
    AuthComponent,
    SignUpComponent,
    SignInComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    SendVerifyEmailComponent
  ]
})

export class AuthModule {
}
