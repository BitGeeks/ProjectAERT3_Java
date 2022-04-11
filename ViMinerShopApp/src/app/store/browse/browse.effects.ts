import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as BrowseActions from './browse.actions';
import { ProductService } from '../../services/product.service';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';


@Injectable()
export class BrowseEffects {

  @Effect()
  fetchProducts = this.actions$
    .pipe(ofType(BrowseActions.FETCH_PRODUCTS),
      map((action: BrowseActions.FetchProducts) => {
        return action.payload;
      }),
      switchMap((params: { page: number, sort: string, category: string, algorithm: string, minPrice: string, maxPrice: string, minHashrate: string, maxHashrate: string, searchString: string }) => {
        return this.productService.getProducts(params.page, params.sort, params.category, params.algorithm, params.minPrice, params.maxPrice, params.minHashrate, params.maxHashrate, encodeURIComponent(params.searchString))
          .pipe(map(res => {
            return {
              type: BrowseActions.FETCH_PRODUCTS_SUCCESS,
              payload: {
                res,
                effect: BrowseActions.FETCH_PRODUCTS,
                selectedPage: params.page + 1,
                selectedSort: params.sort,
                selectedCategory: params.category,
                selectedAlgorithm: params.algorithm,
                minPrice: params.minPrice,
                maxPrice: params.maxPrice
              }
            };
          }), catchError(error => of(new BrowseActions.BrowseError({ error, errorEffect: BrowseActions.FETCH_PRODUCTS }))));
      })
    );

  @Effect()
  fetchProductsAppend = this.actions$
    .pipe(ofType(BrowseActions.FETCH_PRODUCTS_APPEND),
      map((action: BrowseActions.FetchProductsAppend) => {
        return action.payload;
      }),
      mergeMap((params: { page: number, sort: string, category: string, algorithm: string, minPrice: string, maxPrice: string, minHashrate: string, maxHashrate: string, searchString: string }) => {
        return this.productService.getProducts(params.page, params.sort, params.category, params.algorithm, params.minPrice, params.maxPrice, params.minHashrate, params.maxHashrate, encodeURIComponent(params.searchString))
          .pipe(map(res => {
            return {
              type: BrowseActions.FETCH_PRODUCTS_APPEND_SUCCESS,
              payload: {
                res,
                effect: BrowseActions.FETCH_PRODUCTS_APPEND,
                selectedPage: params.page + 1,
                selectedSort: params.sort,
                selectedCategory: params.category,
                selectedAlgorithm: params.algorithm,
                minPrice: params.minPrice,
                maxPrice: params.maxPrice
              }
            };
          }), catchError(error => of(new BrowseActions.BrowseError({ error, errorEffect: BrowseActions.FETCH_PRODUCTS_APPEND }))));
      })
    );

  @Effect()
  fetchProductsCount = this.actions$
    .pipe(ofType(BrowseActions.FETCH_PRODUCTS_COUNT),
      map((action: BrowseActions.FetchProductsCount) => {
        return action.payload;
      }),
      switchMap((params: { category: string, algorithm: string, minPrice: string, maxPrice: string, minHashrate: string, maxHashrate: string, searchString: string }) => {
        return this.productService.getProductsCount(params.category, params.algorithm, params.minPrice, params.maxPrice, params.minHashrate, params.maxHashrate, encodeURIComponent(params.searchString))
          .pipe(map(res => {
            return {
              type: BrowseActions.FETCH_PRODUCTS_COUNT_SUCCESS,
              payload: {
                res,
                effect: BrowseActions.FETCH_PRODUCTS_COUNT
              }
            };
          }), catchError(error => of(new BrowseActions.BrowseError({ error, errorEffect: BrowseActions.FETCH_PRODUCTS_COUNT }))));
      })
    );

  @Effect()
  fetchCategory = this.actions$
    .pipe(ofType(BrowseActions.FETCH_CATEGORY),
      switchMap((action: BrowseActions.FetchCategory) => {
        return this.productService.getCategory()
          .pipe(map(res => {
            return { type: BrowseActions.FETCH_CATEGORY_SUCCESS, payload: { res, effect: BrowseActions.FETCH_CATEGORY } };
          }), catchError(error => of(new BrowseActions.BrowseError({ error, errorEffect: BrowseActions.FETCH_CATEGORY }))));
      })
    );

  @Effect()
  fetchAlgorithm = this.actions$
    .pipe(ofType(BrowseActions.FETCH_ALGORITHM),
      switchMap((action: BrowseActions.FetchAlgorithm) => {
        return this.productService.getAlgorithm()
          .pipe(map(res => {
            return { type: BrowseActions.FETCH_ALGORITHM_SUCCESS, payload: { res, effect: BrowseActions.FETCH_ALGORITHM } };
          }), catchError(error => of(new BrowseActions.BrowseError({ error, errorEffect: BrowseActions.FETCH_ALGORITHM }))));
      })
    );

  @Effect()
  getMMExchangeRate = this.actions$
      .pipe(ofType(BrowseActions.GET_MM_EXCHANGE_RATE),
        switchMap((action: BrowseActions.GetMMExchangeRate) => {
          return this.productService.getExchangeRate()
            .pipe(map(res => {
              return {
                type: BrowseActions.GET_MM_EXCHANGE_RATE_SUCCESS, payload: res.exchangeRates
              };
            }), catchError(error => of(new BrowseActions.BrowseError({
              error, errorEffect: BrowseActions.GET_MM_EXCHANGE_RATE
            }))));
        })
      );

  constructor(private actions$: Actions, private productService: ProductService) {
  }
}
