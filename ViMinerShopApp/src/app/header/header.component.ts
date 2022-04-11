import { AuthState } from './../store/auth/auth.reducer';
import { CartState } from './../store/cart/cart.reducer';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as CartActions from '../store/cart/cart.actions';
import * as OrderActions from '../store/order/order.actions';
import * as AuthActions from '../store/auth/auth.actions';
import { Observable, Subscription, throwError } from 'rxjs';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { catchError, take } from 'rxjs/operators';
import { User } from '../store/model';
import { AccountService } from '../services/account.service';
import { BrowseState } from '../store/browse/browse.reducer';
import * as BrowseActions from '../store/browse/browse.actions';
import { I18nService } from '../i18n';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [NgbDropdownConfig]
})
export class HeaderComponent implements OnInit, OnDestroy {

  cartState: Observable<CartState>;
  authState: Observable<AuthState>;
  browseState: Observable<BrowseState>;
  browserSubscription: Subscription;
  currency = 'USD';
  currencyRate = 1;

  currentCategory = 0;
  selectedCategory = 'any';

  checked = false;

  onShowingTab = [false, false, false, false, false];

  cartItemCountSubscription: Subscription;
  cartItemCount = 0;
  isCollapsed = true;
  isCartOpening = false;

  authStateSubscription: Subscription;
  currentRoute = '';
  userData: User;
  headerStyle = 'rgba (0, 0, 0)';

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private route: ActivatedRoute,
    public dropdownConfig: NgbDropdownConfig,
    private accountService: AccountService,
    private i18nService: I18nService
  ) {
    dropdownConfig.placement = 'bottom-right';
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.currentRoute = window.location.pathname;
      }
    });
  }

  @HostListener('window:scroll', ['$event']) onScrollEvent($event){
    if (this.currentRoute === '/') {
      const e = document.body.scrollTop || document.documentElement.scrollTop;
      const s = Math.min(1, e / 270 * 1);
      this.headerStyle = 'rgba(0, 0, 0, ' + s + ')';
    }
  }

  ngOnInit() {
    this.authState = this.store.select('auth');
    this.cartState = this.store.select('cart');
    this.browseState = this.store.select('browse');

    this.authStateSubscription = this.authState
      .subscribe((data) => {
        if (data.authenticated && data.isActive) {
          this.getUserInfo();
          this.store.dispatch(new CartActions.FetchCart());
          this.cartItemCountSubscription = this.cartState.subscribe(data => {
            if (data.cart && data.cart.cartItems.length !== 0) {
              this.cartItemCount = data.cart.cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
            }
            else {
              this.cartItemCount = 0;
            }
          });
        }
        else if (data.authenticated && this.currentRoute !== '' && !data.isActive && !this.currentRoute.includes('checkpoint') && !this.currentRoute.includes('verify')) { this.router.navigate([`/checkpoint`]); }
        else {
          if (this.cartItemCountSubscription) {
            this.cartItemCountSubscription.unsubscribe();
          }
        }
      }
      );
    this.browserSubscription = this.browseState.subscribe(data => {
      this.currency = data.currentCurrency;
      if (JSON.stringify(data.exchangeRates) !== '{}') {
        this.currencyRate = data.exchangeRates[data.currentCurrency];
      }
    });

    this.browseState.pipe(take(1)).subscribe(data => {
      this.selectedCategory = data.selectedCategory;

      if (data.categories.length === 0) {
        this.store.dispatch(new BrowseActions.FetchCategory());
      }
      if (data.products.length === 0) {
        this.getProducts();
      }
    });
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
    this.onUserClickTab(4);
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  getProducts() {
    this.store.dispatch(new BrowseActions.FetchProducts({ page: 0, sort: 'any', category: this.selectedCategory, algorithm: 'any', minPrice: '0', maxPrice: '0', minHashrate: '0', maxHashrate: '0', searchString: '' }));
  }

  onUserClickTab(navItem: number) {
    const defaultBool = this.onShowingTab[navItem];
    this.onShowingTab.fill(false);
    this.onShowingTab[navItem] = !defaultBool;
  }

  onUserHoverCategory(category) {
    this.currentCategory = category.id;
    this.selectedCategory = category.name;
    this.getProducts();
  }

  ngOnDestroy() {
    if (this.authStateSubscription) {
      this.authStateSubscription.unsubscribe();
    }
    if (this.cartItemCountSubscription) {
      this.cartItemCountSubscription.unsubscribe();
    }
    if (this.browserSubscription) {
      this.browserSubscription.unsubscribe();
    }
  }

  userSignOut() {
    this.onUserClickTab(1);
    this.store.dispatch(new AuthActions.SignOut());
    this.router.navigate(['/']);
  }

  searchProduct(search: HTMLInputElement) {
    if (search.value.trim().length) {
      const url = '/search/' + search.value;
      this.router.navigate([url]);
    }
  }

  getUserInfo() {
    this.accountService.getUser().pipe(take(1), catchError(error => {
      this.store.dispatch(new AuthActions.SignOut());
      this.router.navigate(['/']);
      return throwError(error);
    }
    )).subscribe(data => {
      this.userData = data;
    });
  }

  activatePurchase() {
    this.store.select('auth')
      .pipe(take(1))
      .subscribe(data => {
        if (data.isActive) {
          this.store.dispatch(new OrderActions.IsCheckoutActive(true));
          this.router.navigate(['/cart'], { relativeTo: this.route });
          this.onUserClickTab(2);
        } else if (!data.isActive) {
          this.router.navigate(['/checkpoint']);
        }
      });
  }
}
