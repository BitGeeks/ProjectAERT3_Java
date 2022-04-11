import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslatePipe } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { throwError } from 'rxjs';
import { take, catchError } from 'rxjs/operators';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-list-discount-transaction',
  templateUrl: './list-discount-transaction.component.html',
  styleUrls: ['./list-discount-transaction.component.scss']
})
export class ListDiscountTransactionComponent implements OnInit {
  listTransaction;
  selectTab = 0;

  page = 0;
  pageSize = 3;
  collectionSize = 0;
  pageLimit = 0;
  disablePrevPageBtn = true;
  disableNextPageBtn = true;

  innerLoading = true;

  constructor(
    private orderService: OrderService,
    private titleMeta: Title,
    private translatePipe: TranslatePipe,
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void {
    this.titleMeta.setTitle(this.translatePipe.transform('Danh sách giao dịch coupon'));
    this.initPaginate(0);
  }

  initPaginate(flag: number) {
    this.disableNextPageBtn = true;
    this.disablePrevPageBtn = true;
    this.orderService.getDonateTransactionByFlagCount(flag === 0 ? 'transfered' : 'received')
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
          this.getTransactionTranfered(flag);
      });
  }

  getTransactionTranfered(flagId: number) {
    this.innerLoading = true;
    this.orderService.getDonateTransactionByFlag(flagId === 0 ? 'transfered' : 'received', this.page)
      .pipe(take(1), catchError(
        error => {
          return throwError(error);
        }
      ))
      .subscribe(data => {
        this.listTransaction = data;
        this.innerLoading = false;
    });
  }

  onUserClickSelectTab(tabNum: number) {
    this.selectTab = tabNum;
    this.getTransactionTranfered(tabNum);
  }

  userClickNextPage() {
    if (this.disableNextPageBtn) { return; }
    this.page += 1;
    if (this.page >= this.pageLimit - 1) { this.disableNextPageBtn = true; }
    else { this.disablePrevPageBtn = false; }
    this.getTransactionTranfered(this.selectTab);
  }

  userClickPreviousPage() {
    if (this.disablePrevPageBtn) { return; }
    this.page -= 1;
    if (this.page < this.pageLimit) { this.disableNextPageBtn = false; }
    if (this.page !== 0) { this.disablePrevPageBtn = false; }
    else { this.disablePrevPageBtn = true; }
    this.getTransactionTranfered(this.selectTab);
  }
}
