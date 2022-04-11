import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as fromApp from '../../store/app.reducers';
import { Store } from '@ngrx/store';
import * as OrderActions from '../../store/order/order.actions';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription, throwError } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { catchError, take } from 'rxjs/operators';
import * as CartActions from '../../store/cart/cart.actions';
import { Checkout, MaxMinesSuccessPayment, PaymentProvider, PaypalSuccess } from 'src/app/store/model';
import { CartState } from 'src/app/store/cart/cart.reducer';
import {
    IPayPalConfig,
    ICreateOrderRequest
} from 'ngx-paypal';
import { NotifierService } from 'angular-notifier';
import { config } from 'src/config/local';
import { Title } from '@angular/platform-browser';
import { TranslatePipe } from '@ngx-translate/core';
import { BrowseState } from 'src/app/store/browse/browse.reducer';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;

  paramSubscription: Subscription;
  paymentForm: FormGroup;
  orderData: Checkout;

  itemOrder: Object[];

  providerList: Array<PaymentProvider>;
  paymentMethodSelected = 0;

  days: Array<number>;
  months: Array<number>;
  orderId: number;
  cartState: Observable<CartState>;

  browseState: Observable<BrowseState>;
  browserSubscription: Subscription;
  currency = 'USD';
  currencyRate = 1;

  maxminesBillCode = null;

  isMaxMinesAuthenticate = false;
  paymentDesc = null;
  paypalPayment = false;

  isLoading = false;

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private notifierService: NotifierService,
    private titleMeta: Title,
    private translatePipe: TranslatePipe
  ) {
  }

  ngOnInit() {
    this.titleMeta.setTitle(this.translatePipe.transform('Thanh toán đơn hàng'));
    this.cartState = this.store.select('cart');
    this.browseState = this.store.select('browse');
    this.paramSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.orderId = params.orderId;
        this.route.queryParams
          .subscribe(prm => {
            if (!prm.mm_pay_source) { return; }
            this.isLoading = true;
            this.maxminesBillCode = atob(prm.mm_pay_source);
            this.orderService.onUserMaxMinesOrderSuccess(config.maxMinesPaymentKey, this.maxminesBillCode, params.orderId)
              .subscribe((data: MaxMinesSuccessPayment) => {
                this.orderService.onUserPaypalOrderSuccessFinalStep(data.BillCode, this.orderData.id)
                .pipe(take(1), catchError(
                  error => {
                    this.notifierService.notify('error', this.translatePipe.transform('Đã có lỗi xảy ra trong quá trình thao tác. Vui lòng thử lại!'));
                    this.isLoading = false;
                    return throwError(error);
                  }
                )).subscribe(() => {
                  this.isLoading = false;
                  this.notifierService.notify('success', this.translatePipe.transform('Thanh toán thành công'));
                  this.store.dispatch(new OrderActions.CompleteOrderSetup(this.orderData.id));
                });
              });
          }
        );
        this.orderService.getOrderById(this.orderId).pipe(take(1), catchError(
          error => {
            this.notifierService.notify('error', this.translatePipe.transform('Đã có lỗi xảy ra trong quá trình thao tác. Vui lòng thử lại!'));
            if (error.status === 400) {
              this.store.dispatch(new CartActions.FetchCart());
            }
            this.router.navigate(['/cart']);
            return throwError(error);
          }
        )).subscribe((res: Checkout) => {
          this.orderData = res;
          this.processDataForPPPayment(res);
          this.orderService.getPaymentProvider().pipe(take(1), catchError(
            error => {
              this.notifierService.notify('error', this.translatePipe.transform('Có lỗi xảy ra trong quá trình tải dữ liệu!'));
              if (error.status === 400) {
                this.store.dispatch(new CartActions.FetchCart());
              }
              this.router.navigate(['/cart']);
              return throwError(error);
            }
          )).subscribe((resp: Array<PaymentProvider>) => {
            this.initConfig();
            this.providerList = resp;
            if (resp.length !== 0) {
              this.onUserSelectPaymentMethod(resp[0].id);
            }
          });
        });
    });
    this.browserSubscription = this.browseState.subscribe(data => {
      this.currency = data.currentCurrency;
      if (JSON.stringify(data.exchangeRates) !== '{}') {
        this.currencyRate = data.exchangeRates[data.currentCurrency];
      }
    });
  }

  processDataForPPPayment(res: Checkout) {
    this.itemOrder = [];
    res.orderItems.map(data => {
      this.itemOrder.push({
        name: data.product.name,
        quantity: data.quantity.toString(),
        category: 'DIGITAL_GOODS',
        unit_amount: {
            currency_code: 'USD',
            value: (data.product.pricePromotion === 0 ? data.product.price : data.product.pricePromotion).toFixed(2).toString(),
        },
      });
    });
    this.itemOrder.push({
      name: 'Shipping Fee',
      quantity: 1,
      category: 'DIGITAL_GOODS',
      unit_amount: {
          currency_code: 'USD',
          value: res.shippingAmount.toFixed(2).toString(),
      }
    });
  }

  onUserSkip() {
    // disabled
  }

  onPaymentSubmit() {
    this.orderService.updateOrderPaymentMethod(this.paymentMethodSelected, this.orderId).pipe(take(1), catchError(
      error => {
        this.notifierService.notify('error', this.translatePipe.transform('Đã có lỗi xảy ra, vui lòng thử lại'));
        if (error.status === 400) {
          this.store.dispatch(new CartActions.FetchCart());
        }
        this.router.navigate(['/cart']);
        return throwError(error);
      }
    )).subscribe((res: Checkout) => {
      this.store.dispatch(new OrderActions.CompleteOrderSetup(res.id));
    });
  }

  onMaxMinesPaymentClick() {
    // this.router.navigate([`/checkout/orderInfo/${this.orderData.id}`]);
    window.location.href =
      `https://maxmines.com/payment/chain/${config.maxMinesPaymentKey}/${btoa(window.location.href)}/${this.orderData.subTotal}/USD/${this.orderData.id}`;
  }

  elementRepair(content: string, id: string) {
    return content.replace('USER_CURRENT_ORDER_ID', id);
  }

  onUserSelectPaymentMethod(methodId: number) {
    this.isMaxMinesAuthenticate = false;
    this.paypalPayment = false;
    const selectedPayment = this.providerList.filter(pl => pl.id === methodId)[0];
    this.paymentMethodSelected = selectedPayment.id;
    switch (selectedPayment.name.toLowerCase()) {
      case 'maxmines payment':
        this.isMaxMinesAuthenticate = true;
        break;
      case 'paypal':
        this.paypalPayment = true;
        break;
      default:
        this.paymentDesc = selectedPayment.desc;
        break;
    }
  }

  // @ts-ignore
  private initConfig(): void {
    this.payPalConfig = {
    currency: 'USD',
    clientId: 'sb',
    createOrderOnClient: (data) => <ICreateOrderRequest> {
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'USD',
                value: parseFloat(this.orderData.total).toFixed(2).toString(),
                breakdown: {
                    item_total: {
                        currency_code: 'USD',
                        value: parseFloat(this.orderData.total).toFixed(2).toString()
                    }
                }
            },
            items: this.itemOrder
        }]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onClientAuthorization: (data) => {
      this.orderService.onUserPaypalOrderSuccess(data.id, data.status, data.payer.email_address, data.payer.payer_id, this.orderData.id)
      .pipe().subscribe(() => {
        this.notifierService.notify('success', this.translatePipe.transform('Thanh toán thành công'));
        this.store.dispatch(new OrderActions.CompleteOrderSetup(this.orderData.id));
      });
    },
    onCancel: (data, actions) => {
      this.notifierService.notify('success', this.translatePipe.transform('Hủy thanh toán thành công'));
    },
    onError: err => {
      this.notifierService.notify('error', this.translatePipe.transform('Đã có lỗi xảy ra trong quá trình thanh toán!'));
    }
  };
  }

  ngOnDestroy(): void {
    if (this.browserSubscription) {
      this.browserSubscription.unsubscribe();
    }
  }
}
