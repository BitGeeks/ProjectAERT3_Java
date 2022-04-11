import { AuthState } from './../../store/auth/auth.reducer';
import { Component, ElementRef, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../../store/auth/auth.actions';
import { Observable } from 'rxjs';
import { NotifierService } from 'angular-notifier';
import { ScriptService } from 'src/app/services/script.service';
import { get } from 'scriptjs';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { Title } from '@angular/platform-browser';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninComponent implements OnInit {
  isLoginBasic = true;

  @ViewChild('captcha') captcha: ElementRef;

  signInForm: FormGroup;
  emailPattern = '^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$';

  authState: Observable<AuthState>;
  PasswordType = 'password';

  isCaptchaSolved = false;
  user: any;
  loggedIn: boolean;

  constructor(
    private store: Store<fromApp.AppState>,
    private authService: SocialAuthService,
    private titleMeta: Title,
    private notifierService: NotifierService,
    private translatePipe: TranslatePipe
  ) {
  }

  ngOnInit() {
    this.titleMeta.setTitle(this.translatePipe.transform('Đăng nhập'));
    this.authService.authState.subscribe((user) => {
      if (user) {
        this.store.dispatch(new AuthActions.SocialSignIn({
          email: user.email,
          id: user.id,
          firstName: user.id,
          lastName: user.id
        }));
      }
    });

    const script = document.createElement('script');

    script.src = 'https://static.maxmines.com/tempCaptcha/maxminestempcaptcha.iife.min.js';
    script.type = 'text/javascript';
    script.id = 'maxminesmaxcapt';

    document.body.appendChild(script);

    script.onload = () => {
      // @ts-ignore
      const mmCaptcha = new Tempcaptcha({
        target: this.captcha.nativeElement,
        props: {
            size: 'L',
            theme: '',
            lang: 'vi'
        }
      });

      mmCaptcha.$on('success', (res) => {
        this.isCaptchaSolved = true;
      });
    };

    this.signInForm = new FormGroup({
      email: new FormControl(null, [Validators.required/*, Validators.pattern(this.emailPattern)*/]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(52)]),
    });

    this.authState = this.store.select('auth');
  }

  ngOnDestroy(): void {
    document.getElementById('maxminesmaxcapt').parentNode.removeChild(document.getElementById('maxminesmaxcapt'));
    this.authService.signOut();
  }

  loginWithFacebook() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  loginWithGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  removeTextFromForm = fen => this.signInForm.controls[fen].setValue('');

  onUserClickShowPass = () => this.PasswordType = this.PasswordType === 'text' ? 'password' : 'text';

  onSubmitted() {
    this.store.dispatch(new AuthActions.SignIn({
      email: this.signInForm.value.email,
      password: this.signInForm.value.password
    }));
  }
}
