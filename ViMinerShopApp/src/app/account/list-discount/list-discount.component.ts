import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { TranslatePipe } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { Observable, Subscription, throwError } from 'rxjs';
import { take, catchError } from 'rxjs/operators';
import { DonateDialogComponent } from 'src/app/donate-coupon/donate-dialog/donate-dialog.component';
import { OrderService } from 'src/app/services/order.service';
import { BrowseState } from 'src/app/store/browse/browse.reducer';
import { Coupon } from 'src/app/store/model';
import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-list-discount',
  templateUrl: './list-discount.component.html',
  styleUrls: ['./list-discount.component.scss']
})
export class ListDiscountComponent implements OnInit {
  couponList: Array<Coupon>;
  selectedTab = 0;

  browseState: Observable<BrowseState>;
  browserSubscription: Subscription;
  currency = 'USD';
  currencyRate = 1;

  page = 0;
  pageSize = 3;
  collectionSize = 0;
  pageLimit = 0;
  disablePrevPageBtn = true;
  disableNextPageBtn = true;

  innerLoading = true;

  constructor(
    private notifierService: NotifierService,
    private router: Router,
    private orderService: OrderService,
    private modalService: NgbModal,
    private titleMeta: Title,
    private translatePipe: TranslatePipe,
    private store: Store<fromApp.AppState>
  )
  {
  }

  ngOnInit(): void {
    this.browseState = this.store.select('browse');
    this.titleMeta.setTitle(this.translatePipe.transform('Danh sách coupon'));
    this.initPaginate();
    this.browserSubscription = this.browseState.subscribe(data => {
      this.currency = data.currentCurrency;
      if (JSON.stringify(data.exchangeRates) !== '{}') {
        this.currencyRate = data.exchangeRates[data.currentCurrency];
      }
    });
  }

  initPaginate() {
    this.disableNextPageBtn = true;
    this.disablePrevPageBtn = true;
    this.orderService.getUserCouponCountByType(this.selectedTab)
      .pipe(take(1), catchError(
        error => {
          this.notifierService.notify('error', this.translatePipe.transform('Có lỗi xảy ra trong quá trình thao tác!'));
          return throwError(error);
        }
      ))
      .subscribe((data: number) => {
          this.pageSize = this.orderService.getPageSize();
          this.pageLimit = Math.ceil(data / this.orderService.getPageSize());
          this.collectionSize = data;
          if (this.pageLimit > 1) { this.disableNextPageBtn = false; }
          this.onClickSelectTab(this.selectedTab);
      });
  }

  onClickSelectTab(selectTab: number) {
    this.innerLoading = true;
    if (this.selectedTab !== selectTab) {
      this.selectedTab = selectTab;
      this.initPaginate();
      return;
    }
    switch (selectTab) {
      case 0:
        this.getUserAvailableCoupon();
        break;
      case 1:
        this.getUserUsedCoupon();
        break;
      default:
        this.getUserExpiredCoupon();
    }
  }

  userClickNextPage() {
    if (this.disableNextPageBtn) { return; }
    this.page += 1;
    if (this.page >= this.pageLimit - 1) { this.disableNextPageBtn = true; }
    else { this.disablePrevPageBtn = false; }
    this.onClickSelectTab(this.selectedTab);
  }

  userClickPreviousPage() {
    if (this.disablePrevPageBtn) { return; }
    this.page -= 1;
    if (this.page < this.pageLimit) { this.disableNextPageBtn = false; }
    if (this.page !== 0) { this.disablePrevPageBtn = false; }
    else { this.disablePrevPageBtn = true; }
    this.onClickSelectTab(this.selectedTab);
  }

  getUserAvailableCoupon() {
    this.orderService.getUserAvailableCoupon(this.page)
      .pipe(take(1), catchError(
        error => {
          return throwError(error);
        }
      ))
      .subscribe(data => {
        this.couponList = data;
        this.innerLoading = false;
    });
  }

  getUserUsedCoupon() {
    this.orderService.getUserUsedCoupon(this.page)
      .pipe(take(1), catchError(
        error => {
          return throwError(error);
        }
      ))
      .subscribe(data => {
        this.couponList = data;
        this.innerLoading = false;
    });
  }

  getUserExpiredCoupon() {
    this.orderService.getUserExpiredCoupon(this.page)
      .pipe(take(1), catchError(
        error => {
          return throwError(error);
        }
      ))
      .subscribe(data => {
        this.couponList = data;
        this.innerLoading = false;
    });
  }

  onDonateSubmitted = () =>
    this.onClickSelectTab(this.selectedTab)

  FormExceptionOccurEv = (error: string) =>
    this.notifierService.notify('error', error)

  onUserClickDonate(coupon: Coupon) {
    const DonateDialog = this.modalService.open(DonateDialogComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
    DonateDialog.componentInstance.FormSubmittedEv.subscribe($e => this.onDonateSubmitted());
    DonateDialog.componentInstance.FormExceptionOccurEv.subscribe($e => this.FormExceptionOccurEv($e));
    DonateDialog.componentInstance.couponState = coupon;
  }

  ngOnDestroy(): void {
    if (this.browserSubscription) {
      this.browserSubscription.unsubscribe();
    }
  }
}
