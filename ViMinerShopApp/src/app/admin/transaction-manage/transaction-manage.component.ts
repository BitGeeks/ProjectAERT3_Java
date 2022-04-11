import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { throwError } from 'rxjs';
import { take, catchError } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin.service';
import { OrderService } from 'src/app/services/order.service';
import { PaymentDetail, PaymentProvider } from 'src/app/store/model';

@Component({
  selector: 'app-transaction-manage',
  templateUrl: './transaction-manage.component.html',
  styleUrls: ['./transaction-manage.component.scss']
})
export class TransactionManageComponent implements OnInit {
  transactionList: Array<PaymentDetail>;

  page = 0;
  pageSize = 3;
  pageLimit = 0;
  disablePrevPageBtn = true;
  disableNextPageBtn = true;
  providerList: Array<PaymentProvider>;

  constructor(
    private adminService: AdminService,
    private notifierService: NotifierService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.getPaymentMethod();
    this.adminService.getAllTransactionCount()
      .pipe(take(1), catchError(
        error => {
          this.notifierService.notify('error', 'Đã có lỗi xảy ra trong quá trình lấy đơn đặt hàng');
          return throwError(error);
        }
      ))
      .subscribe((data: number) => {
          this.pageSize = this.adminService.getPageSize();
          this.pageLimit = Math.ceil(data / this.adminService.getPageSize());
          if (this.pageLimit > 1) { this.disableNextPageBtn = false; }
          this.getShippingMethods();
      });
  }

  userClickNextPage() {
    if (this.disableNextPageBtn) { return; }
    this.page += 1;
    if (this.page + 1 === this.pageLimit) { this.disableNextPageBtn = true; }
    if (this.page !== 0) { this.disablePrevPageBtn = false; }
    this.getShippingMethods();
  }

  userClickPreviousPage() {
    if (this.disablePrevPageBtn) { return; }
    this.page -= 1;
    if (this.page < this.pageLimit) { this.disableNextPageBtn = false; }
    if (this.page !== 0) { this.disablePrevPageBtn = false; }
    else { this.disablePrevPageBtn = true; }
    this.getShippingMethods();
  }

  getShippingMethods() {
    this.transactionList = [];
    this.adminService.getAllTransactionList(this.page)
      .pipe(take(1), catchError(
        error => {
          this.notifierService.notify('error', 'Có lỗi xảy ra trong quá trình thao tác! Vui lòng thử làm mới trang');
          return throwError(error);
        }
      ))
      .subscribe(data => {
        this.transactionList = data;
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

  renderProvider(providerId) {
    if (providerId !== 0) { return this.providerList.filter(d => d.id === providerId)[0]; }
    return {
      name: 'Chưa xác định'
    };
  }

  viewDetailTransaction(trasaction: PaymentDetail) {

  }

}
