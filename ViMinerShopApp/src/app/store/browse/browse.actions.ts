import { Action } from '@ngrx/store';
import { HttpError } from '../app.reducers';
import { ProductCategory, Algorithm, ProductDetail } from '../model';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_APPEND = 'FETCH_PRODUCTS_APPEND';
export const FETCH_PRODUCTS_APPEND_SUCCESS = 'FETCH_PRODUCTS_APPEND_SUCCESS';
export const FETCH_PRODUCTS_COUNT = 'FETCH_PRODUCTS_COUNT';
export const FETCH_PRODUCTS_COUNT_SUCCESS = 'FETCH_PRODUCTS_COUNT_SUCCESS';
export const FETCH_CATEGORY = 'FETCH_CATEGORY';
export const FETCH_CATEGORY_SUCCESS = 'FETCH_CATEGORY_SUCCESS';
export const FETCH_ALGORITHM = 'FETCH_ALGORITHM';
export const FETCH_ALGORITHM_SUCCESS = 'FETCH_ALGORITHM_SUCCESS';
export const BROWSE_ERROR = 'BROWSE_ERROR';
export const GET_MM_EXCHANGE_RATE = 'GET_MM_EXCHANGE_RATE';
export const GET_MM_EXCHANGE_RATE_SUCCESS = 'GET_MM_EXCHANGE_RATE_SUCCESS';
export const SET_CURRENT_CURRENCY = 'SET_CURRENT_CURRENCY';


export class FetchProducts implements Action {
  readonly type = FETCH_PRODUCTS;

  constructor(public payload: { page: number, sort: string, category: string, algorithm: string, minPrice: string, maxPrice: string, minHashrate: string, maxHashrate: string, searchString: string }) {
  }
}

export class FetchProductsSuccess implements Action {
  readonly type = FETCH_PRODUCTS_SUCCESS;

  constructor(public payload: { res: Array<ProductDetail>, effect: string, selectedPage: number, selectedSort: string, selectedCategory: string, selectedAlgorithm: string, minPrice: string, maxPrice: string, minHashrate: string, maxHashrate: string, searchString: string }) {
  }
}

export class FetchProductsAppend implements Action {
  readonly type = FETCH_PRODUCTS_APPEND;

  constructor(public payload: { page: number, sort: string, category: string, algorithm: string, minPrice: string, maxPrice: string, minHashrate: string, maxHashrate: string, searchString: string }) {
  }
}

export class FetchProductAppendSuccess implements Action {
  readonly type = FETCH_PRODUCTS_APPEND_SUCCESS;

  constructor(public payload: { res: Array<ProductDetail>, effect: string, selectedPage: number, selectedSort: string, selectedCategory: string, selectedAlgorithm: string, minPrice: string, maxPrice: string, minHashrate: string, maxHashrate: string, searchString: string }) {
  }
}

export class FetchProductsCount implements Action {
  readonly type = FETCH_PRODUCTS_COUNT;

  constructor(public payload: { category: string, algorithm: string, minPrice: string, maxPrice: string, minHashrate: string, maxHashrate: string, searchString: string }) {
  }
}

export class FetchProductsCountSuccess implements Action {
  readonly type = FETCH_PRODUCTS_COUNT_SUCCESS;

  constructor(public payload: { res: number, effect: string }) {
  }
}

export class FetchCategory implements Action {
  readonly type = FETCH_CATEGORY;
}

export class FetchCategorySuccess implements Action {
  readonly type = FETCH_CATEGORY_SUCCESS;

  constructor(public payload: { res: Array<ProductCategory>, effect: string }) {
  }
}


export class FetchAlgorithm implements Action {
  readonly type = FETCH_ALGORITHM;
}

export class FetchAlgorithmSuccess implements Action {
  readonly type = FETCH_ALGORITHM_SUCCESS;

  constructor(public payload: { res: Array<Algorithm>, effect: string }) {
  }
}


export class BrowseError implements Action {
  readonly type = BROWSE_ERROR;

  constructor(public payload: HttpError) {
  }
}


export class GetMMExchangeRate implements Action {
  readonly type = GET_MM_EXCHANGE_RATE;

  constructor() {
  }
}


export class GetMMExchangeRateSuccess implements Action {
  readonly type = GET_MM_EXCHANGE_RATE_SUCCESS;

  constructor(public payload: string) {
  }
}


export class SetUserCurrentCurrency implements Action {
  readonly type = SET_CURRENT_CURRENCY;

  constructor(public payload: string) {
  }
}


export type BrowseActions = FetchProducts | FetchProductsSuccess |
  FetchProductsAppend | FetchProductAppendSuccess |
  FetchProductsCount | FetchProductsCountSuccess |
  FetchCategory | FetchCategorySuccess |
  FetchAlgorithm | FetchAlgorithmSuccess | BrowseError |
  GetMMExchangeRate | GetMMExchangeRateSuccess | SetUserCurrentCurrency;
