import { Action } from '@ngrx/store';
import { HttpError } from '../app.reducers';
import { ProductDetail } from '../model';

export const FETCH_NEW_MINER = 'FETCH_NEW_MINER';
export const FETCH_NEW_MINER_SUCCESS = 'FETCH_NEW_MINER_SUCCESS';
export const FETCH_BEST_MINER = 'FETCH_BEST_MINER';
export const FETCH_BEST_MINER_SUCCESS = 'FETCH_BEST_MINER_SUCCESS';
export const FETCH_INTERESTED = 'FETCH_INTERESTED';
export const FETCH_INTERESTED_SUCCESS = 'FETCH_INTERESTED_SUCCESS';
export const EMPTY_INTERESTED = 'EMPTY_INTERESTED';
export const SHOWCASE_ERROR = 'SHOWCASE_ERROR';


export class FetchNewMiner implements Action {
  readonly type = FETCH_NEW_MINER;
}

export class FetchNewMinerSuccess implements Action {
  readonly type = FETCH_NEW_MINER_SUCCESS;

  constructor(public payload: { res: Array<ProductDetail>, effect: string }) {
  }
}


export class FetchBestMiner implements Action {
  readonly type = FETCH_BEST_MINER;
}

export class FetchBestMinerSuccess implements Action {
  readonly type = FETCH_BEST_MINER_SUCCESS;

  constructor(public payload: { res: Array<ProductDetail>, effect: string }) {
  }
}

export class FetchInterested implements Action {
  readonly type = FETCH_INTERESTED;
}

export class FetchInterestedSuccess implements Action {
  readonly type = FETCH_INTERESTED_SUCCESS;

  constructor(public payload: { res: Array<ProductDetail>, effect: string }) {
  }
}

export class EmptyInterested implements Action {
  readonly type = EMPTY_INTERESTED;
}

export class ShowcaseError implements Action {
  readonly type = SHOWCASE_ERROR;

  constructor(public payload: HttpError) {
  }
}


export type ShowcaseActions = FetchNewMiner | FetchNewMinerSuccess | FetchBestMiner | FetchBestMinerSuccess
  | FetchInterested | FetchInterestedSuccess | EmptyInterested | ShowcaseError;
