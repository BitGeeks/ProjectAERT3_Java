import { ProductDetail } from './../../store/model';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Observable, Subscription, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, take } from 'rxjs/operators';
import { BrowseState } from 'src/app/store/browse/browse.reducer';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-related',
  templateUrl: './related.component.html',
  styleUrls: ['./related.component.scss']
})
export class RelatedComponent implements OnInit, OnDestroy {

  @ViewChild('relatedCards') relatedCards: ElementRef;

  paramSubscription: Subscription;

  relatedProducts: Array<ProductDetail>;
  fetchError: HttpErrorResponse = null;
  productUrl: string;

  browseState: Observable<BrowseState>;
  browserSubscription: Subscription;
  currency = 'USD';
  currencyRate = 1;

  innerLoading = true;

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.browseState = this.store.select('browse');
    this.paramSubscription = this.route.params.subscribe(
      (params: Params) => {

        this.innerLoading = true;
        this.productUrl = params.productUrl;
        this.productService.getRelatedProducts(this.productUrl)
          .pipe(take(1), catchError(
            error => {
              this.fetchError = error;
              this.innerLoading = false;
              return throwError(error);
            }
          ))
          .subscribe(
            (data: Array<ProductDetail>) => {
              this.relatedProducts = data;
              this.innerLoading = false;
            });
      }
    );
    this.browserSubscription = this.browseState.subscribe(data => {
      this.currency = data.currentCurrency;
      if (JSON.stringify(data.exchangeRates) !== '{}') {
        this.currencyRate = data.exchangeRates[data.currentCurrency];
      }
    });
  }

  ngOnDestroy() {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
    if (this.browserSubscription) {
      this.browserSubscription.unsubscribe();
    }
  }

  scrollLeft() {
    this.relatedCards.nativeElement.scrollLeft -= 250;
  }

  scrollRight() {
    this.relatedCards.nativeElement.scrollLeft += 250;
  }

  changeRoute(id: number) {
    this.router.navigate([`/detail/${id}`]);
  }
}
