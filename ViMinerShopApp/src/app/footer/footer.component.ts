import { Component, OnInit } from '@angular/core';
import * as fromApp from '../store/app.reducers';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { BrowseState } from '../store/browse/browse.reducer';
import { take } from 'rxjs/operators';
import * as BrowseActions from '../store/browse/browse.actions';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  browseState: Observable<BrowseState>;
  authState: Observable<{ authenticated: boolean, isActive: boolean }>;

  isCurrencyListAvailable = false;

  listOfCurrency: Array<string>;
  exchangeRate: any;
  currentCurrency = 'VND';

  canFetchSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>, ) {
  }

  ngOnInit() {
    this.authState = this.store.select('auth');
    this.browseState = this.store.select('browse');
    this.canFetchSubscription = this.browseState.subscribe(data => {
      this.isCurrencyListAvailable = !(Object.keys(data.exchangeRates).length === 0);
      this.listOfCurrency = Object.keys(data.exchangeRates);
      this.exchangeRate = data.exchangeRates;
      this.currentCurrency = data.currentCurrency;
    });

    this.browseState.pipe(take(1)).subscribe(data => {
      if (JSON.stringify(data.exchangeRates) === '{}') {
        this.getCurrencyList();
      }
    });
  }

  onUserChangeCurrency(ev) {
    const { value } = ev.target;
    this.store.dispatch(new BrowseActions.SetUserCurrentCurrency(value));
  }

  getCurrencyList() {
    this.store.dispatch(new BrowseActions.GetMMExchangeRate());
  }

  ngOnDestroy(): void {
    if (this.canFetchSubscription) {
      this.canFetchSubscription.unsubscribe();
    }
  }

}
