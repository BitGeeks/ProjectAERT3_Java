import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as ShowcaseActions from './showcase.actions';
import { ProductService } from '../../services/product.service';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable()
export class ShowcaseEffects {


  @Effect()
  fetchNewMiner = this.actions$
    .pipe(ofType(ShowcaseActions.FETCH_NEW_MINER),
      switchMap((action: ShowcaseActions.FetchNewMiner) => this.productService.getNewMiner()
        .pipe(map(res => ({ type: ShowcaseActions.FETCH_NEW_MINER_SUCCESS, payload: { res, effect: ShowcaseActions.FETCH_NEW_MINER } })),
          catchError(error => of(new ShowcaseActions.ShowcaseError({ error, errorEffect: ShowcaseActions.FETCH_NEW_MINER }))))
      ));

  @Effect()
  fetchBestMiner = this.actions$
    .pipe(ofType(ShowcaseActions.FETCH_BEST_MINER),
      switchMap((action: ShowcaseActions.FetchBestMiner) => this.productService.getBestMiner()
        .pipe(map(res => ({ type: ShowcaseActions.FETCH_BEST_MINER_SUCCESS, payload: { res, effect: ShowcaseActions.FETCH_BEST_MINER } })),
          catchError(error => of(new ShowcaseActions.ShowcaseError({ error, errorEffect: ShowcaseActions.FETCH_BEST_MINER }))))
      ));

  @Effect()
  fetchInterested = this.actions$
    .pipe(ofType(ShowcaseActions.FETCH_INTERESTED),
      switchMap((action: ShowcaseActions.FetchInterested) => this.productService.getInterested()
        .pipe(map(res => ({ type: ShowcaseActions.FETCH_INTERESTED_SUCCESS, payload: { res, effect: ShowcaseActions.FETCH_INTERESTED } }),
          catchError(error => of(new ShowcaseActions.ShowcaseError({ error, errorEffect: ShowcaseActions.FETCH_INTERESTED })))))
      ));


  constructor(private actions$: Actions, private productService: ProductService) {
  }
}
