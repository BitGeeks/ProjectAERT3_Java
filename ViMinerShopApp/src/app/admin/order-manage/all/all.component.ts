import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { throwError } from 'rxjs';
import { take, catchError } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin.service';
import { Orders } from 'src/app/store/model';
import { EditOrderStatusDialogComponent } from '../edit-order-status-dialog/edit-order-status-dialog.component';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {
  activeTab = 0;
  orders = [];
  fetchError = false;

  page = 0;
  pageSize = 3;
  pageLimit = 0;
  disablePrevPageBtn = true;
  disableNextPageBtn = true;

  constructor(
    private adminService: AdminService,
    private modalService: NgbModal,
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void {
    this.initPaginate();
  }

  initPaginate() {
    this.disableNextPageBtn = true;
    this.disablePrevPageBtn = true;
    this.adminService.getAllOrderCount(this.activeTab)
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
          this.getDataNavigation();
      });
  }

  onAdminSwitchTab(tabNum: number) {
    this.activeTab = tabNum;
    this.page = 0;
    this.initPaginate();
  }

  getDataNavigation() {
    this.orders = [];
    this.adminService.getAllOrders(this.page, this.activeTab)
      .pipe(take(1), catchError(
        error => {
          this.fetchError = true;
          return throwError(error);
        }
      ))
      .subscribe(data => {
        this.orders = data;
      });
  }

  orderActionManage(order: Orders) {
    const OrderActionStatus = this.modalService.open(EditOrderStatusDialogComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
    OrderActionStatus.componentInstance.FormSubmittedEv.subscribe($e => this.getDataNavigation());
    OrderActionStatus.componentInstance.FormExceptionOccurEv.subscribe($e => this.onException($e));
    OrderActionStatus.componentInstance.initialState = order;
  }

  renderOrderStatus(type: number) {
    switch (type) {
      case 0:
        return 'Chưa thanh toán';
      case 1:
        return 'Đang chờ';
      case 2:
        return 'Chưa giao';
      case 3:
        return 'Đang giao';
      case 4:
        return 'Đã giao';
      default:
        return 'Hết hạn';
    }
  }

  onException(ev: string) {
    this.notifierService.notify('error', ev);
  }

  userClickNextPage() {
    if (this.disableNextPageBtn) { return; }
    this.page += 1;
    if (this.page >= this.pageLimit - 1) { this.disableNextPageBtn = true; }
    else { this.disablePrevPageBtn = false; }
    this.getDataNavigation();
  }

  userClickPreviousPage() {
    if (this.disablePrevPageBtn) { return; }
    this.page -= 1;
    if (this.page < this.pageLimit) { this.disableNextPageBtn = false; }
    if (this.page !== 0) { this.disablePrevPageBtn = false; }
    else { this.disablePrevPageBtn = true; }
    this.getDataNavigation();
  }
}
