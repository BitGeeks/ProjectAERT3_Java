import { ShowcaseState } from '../../store/showcase/showcase.reducer';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import * as fromApp from '../../store/app.reducers';
import { Store } from '@ngrx/store';
import * as ShowcaseActions from '../../store/showcase/showcase.actions';
import { take } from 'rxjs/operators';
import { BrowseState } from 'src/app/store/browse/browse.reducer';

@Component({
  selector: 'app-new-miner',
  templateUrl: './new-miner.component.html',
  styleUrls: ['./new-miner.component.scss']
})
export class NewMinerComponent implements OnInit {

  showcaseState: Observable<ShowcaseState>;
  bigBoxShowCartIcon = false;

  browseState: Observable<BrowseState>;
  browserSubscription: Subscription;
  currency = 'USD';
  currencyRate = 1;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.browseState = this.store.select('browse');
    this.showcaseState = this.store.select('showcase');
    this.showcaseState
      .pipe(take(1))
      .subscribe(
        data => {
          if (data.newMiner.length === 0) {
            this.store.dispatch(new ShowcaseActions.FetchNewMiner());
          }
        }
      );
    this.browserSubscription = this.browseState.subscribe(data => {
      this.currency = data.currentCurrency;
      if (JSON.stringify(data.exchangeRates) !== '{}') {
        this.currencyRate = data.exchangeRates[data.currentCurrency];
      }
    });
  }

  onUserMoveOverProductBox() { }

  ngOnDestroy(): void {
    if (this.browserSubscription) {
      this.browserSubscription.unsubscribe();
    }
  }

}
