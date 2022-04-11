import { Orders, PaymentProvider } from './../../store/model';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, throwError } from 'rxjs';
import { OrderService } from '../../services/order.service';
import { catchError, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { getLocaleDate } from 'src/utils/date';
import { NotifierService } from 'angular-notifier';
import { Title } from '@angular/platform-browser';
import { TranslatePipe } from '@ngx-translate/core';
import { BrowseState } from 'src/app/store/browse/browse.reducer';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.scss']
})
export class ListOrdersComponent implements OnInit {

  orders: Array<Orders>;
  fetchError = false;
  noOrders = false;
  page = 0;
  pageSize = 3;
  collectionSize = 0;
  activeTab = 1;
  providerList: Array<PaymentProvider>;
  pageLimit = 0;
  disablePrevPageBtn = true;
  disableNextPageBtn = true;

  browseState: Observable<BrowseState>;
  browserSubscription: Subscription;
  currency = 'USD';
  currencyRate = 1;

  innerLoading = true;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private notifierService: NotifierService,
    private titleMeta: Title,
    private translatePipe: TranslatePipe,
    private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit() {
    this.titleMeta.setTitle(this.translatePipe.transform('Danh sách đơn'));
    this.browseState = this.store.select('browse');
    this.getPaymentMethod();
    this.initPaginate(this.activeTab);
    this.browserSubscription = this.browseState.subscribe(data => {
      this.currency = data.currentCurrency;
      if (JSON.stringify(data.exchangeRates) !== '{}') {
        this.currencyRate = data.exchangeRates[data.currentCurrency];
      }
    });
  }

  initPaginate(tab: number) {
    this.disablePrevPageBtn = true;
    this.disableNextPageBtn = true;
    this.orderService.getAllOrdersCountByType(this.activeTab)
      .pipe(take(1), catchError(
        error => {
          this.notifierService.notify('error', this.translatePipe.transform('Đã có lỗi xảy ra trong quá trình lấy đơn đặt hàng'));
          return throwError(error);
        }
      ))
      .subscribe((data: number) => {
        this.pageSize = this.orderService.getPageSize();
        this.pageLimit = Math.ceil(data / this.orderService.getPageSize());
        this.collectionSize = data;
        if (this.pageLimit > 1) { this.disableNextPageBtn = false; }
        this.activeTab = tab;
        this.onUserClickTab(tab);
      });
  }

  getPaymentMethod() {
    this.orderService.getPaymentProvider().pipe(take(1), catchError(
      error => {
        return throwError(error);
      }
    )).subscribe((res: Array<PaymentProvider>) => {
      this.providerList = res;
    });
  }

  getPaymentProvider(pProviderId: number) {
    const providerMatch = this.providerList.filter(pl => pl.id === pProviderId);
    return providerMatch.length !== 0 ? providerMatch[0].name : this.translatePipe.transform('Chưa đặt');
  }

  convertDate(date: number) {
    return getLocaleDate(date);
  }

  handlePaybtnType(orderId: number) {
    this.router.navigate([`/checkout/payment/${orderId}`]);
  }

  userClickNextPage() {
    if (this.disableNextPageBtn) { return; }
    this.page += 1;
    if (this.page + 1 === this.pageLimit) { this.disableNextPageBtn = true; }
    if (this.page !== 0) { this.disablePrevPageBtn = false; }
    this.onUserClickTab(this.activeTab);
  }

  userClickPreviousPage() {
    if (this.disablePrevPageBtn) { return; }
    this.page -= 1;
    if (this.page < this.pageLimit) { this.disableNextPageBtn = false; }
    if (this.page !== 0) { this.disablePrevPageBtn = false; }
    else { this.disablePrevPageBtn = true; }
    this.onUserClickTab(this.activeTab);
  }

  pageNavigation(orderType: number) {
    this.orders = [];
    this.innerLoading = true;
    this.orderService.getAllOrdersByType(this.page, orderType)
      .pipe(take(1), catchError(
        error => {
          this.fetchError = true;
          this.innerLoading = false;
          return throwError(error);
        }
      ))
      .subscribe(data => {
        this.orders = data;
        this.innerLoading = false;
      });
  }

  pageNavigationUnpaid() {
    this.orders = [];
    this.innerLoading = true;
    this.orderService.getUnpaidOrder(this.page)
      .pipe(take(1), catchError(
        error => {
          this.fetchError = true;
          this.innerLoading = false;
          return throwError(error);
        }
      ))
      .subscribe(data => {
        this.orders = data;
        this.innerLoading = false;
      });
  }

  pageNavigationPending() {
    this.orders = [];
    this.innerLoading = true;
    this.orderService.getPendingOrder(this.page)
      .pipe(take(1), catchError(
        error => {
          this.fetchError = true;
          this.innerLoading = false;
          return throwError(error);
        }
      ))
      .subscribe(data => {
        this.orders = data;
        this.innerLoading = false;
      });
  }

  pageNavigationUnshipped() {
    this.orders = [];
    this.innerLoading = true;
    this.orderService.getUnshippedOrder(this.page)
      .pipe(take(1), catchError(
        error => {
          this.fetchError = true;
          this.innerLoading = false;
          return throwError(error);
        }
      ))
      .subscribe(data => {
        this.orders = data;
        this.innerLoading = false;
      });
  }

  pageNavigationShipping() {
    this.orders = [];
    this.innerLoading = true;
    this.orderService.getShippingOrder(this.page)
      .pipe(take(1), catchError(
        error => {
          this.fetchError = true;
          this.innerLoading = false;
          return throwError(error);
        }
      ))
      .subscribe(data => {
        this.orders = data;
        this.innerLoading = false;
      });
  }

  pageNavigationShipped() {
    this.orders = [];
    this.innerLoading = true;
    this.orderService.getShippedOrder(this.page)
      .pipe(take(1), catchError(
        error => {
          this.fetchError = true;
          this.innerLoading = false;
          return throwError(error);
        }
      ))
      .subscribe(data => {
        this.orders = data;
        this.innerLoading = false;
      });
  }

  pageNavigationExpired() {
    this.orders = [];
    this.innerLoading = true;
    this.orderService.getExpiredOrder(this.page)
      .pipe(take(1), catchError(
        error => {
          this.fetchError = true;
          this.innerLoading = false;
          return throwError(error);
        }
      ))
      .subscribe(data => {
        this.orders = data;
        this.innerLoading = false;
      });
  }

  onUserClickTab(tabNum) {
    if (this.activeTab !== tabNum) {
      this.initPaginate(tabNum);
      return;
    }
    this.activeTab = tabNum;
    this.pageNavigation(tabNum);
    /*switch (tabNum) {
      case 1:
        
        break;
      case 2:
        this.pageNavigationUnpaid();
        break;
      case 3:
        this.pageNavigationPending();
        break;
      case 4:
        this.pageNavigationUnshipped();
        break;
      case 5:
        this.pageNavigationShipping();
        break;
      case 6:
        this.pageNavigationShipped();
        break;
      default:
        this.pageNavigationExpired();
    }*/
  }

  renderStatus(statusId: number) {
    switch (statusId) {
      case 0: return this.translatePipe.transform('Chưa thanh toán');
      case 1: return this.translatePipe.transform('Đang chờ');
      case 2: return this.translatePipe.transform('Chưa giao');
      case 3: return this.translatePipe.transform('Đang giao');
      case 4: return this.translatePipe.transform('Đã giao');
      default: return this.translatePipe.transform('Hết hạn');
    }
  }

  goToItem(productUrl) {
    this.router.navigate(['/detail/', productUrl]);
  }

  ngOnDestroy(): void {
    if (this.browserSubscription) {
      this.browserSubscription.unsubscribe();
    }
  }
}
