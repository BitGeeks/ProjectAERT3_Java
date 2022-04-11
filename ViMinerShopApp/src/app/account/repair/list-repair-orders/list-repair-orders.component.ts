import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { TranslatePipe } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { Observable, Subscription, throwError } from 'rxjs';
import { take, catchError } from 'rxjs/operators';
import { OrderService } from 'src/app/services/order.service';
import { RepairService } from 'src/app/services/repair.service';
import { BrowseState } from 'src/app/store/browse/browse.reducer';
import { PaymentProvider, RepairOrder } from 'src/app/store/model';
import { RepairOrderPaymentDialogComponent } from '../repair-order-payment-dialog/repair-order-payment-dialog.component';
import * as fromApp from '../../../store/app.reducers';

@Component({
  selector: 'app-list-repair-orders',
  templateUrl: './list-repair-orders.component.html',
  styleUrls: ['./list-repair-orders.component.scss']
})
export class ListRepairOrdersComponent implements OnInit {
  activeTab = 0;
  fetchError = false;
  rOrders: Array<RepairOrder>;
  page = 0;

  pageSize: number;
  pageLimit: number;
  collectionSize: number;

  disablePrevPageBtn = true;
  disableNextPageBtn = true;

  providerList: Array<PaymentProvider>;

  browseState: Observable<BrowseState>;
  browserSubscription: Subscription;
  currency = 'USD';
  currencyRate = 1;

  innerLoading = true;

  constructor(
    private repairService: RepairService,
    private orderService: OrderService,
    private modalService: NgbModal,
    private notifierService: NotifierService,
    private titleMeta: Title,
    private translatePipe: TranslatePipe,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.titleMeta.setTitle(this.translatePipe.transform('Danh sách đơn sửa chữa'));
    this.browseState = this.store.select('browse');
    this.getPaymentProvider();
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
    this.repairService.getRepairOrdersCount(this.activeTab - 1)
    .pipe()
    .subscribe((data: number) => {
      if (data === 0) {
        this.innerLoading = false;
        this.rOrders = [];
      } else {
        this.pageSize = this.repairService.getPageSize();
        this.pageLimit = Math.ceil(data / this.repairService.getPageSize());
        this.collectionSize = data;
        if (this.pageLimit > 1) { this.disableNextPageBtn = false; }
        this.pageNavigationByType();
      }
    });
  }

  repairOrderPayment(repairOrder: RepairOrder) {
    const RepairOrderUpdate = this.modalService.open(RepairOrderPaymentDialogComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
    RepairOrderUpdate.componentInstance.initialState = {
      repair_id: repairOrder.repair_id,
      provider: repairOrder.provider,
      price: repairOrder.price,
      providers: this.providerList
    };
    RepairOrderUpdate.componentInstance.FormSubmittedEv.subscribe($e => this.initPaginate());
    RepairOrderUpdate.componentInstance.FormExceptionOccurEv.subscribe($e => this.onException($e));
  }

  onException(ev: string) {
    this.notifierService.notify('error', ev);
  }

  getPaymentProvider() {
    this.orderService.getPaymentProvider().pipe(take(1), catchError(
      error => {
        return throwError(error);
      }
    )).subscribe((resp: Array<PaymentProvider>) => {
      this.providerList = resp;
    });
  }

  renderProviderName(num: number) {
    if (this.providerList.length !== 0 && this.providerList.filter(d => d.id === num).length !== 0) {
      return this.providerList.filter(d => d.id === num)[0].name;
    }
    return this.translatePipe.transform('Chưa đặt');
  }

  renderStatus(status: number) {
    switch (status) {
      case 0:
        return this.translatePipe.transform('Chưa thanh toán');
      case 1:
        return this.translatePipe.transform('Đang chờ');
      case 2:
        return this.translatePipe.transform('Đã thanh toán');
    }
  }

  pageNavigationByType() {
    this.rOrders = [];
    this.innerLoading = true;
    this.repairService.getRepairOrderByType(this.page, this.activeTab - 1)
      .pipe(take(1), catchError(
        error => {
          this.fetchError = true;
          this.innerLoading = false;
          return throwError(error);
        }
      ))
      .subscribe(data => {
        this.rOrders = data;
        this.innerLoading = false;
      });
  }

  onUserClickTab(tabNum: number) {
    if (this.activeTab === tabNum) { return; }
    this.activeTab = tabNum;
    this.initPaginate();
  }

  userClickNextPage() {
    if (this.disableNextPageBtn) { return; }
    this.page += 1;
    if (this.page >= this.pageLimit - 1) { this.disableNextPageBtn = true; }
    else { this.disablePrevPageBtn = false; }
    this.pageNavigationByType();
  }

  userClickPreviousPage() {
    if (this.disablePrevPageBtn) { return; }
    this.page -= 1;
    if (this.page < this.pageLimit) { this.disableNextPageBtn = false; }
    if (this.page !== 0) { this.disablePrevPageBtn = false; }
    else { this.disablePrevPageBtn = true; }
    this.pageNavigationByType();
  }

  ngOnDestroy(): void {
    if (this.browserSubscription) {
      this.browserSubscription.unsubscribe();
    }
  }
}
