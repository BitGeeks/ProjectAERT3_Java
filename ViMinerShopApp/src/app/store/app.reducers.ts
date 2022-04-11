import { ActionReducerMap } from '@ngrx/store';
import * as fromCart from '../store/cart/cart.reducer';
import * as fromOrder from '../store/order/order.reducer';
import * as fromAuth from '../store/auth/auth.reducer';
import * as fromShowcase from '../store/showcase/showcase.reducer';
import * as fromBrowse from '../store/browse/browse.reducer';
import * as fromAddress from '../store/address/address.reducer';
import { HttpErrorResponse } from '@angular/common/http';

export interface HttpError {
  error: HttpErrorResponse;
  errorEffect: string;
}

export interface AppState {
  cart: fromCart.CartState;
  order: fromOrder.OrderState;
  auth: fromAuth.AuthState;
  showcase: fromShowcase.ShowcaseState;
  browse: fromBrowse.BrowseState;
  address: fromAddress.AddressState;
}

export const reducers: ActionReducerMap<AppState> = {
  cart: fromCart.cartReducer,
  order: fromOrder.orderReducer,
  auth: fromAuth.authReducer,
  showcase: fromShowcase.showcaseReducer,
  browse: fromBrowse.browseReducer,
  address: fromAddress.addressReducer
};
