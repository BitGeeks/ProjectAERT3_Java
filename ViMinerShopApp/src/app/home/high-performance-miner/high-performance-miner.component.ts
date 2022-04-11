import { ShowcaseState } from '../../store/showcase/showcase.reducer';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as fromApp from '../../store/app.reducers';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as ShowcaseActions from '../../store/showcase/showcase.actions';
import { take } from 'rxjs/operators';
import { BrowseState } from 'src/app/store/browse/browse.reducer';

@Component({
  selector: 'app-high-performance-miner',
  templateUrl: './high-performance-miner.component.html',
  styleUrls: ['./high-performance-miner.component.scss']
})
export class HighPerformanceMinerComponent implements OnInit {

  @ViewChild('mostCards') mostCards: ElementRef;

  showcaseState: Observable<ShowcaseState>;

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
          if (data.bestMiner.length === 0) {
            this.store.dispatch(new ShowcaseActions.FetchBestMiner());
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

  scrollLeft() {
    this.mostCards.nativeElement.scrollLeft -= 250;
  }

  scrollRight() {
    this.mostCards.nativeElement.scrollLeft += 250;
  }

  ngOnDestroy(): void {
    if (this.browserSubscription) {
      this.browserSubscription.unsubscribe();
    }
  }
}
