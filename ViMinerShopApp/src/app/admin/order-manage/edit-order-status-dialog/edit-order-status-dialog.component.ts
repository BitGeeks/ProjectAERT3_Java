import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { throwError } from 'rxjs';
import { take, catchError } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service';
import { AdminService } from 'src/app/services/admin.service';
import { OrderService } from 'src/app/services/order.service';
import { PaymentProvider, ShippingMethod } from 'src/app/store/model';

@Component({
  selector: 'app-edit-order-status-dialog',
  templateUrl: './edit-order-status-dialog.component.html',
  styleUrls: ['./edit-order-status-dialog.component.scss']
})
export class EditOrderStatusDialogComponent implements OnInit {
  editOrderStatus: FormGroup;

  shippingMethods: Array<ShippingMethod>;
  paymentProviderList: Array<PaymentProvider>;

  @Input()
  public initialState: { [key: string]: any };

  @Output()
  public FormSubmittedEv = new EventEmitter<boolean>();

  @Output()
  public FormExceptionOccurEv = new EventEmitter<string>();

  @Output()
  public FormCloseEv = new EventEmitter<boolean>();

  constructor(
    public activeModal: NgbActiveModal,
    private adminService: AdminService,
    private notifierService: NotifierService,
    private accountService: AccountService,
    private orderService: OrderService
    ) { }

  ngOnInit(): void {
    this.editOrderStatus = new FormGroup({
      id: new FormControl(null, [Validators.required]),
      orderStatus: new FormControl(null, [Validators.required])
    });
    this.editOrderStatus.patchValue({
      id: this.initialState.id,
      orderStatus: this.initialState.paymentDetail.status.toString()
    });
    this.getShippingMethods();
    this.getPaymentMethod();
  }

  onEditSubmitted() {
    if (!this.editOrderStatus.valid) { return; }
    const { id, orderStatus } = this.editOrderStatus.value;
    this.adminService.onAdminChangeOrderStatus(id, orderStatus)
    .pipe(take(1), catchError(
      error => {
        this.FormExceptionOccurEv.emit(error);
        return throwError(error);
      }
    ))
    .subscribe(data => {
      this.FormSubmittedEv.emit(true);
      this.notifierService.notify('success', 'Cập nhật trạng thái đơn hàng thành công!');
      this.activeModal.close('Close click');
  });
  }

  onUserClickClose() {
    this.FormCloseEv.emit(true);
    this.activeModal.close('Close click');
  }

  renderShippingUnit(unitId: number) {
    if (typeof this.shippingMethods !== 'undefined' && this.shippingMethods.length !== 0) {
      return this.shippingMethods.filter(data => data.id === unitId)[0];
    }
    return {
      shortName: 'Chưa xác định',
      name: 'Chưa xác định'
    };
  }

  renderPaymentProvider(providerId: number) {
    if (providerId !== 0 && typeof this.paymentProviderList !== 'undefined' && this.paymentProviderList.length !== 0) {
      return this.paymentProviderList.filter(data => data.id === providerId)[0];
    }
    return {
      name: 'Chưa xác định'
    };
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

  getShippingMethods() {
    this.accountService.getShippingMethods()
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

  getPaymentMethod() {
    this.orderService.getPaymentProvider().pipe(take(1), catchError(
      error => {
        this.notifierService.notify('error', 'Có lỗi xảy ra trong quá trình thao tác! Vui lòng thử làm mới trang');
        return throwError(error);
      }
    )).subscribe((resp: Array<PaymentProvider>) => {
      this.paymentProviderList = resp;
    });
  }

}
