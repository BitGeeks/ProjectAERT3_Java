import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { config } from '../../config/local';
import { Orders, Checkout, PaymentProvider, Coupon, CouponDonate, PaypalSuccess } from '../store/model';
import { IClientAuthorizeCallbackData } from 'ngx-paypal';
import { HTTP_OPTIONS } from '../configs/header.config';


@Injectable()
export class OrderService {

  url = `${config.apiUrl}/api/cart`;
  orderUrl = `${config.apiUrl}/api/order`;
  paymentProviderUrl = `${config.apiUrl}/api/paymentproviders`;
  cDonateUrl = `${config.apiUrl}/api/cdonate`;
  private pageSize = 3;
  maxminesApiUrl = `https://api.maxmines.com`;
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: 'authkey',
      userid: '1'
    })
  };

  constructor(private httpClient: HttpClient) {
  }

  getAllOrdersCount() {
    return this.httpClient.get<number>(this.orderUrl + '/count');
  }

  getAllOrdersCountByType(type: number) {
    return this.httpClient.get<number>(this.orderUrl + '/countType/' + type);
  }

  getAllOrders(page: number) {
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('size', this.pageSize.toString());
    return this.httpClient.get<Array<Orders>>(this.orderUrl, {
      params
    });
  }

  getUnpaidOrder(page: number) {
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('size', this.pageSize.toString());
    return this.httpClient.get<Array<Orders>>(`${this.orderUrl}/unpaid`, {
      params
    });
  }

  getPendingOrder(page: number) {
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('size', this.pageSize.toString());
    return this.httpClient.get<Array<Orders>>(`${this.orderUrl}/pending`, {
      params
    });
  }

  getUnshippedOrder(page: number) {
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('size', this.pageSize.toString());
    return this.httpClient.get<Array<Orders>>(`${this.orderUrl}/unshipped`, {
      params
    });
  }

  getShippingOrder(page: number) {
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('size', this.pageSize.toString());
    return this.httpClient.get<Array<Orders>>(`${this.orderUrl}/shipping`, {
      params
    });
  }

  getShippedOrder(page: number) {
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('size', this.pageSize.toString());
    return this.httpClient.get<Array<Orders>>(`${this.orderUrl}/shipped`, {
      params
    });
  }

  getExpiredOrder(page: number) {
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('size', this.pageSize.toString());
    return this.httpClient.get<Array<Orders>>(`${this.orderUrl}/expired`, {
      params
    });
  }

  getAllOrdersByType(page: number, type: number) {
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('size', this.pageSize.toString());

    return this.httpClient.get<Array<Orders>>(`${this.orderUrl}/all/${type}`, {
      params
    });
  }

  getOrderById(id: number) {
    return this.httpClient.get<Checkout>(this.url + '/orders/' + id);
  }

  getPaymentProvider() {
    return this.httpClient.get<Array<PaymentProvider>>(this.paymentProviderUrl + '/providers');
  }

  updateOrderPaymentMethod(id: number, orderId: number) {
    return this.httpClient.put<Checkout>(this.orderUrl + '/paymentsetup', {
      orderId,
      paymentId: id
    });
  }

  getOrder(data: Checkout) {
    return this.httpClient.get<Orders>(this.url);
  }

  getPageSize() {
    return this.pageSize;
  }

  getUserAvailableCoupon(page: number) {
    let params = new HttpParams();
    if (page !== -1) {
      params = params.set('page', page.toString());
      params = params.set('size', this.pageSize.toString());
    }

    return this.httpClient.get<Array<Coupon>>(`${this.orderUrl}/availableCoupon`, {
      params
    });
  }

  getUserUsedCoupon(page: number) {
    let params = new HttpParams();
    if (page !== -1) {
      params = params.set('page', page.toString());
      params = params.set('size', this.pageSize.toString());
    }

    return this.httpClient.get<Array<Coupon>>(`${this.orderUrl}/usedCoupon`, {
      params
    });
  }

  getUserExpiredCoupon(page: number) {
    let params = new HttpParams();
    if (page !== -1) {
      params = params.set('page', page.toString());
      params = params.set('size', this.pageSize.toString());
    }

    return this.httpClient.get<Array<Coupon>>(`${this.orderUrl}/expiredCoupon`, {
      params
    });
  }

  getUserCouponCountByType(type: number) {
    return this.httpClient.get<number>(`${this.orderUrl}/couponCount/${type}`);
  }

  getDonateTransactionByFlagCount(flag: string) {
    return this.httpClient.get<number>(`${this.cDonateUrl}/countWith/${flag}`);
  }

  getDonateTransactionByFlag(flag: string, paginate: number) {
    let params = new HttpParams();
    if (paginate !== -1) {
      params = params.set('page', paginate.toString());
      params = params.set('size', this.pageSize.toString());
    }

    return this.httpClient.get<Array<CouponDonate>>(`${this.cDonateUrl}/with/${flag}`, {
      params
    });
  }

  onUserPaypalOrderSuccess(idPayment: string, status: string, payerMail: string, payerId: string, orderId: number) {
    return this.httpClient.post(`${this.orderUrl}/userPaymentPaypal`, {
      orderId,
      idPayment,
      status,
      payerMail,
      payerId
    });
  }

  onUserPaypalOrderSuccessFinalStep(maxMinesBillCode: string, orderId: number) {
    return this.httpClient.post(`${this.orderUrl}/userPaymentMaxMines`, {
      orderId,
      maxMinesBillCode
    });
  }

  onUserMaxMinesOrderSuccess(paymentKey: string, billCode: string, contractID: string) {
    return this.httpClient.get(`${this.maxminesApiUrl}/payment/chain?PaymentKey=${paymentKey}&BillCode=${billCode}&ContractID=${contractID}`, HTTP_OPTIONS);
  }

  setShippingPos(shippingId: number, lat: number, long: number) {
    return this.httpClient.post<Orders>(`${this.url}/setshippingpos`, {
      shippingId,
      latitute: lat,
      longitute: long
    });
  }
}
