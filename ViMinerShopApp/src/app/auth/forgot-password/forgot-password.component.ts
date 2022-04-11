import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import * as PasswordValidators from '../../../utils//validators/password.validator';
import { get } from 'scriptjs';
import { NotifierService } from 'angular-notifier';
import { Title } from '@angular/platform-browser';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  @ViewChild('captcha') captcha: ElementRef;

  forgotPasswordForm: FormGroup;
  resetPasswordForm: FormGroup;
  emailPattern = '^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$';
  innerLoading = false;

  timeLeft = 0;
  countDownIn = null;
  step = 0;
  PasswordType = 'password';
  nPasswordType = 'password';

  verifyCode: string;
  verifyEmail: string;

  isCaptchaSolved = false;

  constructor(private accountService: AccountService,
              private router: Router,
              private route: ActivatedRoute,
              private notifierService: NotifierService,
              private titleMeta: Title,
              private translatePipe: TranslatePipe
  ) {
  }

  ngOnInit() {
    this.titleMeta.setTitle(this.translatePipe.transform('Quên mật khẩu?'));

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
    /*get("https://static.maxmines.com/tempCaptcha/maxminestempcaptcha.iife.min.js", () => {
      // @ts-ignore
      var mmCaptcha = new Tempcaptcha({
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
    });*/
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.pattern(this.emailPattern)]),
      verificationCode: new FormControl(null, [Validators.required]),
    });
    this.resetPasswordForm = new FormGroup({
      newPassword: new FormControl(null, [Validators.required]),
      newPasswordConfirm: new FormControl(null, [Validators.required]),
    }, PasswordValidators.passwordMatchCheckValidator.bind(this));
  }

  ngOnDestroy(): void {
    document.getElementById('maxminesmaxcapt').parentNode.removeChild(document.getElementById('maxminesmaxcapt'));
  }

  onForgotPasswordFormSubmit() {
    this.innerLoading = true;
    this.accountService.forgotPasswordStep1Finish(this.forgotPasswordForm.value.email, this.forgotPasswordForm.value.verificationCode)
      .pipe(take(1), catchError(
        error => {
          this.innerLoading = false;
          this.notifierService.notify('error', this.translatePipe.transform('Đã có lỗi xảy ra, có thể mã của bạn đã hết hạn, vui lòng sử dụng mã mới!'));
          return throwError(error);
        }
      ))
      .subscribe(res => {
        this.innerLoading = false;
        this.step = 1;
        this.verifyEmail = this.forgotPasswordForm.value.email;
        this.verifyCode = this.forgotPasswordForm.value.verificationCode;
      });
  }

  onResetPasswordFormSubmit() {
    this.innerLoading = true;
    this.accountService.forgotPasswordStep2Finish(this.verifyEmail, this.verifyCode, this.resetPasswordForm.value.newPassword)
      .pipe(take(1), catchError(
        error => {
          this.innerLoading = false;
          this.notifierService.notify('error', this.translatePipe.transform('Đã có lỗi xảy ra, có thể mã của bạn đã hết hạn, vui lòng sử dụng mã mới!'));
          return throwError(error);
        }
      ))
      .subscribe(res => {
        this.innerLoading = false;
        this.step = 2;
      });
  }

  userClickGetCode() {
    if (this.timeLeft > 0) { return; }
    this.innerLoading = true;
    this.accountService.forgotPasswordRequest(this.forgotPasswordForm.value.email)
      .pipe(take(1), catchError(
        error => {
          this.innerLoading = false;
          this.notifierService.notify('error', this.translatePipe.transform('Đã có lỗi xảy ra'));
          return throwError(error);
        }
      ))
      .subscribe(res => {
        this.innerLoading = false;
        this.notifierService.notify('success', this.translatePipe.transform('Tuyệt vời, đã có mã gửi đến địa chỉ email của bạn!'));
        this.timeLeft = 60;
        this.countDownIn = setInterval(() => {
          if (this.timeLeft > 0) { this.timeLeft -= 1; }
          else { clearInterval(this.countDownIn); }
        }, 1000);
      });
  }

  returnLoginPage() {
    this.router.navigate(['/login'], { relativeTo: this.route });
  }
  removeTextFromForm = fen =>  this.forgotPasswordForm.controls[fen].setValue('');

  removeTextFromForm2 = fen => this.resetPasswordForm.controls[fen].setValue('');

  onUserClickShowPass = fen => fen === 'password' ? this.PasswordType = this.PasswordType === 'text' ? 'password' : 'text' : this.nPasswordType = this.nPasswordType === 'text' ? 'password' : 'text';

}
