import { AuthState } from './../../store/auth/auth.reducer';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as AuthActions from '../../store/auth/auth.actions';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import { Observable } from 'rxjs';
import * as PasswordValidators from '../../../utils//validators/password.validator';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { get } from 'scriptjs';
import { NotifierService } from 'angular-notifier';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  @ViewChild('captcha') captcha: ElementRef;

  signUpForm: FormGroup;
  emailPattern = '^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$';

  authState: Observable<AuthState>;
  nPasswordType = 'password';
  PasswordType = 'password';

  refCode = null;

  isCaptchaSolved = false;

  constructor(private store: Store<fromApp.AppState>,
              public dom: DomSanitizer,
              private route: ActivatedRoute,
              private titleMeta: Title,
              private notifierService: NotifierService,
              private translatePipe: TranslatePipe
  )
  {
  }

  ngOnInit() {
    this.titleMeta.setTitle(this.translatePipe.transform('Đăng ký'));

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
    this.refCode = this.route.snapshot.queryParams.ref;
    this.signUpForm = new FormGroup({
      fname: new FormControl(null, [Validators.required]),
      lname: new FormControl(null, [Validators.required]),
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.pattern(this.emailPattern)]),
      passwordGroup: new FormGroup({
        newPassword: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(52)]),
        newPasswordConfirm: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(52)]),
      }, PasswordValidators.passwordMatchCheckValidator.bind(this))
    });

    this.authState = this.store.select('auth');
  }

  removeTextFromForm = fen => !fen.toLowerCase().includes('password') ? this.signUpForm.controls[fen].setValue('') : this.signUpForm.patchValue({ [fen.split('.')[0]]: { [fen.split('.')[1]]: '' }});

  onUserClickShowPass = fen => fen === 'password' ? this.PasswordType = this.PasswordType === 'text' ? 'password' : 'text' : this.nPasswordType = this.nPasswordType === 'text' ? 'password' : 'text';

  onSubmitted() {
    this.store.dispatch(new AuthActions.SignUp(
      {
        fname: this.signUpForm.value.fname,
        lname: this.signUpForm.value.lname,
        username: this.signUpForm.value.username,
        email: this.signUpForm.value.email,
        password: this.signUpForm.value.passwordGroup.newPassword,
        passwordRepeat: this.signUpForm.value.passwordGroup.newPasswordConfirm,
        refCode: this.refCode
      }));
  }

  ngOnDestroy(): void {
    document.getElementById('maxminesmaxcapt').parentNode.removeChild(document.getElementById('maxminesmaxcapt'));
  }
}
