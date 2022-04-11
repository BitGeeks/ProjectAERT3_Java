import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../config/local';
import { Cart, ShoppingSession } from '../store/model';


@Injectable()
export class CartService {

  url = `${config.apiUrl}/api/cart`;
  rqn9Api = `https://api.rqn9.com/data/1.0/vmap_reverse`;

  constructor(private httpClient: HttpClient) {
  }

  getCart() {
    return this.httpClient.get<ShoppingSession>(`${this.url}/session`);
  }

  postCart(productId: number, amount: number) {
    return this.httpClient.post<Cart>(`${this.url}/create`, {
      productId,
      amount
    });
  }

  incrementCartItem(cartItemId: number, amount: number) {
    return this.httpClient.post<Cart>(`${this.url}/increment`, {
      cartItemId,
      amount: Number(amount)
    });
  }

  decrementCartItem(cartItemId: number, amount: number) {
    return this.httpClient.post<Cart>(`${this.url}/decrement`, {
      cartItemId,
      amount: Number(amount)
    });
  }

  setCartItemNum(cartItemId: number, amount: number) {
    return this.httpClient.post<Cart>(`${this.url}/setcartnum`, {
      cartItemId,
      amount: Number(amount)
    });
  }

  removeFromCart(id: number) {
    return this.httpClient.delete<Cart>(this.url + '/remove/' + id);
  }

  confirmCart(cart: ShoppingSession, ShippingMethodId: number, shippingAddress: string, shippingAmount: number, locationName: string, logitute: number, latitute: number) {
    return this.httpClient.post(this.url + '/confirm', {
      Id: cart.id,
      ShippingMethod_Id: ShippingMethodId,
      Total: cart.total,
      CartItems: cart.cartItems,
      shippingAddress,
      shippingAmount,
      locationName,
      logitute: logitute.toString(),
      latitute: latitute.toString()
    });
  }

  applyDiscount(code: string) {
    return this.httpClient.post<Cart>(`${this.url}/discount`, {
      code
    });
  }

  toggleCoupon(code: string) {
    return this.httpClient.post<ShoppingSession>(`${this.url}/coupon`, {
      code
    });
  }

  emptyCart() {
    return this.httpClient.delete(this.url);
  }

  requestIpLoc(lat: string, long: string) {
    return this.httpClient.get(`${this.rqn9Api}/${lat}/${long}`, {});
  }
}
