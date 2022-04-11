import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { RouterModule } from '@angular/router';
import { AuthRoutes } from './auth.routes';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import {
  SocialLoginModule,
} from 'angularx-social-login';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthRoutes),
    ReactiveFormsModule,
    NgbModule,
    SocialLoginModule,
    TranslateModule
  ],
  declarations: [SigninComponent, SignupComponent, ForgotPasswordComponent, VerifyAccountComponent],
  providers: [TranslatePipe]
})
export class AuthModule {
}
