import { ProductDetail } from './../store/model';
import { Component, HostListener, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription, throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { TranslatePipe } from '@ngx-translate/core';
import { BrowseState } from '../store/browse/browse.reducer';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  querySubscribe: Subscription;
  page = 0;
  keyword: string;
  canFetch = false;

  browseState: Observable<BrowseState>;
  browserSubscription: Subscription;
  currency = 'USD';
  currencyRate = 1;

  products: Array<ProductDetail> = [];

  constructor(
    private store: Store<fromApp.AppState>,
    private productService: ProductService,
    private route: ActivatedRoute,
    private titleMeta: Title,
    private translatePipe: TranslatePipe
  ) {
  }

  ngOnInit() {
    this.browseState = this.store.select('browse');
    this.querySubscribe = this.route.params.subscribe((params: Params) => {
      this.canFetch = false;
      this.keyword = params.keyword;
      this.page = 0;
      this.productService.searchProduct(this.page, this.keyword)
        .pipe(take(1), catchError(
          error => {
            this.canFetch = false;
            return throwError(error);
          }
        ))
        .subscribe(data => {
          this.titleMeta.setTitle(`${this.translatePipe.transform('Kết quả tìm kiếm cho từ khóa ')} ${params.keyword}`);
          this.products = data;
          this.page++;
          this.canFetch = true;
          if (data.length !== 0) {
            this.canFetch = true;
          }
        });
    });
    this.browserSubscription = this.browseState.subscribe(data => {
      this.currency = data.currentCurrency;
      if (JSON.stringify(data.exchangeRates) !== '{}') {
        this.currencyRate = data.exchangeRates[data.currentCurrency];
      }
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll($event: Event): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && this.canFetch) {
      this.canFetch = false;
      if (this.canFetch) {
        this.productService.searchProduct(this.page, this.keyword)
          .pipe(take(1), catchError(
            error => {
              this.canFetch = false;
              return throwError(error);
            }
          ))
          .subscribe(data => {
            this.products.push(...data);
            this.page++;
            this.canFetch = true;
            if (data.length === 0) {
              this.canFetch = false;
            }
          });
      }
    }
  }

  ngOnDestroy(): void {
    if (this.browserSubscription) {
      this.browserSubscription.unsubscribe();
    }
  }
}
