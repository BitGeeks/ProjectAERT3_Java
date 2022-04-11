import { AccountService } from 'src/app/services/account.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, take } from 'rxjs/operators';
import { User, UserAddresss } from 'src/app/store/model';
import { NotifierService } from 'angular-notifier';
import { EditNewAddressComponent } from 'src/app/address/edit-new-address/edit-new-address.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddNewAddressComponent } from 'src/app/address/add-new-address/add-new-address.component';
import { Title } from '@angular/platform-browser';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  innerLoading = true;
  userData: User;
  editAddress: FormGroup;
  isAddDialogOpening = false;
  isEditDialogOpening = false;
  currentEditingObj: UserAddresss;
  shippingAddressSelected: number;

  constructor(
    private accountService: AccountService,
    private notifierService: NotifierService,
    private modalService: NgbModal,
    private titleMeta: Title,
    private translatePipe: TranslatePipe
  ) {
  }

  ngOnInit() {
    this.titleMeta.setTitle(this.translatePipe.transform('title_my_address'));
    this.editAddress = new FormGroup({
      id: new FormControl(null, []),
      address: new FormControl(null, [Validators.required]),
      streetName: new FormControl(null, [Validators.required]),
      cityName: new FormControl(null, [Validators.required]),
      postalCode: new FormControl(null, [Validators.required]),
      countryCode: new FormControl(null, [Validators.required]),
      telephone: new FormControl(null, [Validators.required]),
      mobile: new FormControl(null, [Validators.required])
    });

    this.requestUserData();
  }

  onUserSelectAddressForShip(id: number) {
    this.shippingAddressSelected = id;
  }

  requestUserData() {
    this.accountService.getUser().pipe(take(1)).subscribe(data => {
      this.userData = data;
      if (data.userAddresss.length !== 0)
      {
        this.shippingAddressSelected = data.userAddresss.filter(data => data.isDefault)[0].id;
        this.currentEditingObj = data.userAddresss.filter(data => data.isDefault)[0];
      }

      this.innerLoading = false;
    });
  }

  onUserClickAddrDelete(userData) {
    this.accountService.removeUserAddress(userData.id)
      .pipe(take(1), catchError(
        error => {
          this.notifierService.notify('error', this.translatePipe.transform('Có lỗi xảy ra trong quá trình tải dữ liệu!'));
          return throwError(error);
        }
      ))
      .subscribe(data => {
        this.requestUserData();
    });
  }

  onUserClickAddrEdit(userData) {
    const EditAddress = this.modalService.open(EditNewAddressComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
    EditAddress.componentInstance.FormSubmittedEv.subscribe($e => this.onAddressFormSubmitted($e, false));
    EditAddress.componentInstance.FormExceptionOccurEv.subscribe($e => this.onException($e));
    EditAddress.componentInstance.initialState = userData;
  }

  userClickAddNewAddress() {
    const AddNewAddress = this.modalService.open(AddNewAddressComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
    AddNewAddress.componentInstance.FormSubmittedEv.subscribe($e => this.onAddressFormSubmitted($e, true));
    AddNewAddress.componentInstance.FormExceptionOccurEv.subscribe($e => this.onException($e));
  }

  onException(ev: string) {
    this.notifierService.notify('error', ev);
  }

  onAddAddressFormClose(ev) {
    this.isAddDialogOpening = false;
  }

  onAddressFormSubmitted(ev, isNew) {
    this.notifierService.notify('success', isNew ? this.translatePipe.transform('Thêm địa chỉ mới thành công') : this.translatePipe.transform('Sửa đổi địa chỉ thành công'));
    this.requestUserData();
  }

  onUserClickDefault (id: number) {
    this.accountService.setDefaultAddress(id)
      .pipe(take(1), catchError(
        error => {
          this.notifierService.notify('error', this.translatePipe.transform('Có lỗi xảy ra trong quá trình tải dữ liệu!'));
          return throwError(error);
        }
      ))
      .subscribe(() => {
        this.requestUserData();
    });
  }
}
