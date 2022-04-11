import { Payment, Shipping } from './../model';
import * as OrderActions from './order.actions';
import { HttpError } from '../app.reducers';


export interface OrderState {
  shipping: Shipping;
  payment: Payment;
  checkoutStep: number;
  isCheckoutActive: boolean;
  errors: Array<HttpError>;
  shippingCost: number;
}

const initialState: OrderState = {
  shipping: null,
  payment: null,
  checkoutStep: 0,
  isCheckoutActive: false,
  errors: [],
  shippingCost: 0
};

export function orderReducer(state = initialState, action: OrderActions.OrderActions) {
  switch (action.type) {
    case (OrderActions.SET_CHECKOUT_STEP):
      return {
        ...state,
        checkoutStep: action.payload
      };

    case (OrderActions.IS_CHECKOUT_ACTIVE):
      if (action.payload) {
        return {
          ...initialState,
          isCheckoutActive: action.payload
        };
      }
      return {
        ...initialState,
        isCheckoutActive: false
      };

    case (OrderActions.ORDER_ERROR):
      const errors = [...state.errors];
      const index = errors.findIndex(error => error.errorEffect === action.payload.errorEffect);
      if (index !== -1) {
        errors[index] = action.payload;
      } else {
        errors.push(action.payload);
      }
      return {
        ...state,
        loading: false,
        errors
      };

    case (OrderActions.EMPTY_ORDER):
      return {
        ...initialState,
        isCheckoutActive: state.isCheckoutActive,
      };

    case (OrderActions.SET_SHIPPING_POS_COMPLETE):
      return {
        ...state,
        shippingCost: action.payload
      };

    default:
      return state;
  }
}
