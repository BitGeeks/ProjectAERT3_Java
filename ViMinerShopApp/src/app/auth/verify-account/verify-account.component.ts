import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslatePipe } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { Observable, throwError } from 'rxjs';
import { take, catchError } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service';
import { AuthState } from 'src/app/store/auth/auth.reducer';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../../store/auth/auth.actions';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent implements OnInit {
  verifyForm: FormGroup;

  authState: Observable<AuthState>;
  forgotPasswordForm: any;
  innerLoading: boolean;
  step: number;
  verifyEmail: any;
  verifyCode: any;

  constructor(
    private store: Store<fromApp.AppState>,
    private accountService: AccountService,
    private notifierService: NotifierService,
    private titleMeta: Title,
    private translatePipe: TranslatePipe,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.titleMeta.setTitle(this.translatePipe.transform('Xác minh tài khoản'));
    this.verifyForm = new FormGroup({
      verifyCode: new FormControl(null, [Validators.required])
    });

    this.authState = this.store.select('auth');
    this.authState
      .pipe(take(1))
      .subscribe(data => {
        if (!data.authenticated) {
          this.notifierService.notify('error', this.translatePipe.transform('Bạn phải đăng nhập trước đã!'));
          this.router.navigate(['/login']);
        } else if (data.isActive) {
          this.router.navigate(['/']);
        }
      });
  }

  onUserClickResendMail() {
    this.accountService.resendVerifyCode()
      .pipe(take(1), catchError(
        error => {
          this.innerLoading = false;
          this.notifierService.notify('error', this.translatePipe.transform('Bạn hành động quá nhanh!'));
          return throwError(error);
        }
      ))
      .subscribe(res => {
        this.innerLoading = false;
        this.notifierService.notify('success', this.translatePipe.transform('Một liên kết xác nhận mới đã được gửi về địa chỉ email của bạn'));
      });
  }

  removeTextFromForm = fen => this.verifyForm.controls[fen].setValue('');

}
