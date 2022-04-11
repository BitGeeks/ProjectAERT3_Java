import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, throwError } from 'rxjs';
import { take, catchError } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service';
import { ProductService } from 'src/app/services/product.service';
import { RepairService } from 'src/app/services/repair.service';
import { ProductCategory, ProductDetail, Repair, repairItemT, ShippingMethod, User } from 'src/app/store/model';
import { NotifierService } from 'angular-notifier';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddNewAddressComponent } from 'src/app/address/add-new-address/add-new-address.component';
import { EditNewAddressComponent } from 'src/app/address/edit-new-address/edit-new-address.component';
import { Title } from '@angular/platform-browser';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-create-repair-ticket',
  templateUrl: './create-repair-ticket.component.html',
  styleUrls: ['./create-repair-ticket.component.scss']
})

export class CreateRepairTicketComponent implements OnInit {

  constructor(private productService: ProductService,
              private router: Router,
              private accountService: AccountService,
              private repairService: RepairService,
              private route: ActivatedRoute,
              private notifierService: NotifierService,
              private modalService: NgbModal,
              private titleMeta: Title,
              private translatePipe: TranslatePipe
  ) { }
  paramSubscription: Subscription;
  editAddress: FormGroup;
  isAddItemDialogShowing = false;
  productType: Array<ProductCategory>;
  productByType: Array<ProductDetail>;
  shippingMethods: Array<ShippingMethod>;
  returnShippingMethods: Array<ShippingMethod>;
  returnShippingAddressSelected: number;
  shippingMethodSelected: number;
  shippingAddressSelected: number;
  currentTypeId = 0;
  currentPBTypeId = 0;
  userData: User;

  lastRemark = '';

  repairSitePreconfig: Object[];

  isAddDialogOpening = false;
  isEditDialogOpening = false;
  currentEditingObj = {};

  ticketReason = [
    {
      name: 'Yêu cầu sửa',
      flag: 'APPLY_FOR_REPAIR'
    }
  ];
  ticketReasonSelected = 'APPLY_FOR_REPAIR';

  trackingNo = '';

  siteSelected = null;

  scratchBoard = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  itemForRepair: Array<repairItemT> = [];
  acceptTerms = false;

  addNewItemForRepairForm: FormGroup;
  ticketId: number;
  ticketData: Repair;

  makeSomeSalt = a => {
    let r = '';
    let t = this.scratchBoard;
    let o = t.length;
    for (let e = 0; e < a; e++) {
      r += t.charAt(Math.floor(Math.random() * o));
    }
    return r;
  }

  ngOnInit(): void {
    this.titleMeta.setTitle(this.translatePipe.transform('Tạo phiếu sửa chữa'));
    this.getRepairType();
    this.getShippingMethod();
    this.requestUserData();
    this.requestRepairSite();
    this.addNewItemForRepairForm = new FormGroup({
      productItemId: new FormControl(null, []),
      productType: new FormControl(null, [Validators.required]),
      product: new FormControl(null, [Validators.required]),
      quantity: new FormControl(null, [Validators.required]),
      remark: new FormControl(null, []),
    });
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
    this.paramSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.ticketId = params.ticketId;
        if (!params.ticketId) { return; }
        this.getShippingMethod();
        this.repairService.getRepairTicket(params.ticketId).pipe(take(1), catchError(error => {
            return throwError(error);
          }
          )).subscribe(data => {
            if (data.status !== 0) {
              this.router.navigate([`/account/repair/tickets`]);
            }
            this.ticketData = data;
            this.ticketReasonSelected = data.ticketReason;
            data.repairItems.map(data => {
              this.itemForRepair.push({
                id: this.makeSomeSalt(10),
                categoryName: data.product.productCategory.name,
                categoryId: data.product.category_id,
                productName: data.product.name,
                productId: data.product.id,
                quantity: data.quantity,
                remark: data.remark
              });
            });
            this.shippingMethodSelected = data.shippingLogisticsId;
            this.trackingNo = data.trackingNo;
            this.siteSelected = data.repairSiteId;
            this.accountService.getShippingMethodsByFlag('repair').pipe(take(1), catchError(error => {
              return throwError(error);
            }
            )).subscribe(dataz => {
              this.returnShippingMethods = dataz;
              this.returnShippingAddressSelected = data.returnLogisticsId;
            });
            this.acceptTerms = true;
            this.lastRemark = data.remark;
          });
      });
  }

  onException(ev: string) {
    this.notifierService.notify('error', ev);
  }

  onAddressFormSubmitted(ev, isNew) {
    this.notifierService.notify('success', isNew ? this.translatePipe.transform('Thêm địa chỉ mới thành công') : this.translatePipe.transform('Sửa đổi địa chỉ thành công'));
    this.requestUserData();
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

  onUserSelectTicketReason(flag: string) {
    this.ticketReasonSelected = flag;
  }

  requestRepairSite() {
    this.repairService.getRepairSite().pipe(take(1), catchError(error => {
      return throwError(error);
    }
    )).subscribe(data => {
      this.repairSitePreconfig = data;
    });
  }

  onUserClickSite(siteCode: string) {
    this.siteSelected = siteCode;
    this.accountService.getShippingMethodsByFlag('repair').pipe(take(1), catchError(error => {
      return throwError(error);
    }
    )).subscribe(data => {
      this.returnShippingMethods = data;
      this.returnShippingAddressSelected = data[0].id;
    });
  }

  onUserClickReturnShippingMethod(methodId) {
    this.returnShippingAddressSelected = methodId;
  }

  onUserClickAcceptTerm = () => {
    this.acceptTerms = !this.acceptTerms;
  }

  onRemarkTxtChange = (name: string, txt: string) => this[name] = txt;

  requestUserData() {
    this.accountService.getUser().pipe(take(1)).subscribe(data => {
      this.userData = data;
      this.shippingAddressSelected = data.userAddresss.length !== 0 ? data.userAddresss.filter(data => data.isDefault)[0].id : 0;
      this.currentEditingObj = data;
    });
  }

  getShippingMethod() {
    this.accountService.getShippingMethods().pipe(take(1), catchError(error => {
      return throwError(error);
    }
    )).subscribe(data => {
      this.shippingMethods = data;
      if (data.length !== 0) { this.shippingMethodSelected = data[0].id; }
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

  onUserClickAddrDelete(userData) {
    this.accountService.removeUserAddress(userData.id)
      .pipe(take(1), catchError(
        error => {
          this.notifierService.notify('error', this.translatePipe.transform('Đã có lỗi xảy ra trong quá trình xóa địa chỉ'));
          return throwError(error);
        }
      ))
      .subscribe(data => {
        this.requestUserData();
    });
  }

  onUserClickDefault(id: number) {
    this.accountService.setDefaultAddress(id)
      .pipe(take(1), catchError(
        error => {
          this.notifierService.notify('error', this.translatePipe.transform('Đã có lỗi xảy ra trong quá trình đặt địa chỉ mặc định'));
          return throwError(error);
        }
      ))
      .subscribe(data => {
        this.requestUserData();
    });
  }

  onUserClickShippingMethod(id: number) {
    this.shippingMethodSelected = id;
  }

  onAddProductForm() {
    const isAvailable = this.itemForRepair.filter(it => it.productId === this.addNewItemForRepairForm.value.product);
    if (isAvailable.length !== 0) {
      this.itemForRepair.map((dt, idx) => {
        if (this.itemForRepair[idx].id === isAvailable[0].id) { this.itemForRepair[idx].quantity = this.addNewItemForRepairForm.value.quantity; }
        if (this.addNewItemForRepairForm.value.quantity === 0) { this.itemForRepair = this.itemForRepair.filter(d => d.id === isAvailable[0].id); }
      });
    }
    else if (this.addNewItemForRepairForm.value.productItemId === null)
    {
      this.itemForRepair.push({
        id: this.makeSomeSalt(10),
        categoryName: this.productType.filter(d => d.id === parseInt(this.addNewItemForRepairForm.value.productType))[0].name,
        categoryId: this.addNewItemForRepairForm.value.productType,
        productName: this.productByType.filter(d => d.id === parseInt(this.addNewItemForRepairForm.value.product))[0].name,
        productId: this.addNewItemForRepairForm.value.product,
        quantity: this.addNewItemForRepairForm.value.quantity,
        remark: this.addNewItemForRepairForm.value.remark
      });
    }
    else {
      const itemForRepair = this.itemForRepair.filter(d => d.id === this.addNewItemForRepairForm.value.productItemId)[0];
      (itemForRepair.categoryName = this.productType.filter((e) => e.id === parseInt(this.addNewItemForRepairForm.value.productType))[0].name),
      (itemForRepair.categoryId = this.addNewItemForRepairForm.value.productType),
      (itemForRepair.productName = this.productByType.filter((e) => e.id === parseInt(this.addNewItemForRepairForm.value.product))[0].name),
      (itemForRepair.productId = this.addNewItemForRepairForm.value.product),
      (itemForRepair.quantity = this.addNewItemForRepairForm.value.quantity),
      (itemForRepair.remark = this.addNewItemForRepairForm.value.remark);
    }
    this.onUserClickAddProduct();
  }

  onUserClickEditRepairItem = iid => {
    this.onUserClickAddProduct();
    const { id, categoryId, productId, quantity, remark } = this.itemForRepair.filter(d => d.id === iid)[0];
    this.addNewItemForRepairForm.patchValue({
      productItemId: id,
      productType: categoryId,
      product: productId,
      quantity,
      remark
    });
  }

  onUserClickRemoveRepairItem = id => this.itemForRepair = this.itemForRepair.filter(d => d.id !== id);

  getRepairType() {
    this.productService.getCategory().pipe(take(1), catchError(error => {
      return throwError(error);
    }
    )).subscribe(data => {
      this.productType = data;
      this.currentTypeId = data[0].id;
      this.getProductByType(data[0].name);
    });
  }

  onSelectCategoryChange(ev) {
    if (this.productType.length !== 0) {
      this.getProductByType(this.productType.filter(data => data.id === parseInt(this.currentTypeId + ''))[0].name);
    }
  }

  getProductByType(cateName: string) {
    this.productService.getProducts(0, null, cateName, null, '0', '0', '0', '0', '').pipe(take(1), catchError(error => throwError(error)))
    .subscribe(data => {
      this.productByType = data;
      if (data.length !== 0) { this.currentPBTypeId = data[0].id; }
    });
  }

  onUserClickAddProduct() {
    this.isAddItemDialogShowing = !this.isAddItemDialogShowing;
  }

  submitRepairTicket() {
    if (this.userData.userAddresss.length === 0) {
      this.notifierService.notify('error', this.translatePipe.transform('Bạn chưa nhập địa chỉ, vui lòng nhập địa chỉ và thử lại!'));
      return throwError(this.translatePipe.transform('Bạn chưa nhập địa chỉ, vui lòng nhập địa chỉ và thử lại!'));
    } else if (this.itemForRepair.length === 0) {
      this.notifierService.notify('error', this.translatePipe.transform('Bạn chưa có sản phẩm nào để sửa'));
      return throwError(this.translatePipe.transform('Bạn chưa có sản phẩm nào để sửa'));
    } else if (this.trackingNo.length !== 8) {
      this.notifierService.notify('error', this.translatePipe.transform('Mã theo dõi phải có 8 ký tự trở lên'));
      return throwError(this.translatePipe.transform('Mã theo dõi phải có 8 ký tự trở lên'));
    } else if (this.siteSelected === null) {
      this.notifierService.notify('error', this.translatePipe.transform('Bạn chưa chọn đại lý sửa chữa'));
      return throwError(this.translatePipe.transform('Bạn chưa chọn đại lý sửa chữa'));
    }
    const { address, street_name, city, country, postal_code, telephone, mobile } = this.userData.userAddresss.filter(data => data.id === this.shippingAddressSelected)[0];
    const shippingAddressFormat = address + ', ' + street_name + ', ' + city + ', ' + country + ', ' + postal_code + ', ' + telephone + ', ' + mobile;
    if (!this.ticketId) {
      this.repairService.submitRepairTicket(this.ticketReasonSelected, this.itemForRepair, this.shippingMethodSelected, shippingAddressFormat, this.siteSelected, this.returnShippingAddressSelected, this.lastRemark, this.trackingNo).pipe(take(1), catchError(error => throwError(error)))
      .subscribe(() => {
        this.router.navigate([`/account/repair/tickets`]);
      });
    }
    else {
      this.repairService.updateRepairTicket(this.ticketId, this.ticketReasonSelected, this.itemForRepair, this.shippingMethodSelected, shippingAddressFormat, this.siteSelected, this.returnShippingAddressSelected, this.lastRemark, this.trackingNo).pipe(take(1), catchError(error => throwError(error)))
      .subscribe(() => {
        this.router.navigate([`/account/repair/tickets`]);
      });
    }
  }

}
