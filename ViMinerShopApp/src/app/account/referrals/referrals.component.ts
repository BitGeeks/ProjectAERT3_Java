import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { take, catchError } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service';
import * as AuthActions from '../../store/auth/auth.actions';
import * as fromApp from '../../store/app.reducers';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { User } from 'src/app/store/model';
import { NotifierService } from 'angular-notifier';
import { Title } from '@angular/platform-browser';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.scss']
})
export class ReferralsComponent implements OnInit {
  refData: Array<User>;
  referralCode: string;
  userData: User;
  buttonLoading = false;

  constructor(
    private accountService: AccountService,
    private store: Store<fromApp.AppState>,
    private router: Router,
    private notifierService: NotifierService,
    private titleMeta: Title,
    private translatePipe: TranslatePipe
  ) { }

  ngOnInit(): void {
    this.titleMeta.setTitle(this.translatePipe.transform('Giới thiệu'));
    this.getReferralList();
    this.getUserInfo();
  }

  getReferralList() {
    this.accountService.getUserRefList().pipe(take(1), catchError(error => {
      return throwError(error);
    }
    )).subscribe(data => {
      this.refData = data;
    });
  }

  createReferralCode() {
    this.buttonLoading = true;
    this.accountService.generateRefCode().subscribe(data => {
      this.buttonLoading = false;
      this.getUserInfo();
      this.notifierService.notify('success', this.translatePipe.transform(`Tạo mã giới thiệu thành công!`));
      // this.referralCode = data;
    });
  }

  getUserInfo() {
    this.accountService.getUser().pipe(take(1), catchError(error => {
      this.store.dispatch(new AuthActions.SignOut());
      this.router.navigate(['/']);
      return throwError(error);
    }
    )).subscribe(data => {
      this.userData = data;
      this.referralCode = data.referralCode;
    });
  }

}
