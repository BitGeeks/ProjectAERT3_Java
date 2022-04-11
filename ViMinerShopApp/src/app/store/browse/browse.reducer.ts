import * as BrowseActions from './browse.actions';
import { HttpError } from '../app.reducers';
import { ProductCategory, Colors, Algorithm, ProductDetail } from '../model';


export interface BrowseState {
  products: Array<ProductDetail>;
  productsCount: number;
  categories: Array<ProductCategory>;
  algorithms: Array<Algorithm>;
  canFetch: boolean;
  selectedPage: number;
  selectedSort: string;
  selectedCategory: string;
  selectedAlgorithm: string;
  minPrice: string;
  maxPrice: string;
  errors: Array<HttpError>;
  loading: boolean;
  exchangeRates: any;
  currentCurrency: string;
}

const initialState: BrowseState = {
  products: [],
  productsCount: 0,
  algorithms: [],
  categories: [],
  canFetch: true,
  selectedPage: 0,
  selectedSort: 'any',
  selectedCategory: 'any',
  selectedAlgorithm: 'any',
  minPrice: '0',
  maxPrice: '0',
  errors: [],
  loading: false,
  exchangeRates: {},
  currentCurrency: localStorage.getItem('currentCurrency') !== null ? localStorage.getItem('currentCurrency') : 'VND'
};

export function browseReducer(state = initialState, action: BrowseActions.BrowseActions) {
  switch (action.type) {
    case (BrowseActions.FETCH_PRODUCTS_APPEND):
    case (BrowseActions.FETCH_PRODUCTS):
      return {
        ...state,
        loading: true
      };

    case (BrowseActions.FETCH_PRODUCTS_SUCCESS):
      return {
        ...state,
        selectedPage: action.payload.selectedPage,
        selectedSort: action.payload.selectedSort,
        selectedCategory: action.payload.selectedCategory,
        selectedAlgorithm: action.payload.selectedAlgorithm,
        minPrice: action.payload.minPrice,
        maxPrice: action.payload.maxPrice,
        products: action.payload.res,
        canFetch: action.payload.res.length !== 0,
        errors: [...state.errors.filter(error => error.errorEffect !== action.payload.effect)],
        loading: false
      };

    case (BrowseActions.FETCH_PRODUCTS_APPEND_SUCCESS):
      return {
        ...state,
        selectedPage: action.payload.selectedPage,
        selectedSort: action.payload.selectedSort,
        selectedCategory: action.payload.selectedCategory,
        selectedAlgorithm: action.payload.selectedAlgorithm,
        minPrice: action.payload.minPrice,
        maxPrice: action.payload.maxPrice,
        products: [...state.products, ...action.payload.res],
        canFetch: action.payload.res.length !== 0,
        errors: [...state.errors.filter(error => error.errorEffect !== action.payload.effect)],
        loading: false
      };

    case (BrowseActions.FETCH_PRODUCTS_COUNT_SUCCESS):
      return {
        ...state,
        productsCount: action.payload.res,
        errors: [...state.errors.filter(error => error.errorEffect !== action.payload.effect)]
      };

    case (BrowseActions.FETCH_CATEGORY_SUCCESS):
      return {
        ...state,
        categories: action.payload.res,
        errors: [...state.errors.filter(error => error.errorEffect !== action.payload.effect)]
      };

    case (BrowseActions.FETCH_ALGORITHM_SUCCESS):
      return {
        ...state,
        algorithms: action.payload.res,
        errors: [...state.errors.filter(error => error.errorEffect !== action.payload.effect)]
      };

    case (BrowseActions.BROWSE_ERROR):
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

    case (BrowseActions.GET_MM_EXCHANGE_RATE_SUCCESS):
      return {
        ...state,
        exchangeRates: action.payload
      };

    case (BrowseActions.SET_CURRENT_CURRENCY):
      localStorage.setItem('currentCurrency', action.payload);
      return {
        ...state,
        currentCurrency: action.payload
      };

    default:
      return state;
  }
}
