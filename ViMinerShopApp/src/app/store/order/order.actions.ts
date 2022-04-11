import { Shipping, Payment } from './../model';

import { Action } from '@ngrx/store';
import { HttpError } from '../app.reducers';
import { Checkout } from '../model';

export const IS_CHECKOUT_ACTIVE = 'IS_CHECKOUT_ACTIVE';
export const SET_CHECKOUT_STEP = 'SET_CHECKOUT_STEP';
export const GET_ORDER = 'GET_ORDER';
export const EMPTY_ORDER = 'EMPTY_ORDER';
export const ORDER_ERROR = 'ORDER_ERROR';
export const COMPLETE_ORDER_SETUP = 'COMPLETE_ORDER_SETUP';
export const SET_SHIPPING_POS = 'SET_SHIPPING_POS';
export const SET_SHIPPING_POS_COMPLETE = 'SET_SHIPPING_POS_COMPLETE';

export class IsCheckoutActive implements Action {
  readonly type = IS_CHECKOUT_ACTIVE;

  constructor(public payload: boolean) {
  }
}

export class CompleteOrderSetup implements Action {
  readonly type = COMPLETE_ORDER_SETUP;

  constructor(public payload: number) {
  }
}

export class SetCheckoutStep implements Action {
  readonly type = SET_CHECKOUT_STEP;

  constructor(public payload: number) {
  }
}

export class GetOrderById implements Action {
  readonly type = GET_ORDER;

  constructor(public payload: number) {
  }
}

export class SetShippingPosition implements Action {
  readonly type = SET_SHIPPING_POS;

  constructor(public payload: { shippingId: number, lat: number, long: number }) {
  }
}

export class SetShippingPositionComplete implements Action {
  readonly type = SET_SHIPPING_POS_COMPLETE;

  constructor(public payload: number) {
  }
}

export class EmptyOrder implements Action {
  readonly type = EMPTY_ORDER;
}

export class OrderError implements Action {
  readonly type = ORDER_ERROR;

  constructor(public payload: HttpError) {
  }
}


export type OrderActions = IsCheckoutActive | GetOrderById |
  SetCheckoutStep | OrderError | EmptyOrder
  | SetShippingPosition | SetShippingPositionComplete;
