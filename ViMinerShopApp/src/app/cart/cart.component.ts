import { CartState } from './../store/cart/cart.reducer';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromApp from '../store/app.reducers';
import { Store } from '@ngrx/store';
import * as CartActions from '../store/cart/cart.actions';
import * as OrderActions from '../store/order/order.actions';
import { take } from 'rxjs/operators';
import { ShoppingSession } from '../store/model';
import { CartService } from '../services/cart.service';
import { NotifierService } from 'angular-notifier';
import { Title } from '@angular/platform-browser';
import { TranslatePipe } from '@ngx-translate/core';
import { BrowseState } from '../store/browse/browse.reducer';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  isLoading = false;

  cartState: Observable<CartState>;
  cartItemCountSubscription: Subscription;
  showDiscountInput = false;
  onSelectItem = {};
  cloneCartItemArr = [];

  browseState: Observable<BrowseState>;
  browserSubscription: Subscription;
  currency = 'USD';
  currencyRate = 1;

  applyCodeShow = false;
  cartItemCount = 0;
  allDisabled = false;

  cartData: ShoppingSession;
  totalDisabledPrice = 0;

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private route: ActivatedRoute,
    private cartService: CartService,
    private notifierService: NotifierService,
    private titleMeta: Title,
    private translatePipe: TranslatePipe
  ) {
  }

  ngOnInit() {
    this.titleMeta.setTitle(this.translatePipe.transform('Giỏ hàng'));
    this.store.dispatch(new OrderActions.SetCheckoutStep(0));
    this.cartState = this.store.select('cart');
    this.browseState = this.store.select('browse');
    this.cartItemCountSubscription = this.cartState.subscribe(data => {
      if (data.cart && data.cart.cartItems.length) {
        this.cartData = data.cart;
        this.cartItemCount = data.cart.cartItems.reduce((total, cartItem) => {
          this.onSelectItem[cartItem.id] = true;
          return total + cartItem.quantity;
        }, 0);
      } else {
        this.cartItemCount = 0;
      }
    });
    this.browserSubscription = this.browseState.subscribe(data => {
      this.currency = data.currentCurrency;
      if (JSON.stringify(data.exchangeRates) !== '{}') {
        this.currencyRate = parseFloat(data.exchangeRates[data.currentCurrency]);
      }
    });
  }

  onUserClickCheckerHF() {
    Object.keys(this.onSelectItem).map(s => {
      const product = this.cartData.cartItems.filter(ci => ci.id === parseInt(s))[0];
      if (!this.onSelectItem[s]) {
        this.totalDisabledPrice += (product.product.pricePromotion === 0 ? product.product.price : product.product.pricePromotion) * product.quantity;
      } else {
        this.totalDisabledPrice -= (product.product.pricePromotion === 0 ? product.product.price : product.product.pricePromotion) * product.quantity;
      }
      this.onSelectItem[s] = this.allDisabled;
    });
    this.allDisabled = !this.allDisabled;
  }

  clearAllTxt() {
    Object.keys(this.onSelectItem).map(s => {
      const product = this.cartData.cartItems.filter(ci => ci.id === parseInt(s))[0];
      if (!this.onSelectItem[s]) {
        this.totalDisabledPrice += (product.product.pricePromotion === 0 ? product.product.price : product.product.pricePromotion) * product.quantity;
      } else {
        this.totalDisabledPrice -= (product.product.pricePromotion === 0 ? product.product.price : product.product.pricePromotion) * product.quantity;
      }
      this.onSelectItem[s] = false;
    });
    this.allDisabled = true;
  }

  onUserProductAmountChange(ev, itemId) {
    const { name, value } = ev.target;
    if (value < 1) this.setCartAmount(itemId, 1);
    else this.setCartAmount(itemId, value);
  }

  onUserClickDeleteSelecting() {
    Object.keys(this.onSelectItem).map(s => {
      const product = this.cartData.cartItems.filter(ci => ci.id === parseInt(s))[0];
      if (this.onSelectItem[s]) {
        this.removeFromCart(product.id);
      }
    });
  }

  onUserClickCheckerIvu(itemId: number) {
    const product = this.cartData.cartItems.filter(ci => ci.id === itemId)[0];
    if (!this.onSelectItem[itemId]) {
      this.totalDisabledPrice += (product.product.pricePromotion === 0 ? product.product.price : product.product.pricePromotion) * product.quantity;
    } else {
      this.totalDisabledPrice -= (product.product.pricePromotion === 0 ? product.product.price : product.product.pricePromotion) * product.quantity;
    }
    this.onSelectItem[itemId] = !this.onSelectItem[itemId];
    if (Object.keys(this.onSelectItem).filter(s => this.onSelectItem[s]).length === 0) {
      this.allDisabled = true;
    } else {
      this.allDisabled = false;
    }
  }

  ngOnDestroy() {
    if (this.cartItemCountSubscription) {
      this.cartItemCountSubscription.unsubscribe();
    }
    if (this.browserSubscription) {
      this.browserSubscription.unsubscribe();
    }
  }

  applyCode(discountCodeField: HTMLInputElement) {
    const discountCode = discountCodeField.value;
    this.store.dispatch(new CartActions.ApplyDiscount(discountCode));
  }

  goToItem(productUrl) {
    this.router.navigate(['/detail/', productUrl], { relativeTo: this.route });
  }

  removeFromCart(id: number) {
    this.store.dispatch(new CartActions.RemoveFromCart(id));
  }

  amountIncrement(id: number) {
    if (!this.onSelectItem[id]) {
      this.notifierService.notify('error', this.translatePipe.transform('Bạn phải chọn lại sản phẩm này'));
      return;
    }
    this.store.dispatch(new CartActions.IncrementCart({ id, amount: 1 }));
  }

  amountDecrement(id: number) {
    if (!this.onSelectItem[id]) {
      this.notifierService.notify('error', this.translatePipe.transform('Bạn phải chọn lại sản phẩm này'));
      return;
    }
    this.store.dispatch(new CartActions.DecrementCart({ id, amount: 1 }));
  }

  setCartAmount(id: number, amount: number) {
    this.store.dispatch(new CartActions.SetCartNumber({ id, amount }));
  }

  activatePurchase() {
    this.isLoading = true;
    this.store.select('auth')
      .pipe(take(1))
      .subscribe(data => {
        this.isLoading = false;
        if (data.isActive) {
          this.store.dispatch(new OrderActions.IsCheckoutActive(true));
          this.router.navigate(['/checkout'], { relativeTo: this.route });
        } else {
          this.router.navigate(['/checkpoint']);
        }
      });
  }
}
