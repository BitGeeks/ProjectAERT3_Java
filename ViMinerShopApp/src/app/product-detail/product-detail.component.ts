import { CartState } from '../store/cart/cart.reducer';
import { ProductDetail, productImage } from '../store/model';
import { Component, OnDestroy, OnInit, HostListener, ComponentFactoryResolver, Inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as CartActions from '../store/cart/cart.actions';
import { Observable, Subscription, throwError } from 'rxjs';
import { LocationStrategy } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, take } from 'rxjs/operators';
import { convertFlag } from 'src/utils/flag';
import * as OrderActions from '../store/order/order.actions';
import { abbreviateNumber } from 'src/utils/converters/abbr';
import { DOCUMENT } from '@angular/common';
import { NotifierService } from 'angular-notifier';
import { AuthState } from '../store/auth/auth.reducer';
import { Title } from '@angular/platform-browser';
import { TranslatePipe } from '@ngx-translate/core';
import { BrowseState } from '../store/browse/browse.reducer';
import { AccountService } from '../services/account.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  paramSubscription: Subscription;
  amount = 1;

  product: ProductDetail;

  cartState: Observable<CartState>;
  authState: Observable<AuthState>;
  innerLoading = true;

  productUrl: string;
  variant: number;

  isNotifyShowing = false;

  isPopState = false;
  fetchError: HttpErrorResponse = null;
  routerSubscription: Subscription;

  activeTab = 0;
  showActiveController = false;
  currentImage: productImage;

  notifyNumber = 1;

  maxMiner = 0;
  imageInitial: productImage = {
    id: 0,
    alt_Name: 'Placeholder',
    imageUrl: 'https://cdn.notevn.com/DzPbjDuoi.png',
    created_at: null,
    updated_at: null
  };

  browseState: Observable<BrowseState>;
  browserSubscription: Subscription;
  currency = 'USD';
  currencyRate = 1;

  tabWidthPercent = 25;
  reload = false;

  constructor(private router: Router, private route: ActivatedRoute,
              private locStrat: LocationStrategy,
              private productService: ProductService,
              private store: Store<fromApp.AppState>,
              @Inject(DOCUMENT) private document: Document,
              private notifierService: NotifierService,
              private titleMeta: Title,
              private translatePipe: TranslatePipe,
              private accountService: AccountService
  ) {
  }

  @HostListener('window:scroll', []) onScrollEvent(){
    const verticalOffset = window.pageYOffset
          || document.documentElement.scrollTop
          || document.body.scrollTop || 0;
    const top = this.document.getElementById('pin').getBoundingClientRect().top;
    this.showActiveController = top < -93 ? true : false;
  }

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.browseState = this.store.select('browse');
    this.authState = this.store.select('auth');
    this.cartState = this.store.select('cart');
    this.locStrat.onPopState(() => {
      this.isPopState = true;
    });

    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && !this.isPopState) {
        window.scrollTo(0, 0);
        this.isPopState = false;
      }

      if (event instanceof NavigationEnd) {
        this.isPopState = false;
      }
    });

    this.paramSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.productUrl = params.productUrl;

        this.innerLoading = true;
        this.productService.getFullProduct(this.productUrl)
          .pipe(take(1), catchError(
            error => {
              this.fetchError = error;
              this.innerLoading = false;
              this.router.navigate([`/`]);
              return throwError(error);
            }
          ))
          .subscribe(
            (data: ProductDetail) => {
              this.titleMeta.setTitle(`${this.translatePipe.transform('Chi tiết')} ${data.name}`);
              this.product = data;
              this.currentImage = data.productImages.length !== 0 ? data.productImages[0] : this.imageInitial;
              this.variant = params.variant ? params.variant : this.product.id;
              this.maxMiner = data.productInventory.quantity;
              this.setDefaultActiveTab();
              this.setDefaultWidthSizeTab(data);
              this.innerLoading = false;
              if (this.paramSubscription) {
                this.paramSubscription.unsubscribe();
              }
            }
          );
      }
    );

    this.browserSubscription = this.browseState.subscribe(data => {
      this.currency = data.currentCurrency;
      if (JSON.stringify(data.exchangeRates) !== '{}') {
        this.currencyRate = data.exchangeRates[data.currentCurrency];
      }
    });
  }

  setDefaultWidthSizeTab(data) {
    const a = ['noteDesc', 'detailDesc', 'paymentDesc', 'warrantyDesc'];
    const b = 4 - a.filter(a => {
      return data[a] === null || data[a].trim().length === 0;
    }).length;
    this.tabWidthPercent = b === 4 ? 25 : b === 3 ? 33 : b === 2 ? 50 : 100;
  }

  setDefaultActiveTab() {
    if (this.product.noteDesc !== null) { this.activeTab = 0; }
    else if (this.product.detailDesc !== null) { this.activeTab = 1; }
    else if (this.product.paymentDesc !== null) { this.activeTab = 2; }
    else if (this.product.warrantyDesc !== null) { this.activeTab = 3; }
  }

  onUserClickShowDialog() {
    this.store.select('auth')
      .pipe(take(1))
      .subscribe(data => {
        if (data.authenticated) {
          this.isNotifyShowing = !this.isNotifyShowing;
        }
        else {
          this.notifierService.notify('error', this.translatePipe.transform('Bạn phải đăng nhập trước đã!'));
          this.router.navigate(['/login']);
        }
      });
  }

  onImageHover($event, image) {
    this.currentImage = image;
  }

  convertFeature(flag: string) {
    return convertFlag(flag);
  }

  abbreviateNumber = (num: number) => abbreviateNumber(num);

  onUserSubmitGetNotify() {
    this.accountService.setProductNotify(this.product.id, this.notifyNumber)
      .pipe(take(1), catchError(error => {
        this.notifierService.notify('error', this.translatePipe.transform('Bạn phải đăng nhập trước đã!'));
        this.router.navigate(['/login']);
        return throwError(error);
      }
    )).subscribe(() => {
      this.notifierService.notify('success', this.translatePipe.transform('Đăng ký nhận thông báo thành công! Bạn sẽ nhận được thông báo khi sản phẩm được nhập kho'));
      this.onUserClickShowDialog();
    });
  }

  ngOnDestroy() {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    if (this.browserSubscription) {
      this.browserSubscription.unsubscribe();
    }
  }

  handleInputAmount(ev) {
    const { value } = ev.target;
    this.amount = parseInt(value, 0) <= 1 ? 1 : this.maxMiner < parseInt(value, 0) ? this.maxMiner : parseInt(value, 0);
  }

  setActiveTab(tab: number) {
    this.activeTab = tab;
  }

  setActiveVariant(variantId: number) {
    this.router.navigate(['/detail/', this.productUrl, variantId]);
  }

  onUserClickBtn(value: number) {
    this.amount += value;
  }

  buyNow() {
    const amount = this.amount + '';
    const reg = new RegExp('^[0-9]+$');
    if (!reg.test(amount) || parseInt(amount, 0) === 0) {
      this.notifierService.notify('error', this.translatePipe.transform('Vui lòng nhập đúng số lượng'));
      return;
    }

    this.store.select('auth')
      .pipe(take(1))
      .subscribe(data => {
        if (data.authenticated && data.isActive) {
          this.store.dispatch(new CartActions.BuyNowBtn({ id: this.product.id, amount: parseInt(amount, 0) }));
        }
        else if (!data.isActive) {
          this.notifierService.notify('error', this.translatePipe.transform('Bạn phải xác minh tài khoản trước đã!'));
          this.router.navigate(['/checkpoint']);
        }
        else {
          this.notifierService.notify('error', this.translatePipe.transform('Bạn phải đăng nhập trước đã!'));
          this.router.navigate(['/login']);
        }
      });
  }

  addToCart() {
    const amount = this.amount + '';
    const reg = new RegExp('^[0-9]+$');
    if (!reg.test(amount) || parseInt(amount, 0) === 0) {
      this.notifierService.notify('error', this.translatePipe.transform('Vui lòng nhập đúng số lượng'));
      return;
    }

    this.store.select('auth')
      .pipe(take(1))
      .subscribe(data => {
        if (data.authenticated && data.isActive) {
          this.store.dispatch(new CartActions.AddToCart({ id: this.product.id, amount: parseInt(amount, 0) }));
        }
        else if (!data.isActive) {
          this.notifierService.notify('error', this.translatePipe.transform('Bạn phải xác minh tài khoản trước đã!'));
          this.router.navigate(['/checkpoint']);
        }
        else {
          this.notifierService.notify('error', this.translatePipe.transform('Bạn phải đăng nhập trước đã!'));
          this.router.navigate(['/login']);
        }
      });
  }

  onUserClickNotifyNumber(nub: number) {
    if (this.notifyNumber <= 1 && nub < 0) {
      return;
    }
    this.notifyNumber += nub;
  }

  onUserChangeNotifyNumber(ev) {
    const { value } = ev.target;
    if (value < 1) { this.notifyNumber = 1; }
    else { this.notifyNumber = value; }
  }
}
