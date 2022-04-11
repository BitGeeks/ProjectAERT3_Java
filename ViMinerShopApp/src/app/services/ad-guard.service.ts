import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../store/auth/auth.reducer';
import * as AuthActions from '../store/auth/auth.actions';

@Injectable()
export class AdGuardService implements CanActivate {
    constructor(private store: Store<fromApp.AppState>, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      // this.store.dispatch(new AuthActions.RequestAdminRole());
      return this.store.select('auth')
        .pipe(take(1), map((authState: fromAuth.AuthState) => {
          if (!authState.authenticated) {
            this.router.navigate(['/login']);
          } else if (!authState.isAdmin) {
            this.router.navigate(['/']);
          }
          return authState.authenticated;
        }));
    }
}
