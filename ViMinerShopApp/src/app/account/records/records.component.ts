import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import { take, catchError } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service';
import * as AuthActions from '../../store/auth/auth.actions';
import * as fromApp from '../../store/app.reducers';
import { UserRecord } from 'src/app/store/model';
import { Title } from '@angular/platform-browser';
import { TranslatePipe } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {
  recordData: Array<UserRecord>;

  page = 0;
  pageSize = 3;
  collectionSize = 0;
  pageLimit = 0;
  disablePrevPageBtn = true;
  disableNextPageBtn = true;

  innerLoading = true;

  constructor(
    private accountService: AccountService,
    private store: Store<fromApp.AppState>,
    private router: Router,
    private titleMeta: Title,
    private translatePipe: TranslatePipe,
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void {
    this.titleMeta.setTitle(this.translatePipe.transform('Lịch sử hoạt động'));
    this.accountService.getRecordListCount()
      .pipe(take(1), catchError(
        error => {
          this.notifierService.notify('error', this.translatePipe.transform('Có lỗi xảy ra trong quá trình thao tác!'));
          return throwError(error);
        }
      ))
      .subscribe((data: number) => {
          this.pageSize = this.accountService.getPageSize();
          this.pageLimit = Math.ceil(data / this.accountService.getPageSize());
          this.collectionSize = data;
          if (this.pageLimit > 1) { this.disableNextPageBtn = false; }
          this.getRecordList();
      });
  }

  getRecordList() {
    this.innerLoading = true;
    this.accountService.getUserRecord(this.page).pipe(take(1), catchError(error => {
      this.store.dispatch(new AuthActions.SignOut());
      this.router.navigate(['/']);
      return throwError(error);
    }
    )).subscribe(data => {
      this.recordData = data;
      this.innerLoading = false;
    });
  }

  userClickNextPage() {
    if (this.disableNextPageBtn) { return; }
    this.page += 1;
    if (this.page >= this.pageLimit - 1) { this.disableNextPageBtn = true; }
    else { this.disablePrevPageBtn = false; }
    this.getRecordList();
  }

  userClickPreviousPage() {
    if (this.disablePrevPageBtn) { return; }
    this.page -= 1;
    if (this.page < this.pageLimit) { this.disableNextPageBtn = false; }
    if (this.page !== 0) { this.disablePrevPageBtn = false; }
    else { this.disablePrevPageBtn = true; }
    this.getRecordList();
  }
}
