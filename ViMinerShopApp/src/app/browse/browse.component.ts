import { ProductCategory } from './../store/model';
import { BrowseState } from './../store/browse/browse.reducer';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as fromApp from '../store/app.reducers';
import { Store } from '@ngrx/store';
import * as BrowseActions from '../store/browse/browse.actions';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { RangeFilter } from './range-filter/range-filter.model';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslatePipe } from '@ngx-translate/core';
import { abbreviateNumber } from 'src/utils/converters/abbr';


@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit, OnDestroy {
  sortBy = [
    {
      display: 'Mặc định',
      value: 'any'
    },
    {
      display: 'Giá thấp dần',
      value: 'lowest'
    },
    {
      display: 'Giá cao dần',
      value: 'highest'
    },
    {
      display: 'Hashrate thấp dần',
      value: 'hlowest'
    },
    {
      display: 'Hashrate cao dần',
      value: 'hhighest'
    },
    {
      display: 'Trọng lượng thấp dần',
      value: 'wlowest'
    },
    {
      display: 'Trọng lượng cao dần',
      value: 'whighest'
    }
  ];

  viewType = [
    {
      display: 'Mặc định',
      value: 'grid'
    },
    {
      display: 'Thanh ngang',
      value: 'bar'
    }
  ];

  selectedView = 'grid';

  fbFilter: RangeFilter = new RangeFilter('price', 'Price', 0, 10000, true);

  browseOptionsForm: FormGroup;

  browseState: Observable<BrowseState>;
  canFetchSubscription: Subscription;
  currency = 'USD';
  currencyRate = 1;

  canFetch = false;
  selectedPage = 0;
  selectedSort = 'any';
  selectedCategory = 'any';
  selectedAlgorithm = 'any';
  minPrice = '0';
  maxPrice = '0';
  minHashrate = '0';
  maxHashrate = '0';
  minPriceReal = '0';
  maxPriceReal = '0';

  searchString = '';

  public filterResults: any = new Object();

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private titleMeta: Title,
    private translatePipe: TranslatePipe
  ) {
  }

  ngOnInit() {
    this.titleMeta.setTitle(this.translatePipe.transform('Duyệt sản phẩm'));
    this.browseState = this.store.select('browse');
    this.canFetchSubscription = this.browseState.subscribe(data => {
      this.canFetch = data.canFetch;
      this.currency = data.currentCurrency;
      if (JSON.stringify(data.exchangeRates) !== '{}') {
        this.currencyRate = data.exchangeRates[data.currentCurrency];
      }
    });

    this.browseState.pipe(take(1)).subscribe(data => {
      this.selectedPage = data.selectedPage;
      this.selectedSort = data.selectedSort;
      this.selectedCategory = data.selectedCategory;
      this.selectedAlgorithm = data.selectedAlgorithm;
      this.minPrice = data.minPrice;
      this.maxPrice = data.maxPrice;

      if (data.categories.length === 0) {
        this.store.dispatch(new BrowseActions.FetchCategory());
      }
      if (data.products.length === 0) {
        this.getProducts();
      }

      if (data.algorithms.length === 0) {
        this.store.dispatch(new BrowseActions.FetchAlgorithm());
      }
      if (data.algorithms.length === 0) {
        this.getProducts();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.canFetchSubscription) {
      this.canFetchSubscription.unsubscribe();
    }
  }

  onUserChangeSearchString(ev) {
    const { value } = ev.target;
    this.searchString = value;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll($event: Event): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      if (this.canFetch) {
        this.getProductsAppend();
      }
    }
  }

  selectMin(minPrice: string) {
    this.minPriceReal = minPrice.trim().length === 0 ? '0' : (parseFloat(minPrice) / this.currencyRate).toFixed(2).toString();
    this.minPrice = minPrice.trim().length === 0 ? '0' : minPrice.trim();
    this.getProducts();
  }

  selectMax(maxPrice: string) {
    this.maxPriceReal = maxPrice.trim().length === 0 ? '0' : (parseFloat(maxPrice) / this.currencyRate).toFixed(2).toString();
    this.maxPrice = maxPrice.trim().length === 0 ? '0' : maxPrice.trim();
    this.getProducts();
  }

  selectMinH(minHashrate: string) {
    this.minHashrate = minHashrate.trim().length === 0 ? '0' : minHashrate.trim();
    this.getProducts();
  }

  selectMaxH(maxHashrate: string) {
    this.maxHashrate = maxHashrate.trim().length === 0 ? '0' : maxHashrate.trim();
    this.getProducts();
  }

  selectCategory(category: string) {
    if (this.selectedCategory === category) { this.selectedCategory = 'any'; }
    else { this.selectedCategory = category; }
    this.getProducts();
  }

  selectAlgorithm(algorithm: string) {
    if (this.selectedAlgorithm === algorithm) { this.selectedAlgorithm = 'any'; }
    else { this.selectedAlgorithm = algorithm; }
    this.getProducts();
  }

  selectSort(sort: string) {
    this.selectedSort = sort;
    this.getProducts();
  }

  clearPrice() {
    this.minPrice = '0';
    this.maxPrice = '0';
    this.getProducts();
  }

  clearHashrate() {
    this.minHashrate = '0';
    this.maxHashrate = '0';
    this.getProducts();
  }

  resetFilter() {
    if (this.minPrice === '0' && this.maxPrice === '0' && this.minHashrate === '0' && this.maxHashrate === '0') { return; }
    this.minPrice = '0';
    this.maxPrice = '0';
    this.minHashrate = '0';
    this.maxHashrate = '0';
    this.minPriceReal = '0';
    this.maxPriceReal = '0';
    this.getProducts();
  }

  getProducts() {
    this.selectedPage = 0;
    this.store.dispatch(new BrowseActions.FetchProducts({ page: this.selectedPage, sort: this.selectedSort, category: this.selectedCategory, algorithm: this.selectedAlgorithm, minPrice: this.minPriceReal, maxPrice: this.maxPriceReal, minHashrate: this.minHashrate, maxHashrate: this.maxHashrate, searchString: this.searchString }));
    this.getProductsCount();
    this.selectedPage++;
  }

  getProductsCount() {
    this.store.dispatch(new BrowseActions.FetchProductsCount({ category: this.selectedCategory, algorithm: this.selectedAlgorithm, minPrice: this.minPriceReal, maxPrice: this.maxPriceReal, minHashrate: this.minHashrate, maxHashrate: this.maxHashrate, searchString: this.searchString }));
  }

  getProductsAppend() {
    this.store.dispatch(new BrowseActions.FetchProductsAppend({ page: this.selectedPage, sort: this.selectedSort, category: this.selectedCategory, algorithm: this.selectedAlgorithm, minPrice: this.minPriceReal, maxPrice: this.maxPriceReal, minHashrate: this.minHashrate, maxHashrate: this.maxHashrate, searchString: this.searchString }));
    this.selectedPage++;
  }

  onUserClickSearch() {
    this.getProducts();
  }

  selectView(value) {
    this.selectedView = value;
  }

  userClickBuyIcon (id: number) {
    this.router.navigate([`/detail/${id}`]);
  }

  abbreviateNumber = (num: string) => abbreviateNumber(parseFloat(num));
}
