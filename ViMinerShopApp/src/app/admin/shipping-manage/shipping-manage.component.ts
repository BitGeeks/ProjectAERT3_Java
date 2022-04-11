import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { throwError } from 'rxjs';
import { take, catchError } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service';
import { AdminService } from 'src/app/services/admin.service';
import { ShippingMethod } from 'src/app/store/model';
import { EditShippingMethodDialogComponent } from './edit-shipping-method-dialog/edit-shipping-method-dialog.component';

@Component({
  selector: 'app-shipping-manage',
  templateUrl: './shipping-manage.component.html',
  styleUrls: ['./shipping-manage.component.scss']
})
export class ShippingManageComponent implements OnInit {
  shippingMethods: Array<ShippingMethod>;

  page = 0;
  pageSize = 3;
  pageLimit = 0;
  disablePrevPageBtn = true;
  disableNextPageBtn = true;

  constructor(
    private accountService: AccountService,
    private modalService: NgbModal,
    private notifierService: NotifierService,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.adminService.getAllShippingMethodsCount()
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

  getShippingMethods() {
    this.adminService.getAllShippingMethods(this.page)
      .pipe(take(1), catchError(
        error => {
          this.notifierService.notify('error', 'Có lỗi xảy ra trong quá trình thao tác! Vui lòng thử làm mới trang');
          return throwError(error);
        }
      ))
      .subscribe(data => {
        this.shippingMethods = data;
    });
  }

  editShippingManage(shipping: ShippingMethod) {
    const ShippingMethodEdit = this.modalService.open(EditShippingMethodDialogComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
    ShippingMethodEdit.componentInstance.FormSubmittedEv.subscribe($e => this.getShippingMethods());
    ShippingMethodEdit.componentInstance.FormExceptionOccurEv.subscribe($e => this.onException($e));
    ShippingMethodEdit.componentInstance.initialState = shipping;
  }

  onException(ev: string) {
    this.notifierService.notify('error', ev);
  }

  userClickNextPage() {
    if (this.disableNextPageBtn) { return; }
    this.page += 1;
    if (this.page >= this.pageLimit - 1) { this.disableNextPageBtn = true; }
    else { this.disablePrevPageBtn = false; }
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
}
