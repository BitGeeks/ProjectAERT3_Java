import { CartState } from './../../store/cart/cart.reducer';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromApp from '../../store/app.reducers';
import { Store } from '@ngrx/store';
import { Observable, Subscription, throwError } from 'rxjs';
import { OrderState } from 'src/app/store/order/order.reducer';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NavigationStart, Router } from '@angular/router';
import { catchError, filter, take } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service';
import { Checkout, Coupon, ShippingMethod, ShoppingSession, User } from 'src/app/store/model';
import { CartService } from 'src/app/services/cart.service';
import * as CartActions from './../../store/cart/cart.actions';
import * as OrderActions from '../../store/order/order.actions';
import { NotifierService } from 'angular-notifier';
import { OrderService } from 'src/app/services/order.service';
import { AddNewAddressComponent } from 'src/app/address/add-new-address/add-new-address.component';
import { EditNewAddressComponent } from 'src/app/address/edit-new-address/edit-new-address.component';
import { DonateDialogComponent } from 'src/app/donate-coupon/donate-dialog/donate-dialog.component';
import { Title } from '@angular/platform-browser';
import { TranslatePipe } from '@ngx-translate/core';
import { BrowseState } from 'src/app/store/browse/browse.reducer';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit, OnDestroy {
  cartState: Observable<CartState>;
  orderState: Observable<OrderState>;
  termsAccepted = false;
  userData: User;
  isAddDialogOpening = false;
  isEditDialogOpening = false;
  currentEditingObj = {};
  shippingMethods: Array<ShippingMethod>;
  shippingMethodSelected: number;
  shippingAddressSelected: number;

  couponList: Array<Coupon>;
  couponSelected: number;

  instructionClickHover = false;

  myCurrentLat = 0;
  myCurrentLong = 0;
  mylocationName = '';

  cartItemSubscription: Subscription;

  currentShippingPrice = 0;

  isLoading = false;

  routerSubscription: Subscription;

  browseState: Observable<BrowseState>;
  browserSubscription: Subscription;
  currency = 'USD';
  currencyRate = 1;

  constructor(
    private store: Store<fromApp.AppState>,
    private modalService: NgbModal,
    private router: Router,
    private accountService: AccountService,
    private cartService: CartService,
    private notifierService: NotifierService,
    private orderService: OrderService,
    private titleMeta: Title,
    private translatePipe: TranslatePipe
  )
  {
  }

  ngOnInit() {
    this.titleMeta.setTitle(this.translatePipe.transform('Chi ti???t ????n h??ng'));
    this.cartState = this.store.select('cart');
    this.orderState = this.store.select('order');
    this.browseState = this.store.select('browse');

    this.routerSubscription = this.router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe(event => { this.termsAccepted = false; });

    this.requestUserData();
    this.getShippingMethods();
    this.getUserAvailableCoupon();
    this.store.dispatch(new OrderActions.SetCheckoutStep(1));
    this.orderState.subscribe((orderState: OrderState) => {
      this.currentShippingPrice = orderState.shippingCost;
    });
    this.browserSubscription = this.browseState.subscribe(data => {
      this.currency = data.currentCurrency;
      if (JSON.stringify(data.exchangeRates) !== '{}') {
        this.currencyRate = data.exchangeRates[data.currentCurrency];
      }
    });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    if (this.browserSubscription) {
      this.browserSubscription.unsubscribe();
    }
  }

  onUserAcceptTermAndPolicy() {
    this.termsAccepted = !this.termsAccepted;
  }

  countTotalCoupon = (couponList) => couponList.reduce((a, b) => a + parseFloat(b.couponPercent), 0);

  totalAmountCalc(session: ShoppingSession) {
    let subTotal = session.total;
    if (session.coupon !== null) {
      subTotal -= (subTotal * (session.coupon.couponPercent / 100));
    }
    return subTotal;
  }

  onUserClickDonate(coupon: Coupon) {
    const DonateDialog = this.modalService.open(DonateDialogComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
    DonateDialog.componentInstance.FormSubmittedEv.subscribe($e => this.onDonateSubmitted());
    DonateDialog.componentInstance.FormExceptionOccurEv.subscribe($e => this.onException($e));
    DonateDialog.componentInstance.couponState = coupon;
  }

  onDonateSubmitted = () =>
    this.getUserAvailableCoupon()

  selectCoupon(coupon: Coupon) {
    this.cartItemSubscription = this.cartState.subscribe((cartState: CartState) => {
      if (cartState.cart !== null && cartState.cart.total < coupon.minPrice /*|| (cartState.cart.coupon_id !== null && cartState.cart.coupon_id === coupon.id)*/) { return; }
      this.couponSelected = coupon.id;
      this.cartService.toggleCoupon(coupon.couponCode).pipe(take(1), catchError(
        error => {
          this.notifierService.notify('error', this.translatePipe.transform('C?? l???i x???y ra trong qu?? tr??nh s??? d???ng coupon c???a b???n!'));
          if (error.status === 400) {
            this.store.dispatch(new CartActions.FetchCart());
          }
          return throwError(error);
        }
      )).subscribe((res: ShoppingSession) => {
        this.cartItemSubscription.unsubscribe();
        this.store.dispatch(new CartActions.FetchCart());
      });
    });
  }

  onUserClickShippingMethod(id: number) {
    this.shippingMethodSelected = id;
    this.initFirstPosition(id);
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

  onCartSubmit() {
    this.isLoading = true;
    if (this.userData.userAddresss.length === 0) {
      this.notifierService.notify('error', this.translatePipe.transform('B???n ch??a nh???p ?????a ch???, vui l??ng nh???p ?????a ch??? v?? th??? l???i!'));
      return throwError(this.translatePipe.transform('B???n ch??a nh???p ?????a ch???, vui l??ng nh???p ?????a ch??? v?? th??? l???i!'));
    }
    const { address, street_name, city, country, postal_code, telephone, mobile } = this.userData.userAddresss.filter(data => data.id === this.shippingAddressSelected)[0];
    const shippingAddressFormat = address + ', ' + street_name + ', ' + city + ', ' + country + ', ' + postal_code + ', ' + telephone + ', ' + mobile;
    this.cartState.subscribe((cartState: CartState) => {
      if (cartState.cart === null) { return; }
      this.cartService.confirmCart(cartState.cart, this.shippingMethodSelected, shippingAddressFormat, this.currentShippingPrice, this.mylocationName, this.myCurrentLong, this.myCurrentLat).pipe(take(1), catchError(
        error => {
          this.isLoading = false;
          this.notifierService.notify('error', error);
          if (error.status === 400) {
            this.store.dispatch(new CartActions.FetchCart());
          }
          this.router.navigate(['/cart']);
          return throwError(error);
        }
      )).subscribe((res: Checkout) => {
        this.isLoading = false;
        this.store.dispatch(new OrderActions.GetOrderById(res.id));
      });
    });
  }

  onUserSelectAddressForShip(id: number) {
    this.shippingAddressSelected = id;
  }

  requestUserData() {
    this.accountService.getUser().pipe(take(1)).subscribe(data => {
      this.userData = data;
      this.shippingAddressSelected = data.userAddresss.length !== 0 ? data.userAddresss.filter(data => data.default)[0].id : 0;
    });
  }

  getShippingMethods() {
    this.accountService.getShippingMethods()
      .pipe(take(1), catchError(
        error => {
          this.notifierService.notify('error', this.translatePipe.transform('C?? l???i x???y ra trong qu?? tr??nh t???i d??? li???u!'));
          return throwError(error);
        }
      ))
      .subscribe(data => {
        this.shippingMethods = data;
        this.shippingMethodSelected = data[0].id;
        this.initFirstPosition(data[0].id);
    });
  }

  getUserAvailableCoupon() {
    this.orderService.getUserAvailableCoupon(-1)
      .pipe(take(1), catchError(
        error => {
          return throwError(error);
        }
      ))
      .subscribe(data => {
        this.couponList = data;
    });
  }

  onException(ev: string) {
    this.notifierService.notify('error', ev);
  }

  onAddAddressFormClose(ev) {
    this.isAddDialogOpening = false;
  }

  onAddressFormSubmitted(ev, isNew) {
    this.notifierService.notify('success', isNew ? this.translatePipe.transform('Th??m ?????a ch??? m???i th??nh c??ng') : this.translatePipe.transform('S???a ?????i ?????a ch??? th??nh c??ng'));
    this.requestUserData();
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
          this.notifierService.notify('error', this.translatePipe.transform('C?? l???i x???y ra trong qu?? tr??nh t???i d??? li???u!'));
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
          this.notifierService.notify('error', this.translatePipe.transform('C?? l???i x???y ra trong qu?? tr??nh t???i d??? li???u!'));
          return throwError(error);
        }
      ))
      .subscribe(data => {
        this.requestUserData();
    });
  }

  requestIploc(pos) {
    this.cartService.requestIpLoc(pos.latitude, pos.longitude).subscribe(
      data => {
        // @ts-ignore
        const myProvince = data.data.features[0].properties.region
                          .replace('T???nh', '')
                          .replace('t???nh', '')
                          .replace('B?? R???a-V??ng T??u', 'B?? R???a - V??ng T??u')
                          .replace('Th???a Thi??n-Hu???', 'Th???a Thi??n Hu???')
                          .trim();
        this.mylocationName = myProvince;
      },
      error => {
        this.notifierService.notify('error', this.translatePipe.transform('???? c?? l???i x???y ra trong qu?? tr??nh l???y th??ng tin v??? tr??!'));
      }
    );
  }

  initFirstPosition(shippingMethidId: number) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.requestIploc({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accurary: position.coords.accuracy
        });
        this.myCurrentLat = position.coords.latitude;
        this.myCurrentLong = position.coords.longitude;
        this.store.dispatch(new OrderActions.SetShippingPosition({ shippingId: shippingMethidId, lat: position.coords.latitude, long: position.coords.longitude }));
      }, () => {
        this.notifierService.notify('error', this.translatePipe.transform('Th???t b???i trong vi???c l???y v??? tr??, h??y cho ph??p ???ng d???ng n??y truy c???p v??o v??? tr?? c???a b???n ????? ch??ng t??i c?? th??? t??nh ph?? ship ch??nh x??c h??n, n???u kh??ng. ????n h??ng c???a b???n s??? b??? thu ph?? ship sau n??y.'));
      });
    } else {
      this.notifierService.notify('error', this.translatePipe.transform('Tr??nh duy???t b???n ??ang s??? d???ng kh??ng h??? tr??? v??? tr??'));
    }
  }
}
