import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/store/model';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../../store/auth/auth.actions';


@Component({
  selector: 'app-subcriptions',
  templateUrl: './subcriptions.component.html',
  styleUrls: ['./subcriptions.component.scss']
})
export class SubcriptionsComponent implements OnInit {
  mailSubscriptionOn = false;
  userData: User;

  constructor(
    private accountService: AccountService,
    private store: Store<fromApp.AppState>,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.getUserInfo();
  }

  onUserClickSubcripionMail() {
    this.accountService.toggleSubscription().pipe(take(1), catchError(error => {
      this.store.dispatch(new AuthActions.SignOut());
      this.router.navigate(['/']);
      return throwError(error);
    }
    )).subscribe(data => {
      this.userData = data;
      this.mailSubscriptionOn = data.isSubscribedToMailing;
    });
  }

  getUserInfo() {
    this.accountService.getUser().pipe(take(1), catchError(error => {
      this.store.dispatch(new AuthActions.SignOut());
      this.router.navigate(['/']);
      return throwError(error);
    }
    )).subscribe(data => {
      this.userData = data;
      this.mailSubscriptionOn = data.isSubscribedToMailing;
    });
  }

}
