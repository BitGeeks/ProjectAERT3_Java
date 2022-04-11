import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as OrderActions from './order.actions';
import * as CartActions from '../cart/cart.actions';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';


@Injectable()
export class OrderEffects {

  @Effect()
  getOrder = this.actions$
    .pipe(ofType(OrderActions.GET_ORDER),
      map((action: OrderActions.GetOrderById) => {
        return action.payload;
      }),
      switchMap((id: number) => {
        return this.orderService.getOrderById(id)
          .pipe(switchMap(res => {
            this.router.navigate([`/checkout/payment/${res.id}`]);
            return [
              { type: OrderActions.EMPTY_ORDER },
              { type: CartActions.EMPTY_CART_SUCCESS }];
          }), catchError(error => {
            return of(
              new OrderActions.OrderError(
                { error, errorEffect: OrderActions.GET_ORDER }));
          }));
      }));

  @Effect()
  setShippingPos = this.actions$
    .pipe(ofType(OrderActions.SET_SHIPPING_POS),
      map((action: OrderActions.SetShippingPosition) => {
        return action.payload;
      }),
      switchMap((payload: { shippingId: number, lat: number, long: number }) => {
        return this.orderService.setShippingPos(payload.shippingId, payload.lat, payload.long)
          .pipe(switchMap(res => {
            return [
              { type: OrderActions.SET_SHIPPING_POS_COMPLETE, payload: res }
            ];
          }), catchError(error => {
            return of(
              new OrderActions.OrderError(
                { error, errorEffect: OrderActions.SET_SHIPPING_POS }));
          }));
      }));

  @Effect()
  completeOrderSetup = this.actions$
    .pipe(ofType(OrderActions.COMPLETE_ORDER_SETUP),
      map((action: OrderActions.CompleteOrderSetup) => {
        return action.payload;
      }),
      switchMap((id: number) => {
        return this.orderService.getOrderById(id)
          .pipe(switchMap(res => {
            this.router.navigate([`/checkout/orderInfo/${res.id}`]);
            return [
              { type: OrderActions.EMPTY_ORDER },
              { type: CartActions.EMPTY_CART_SUCCESS }];
          }), catchError(error => {
            return of(
              new OrderActions.OrderError(
                { error, errorEffect: OrderActions.GET_ORDER }));
          }));
      }));

  constructor(private actions$: Actions, private orderService: OrderService, private router: Router) {
  }
}
