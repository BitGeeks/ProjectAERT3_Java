import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import * as AuthActions from './auth.actions';
import * as CartActions from '../cart/cart.actions';
import * as OrderActions from '../order/order.actions';
import * as ShowcaseActions from '../showcase/showcase.actions';
import { TokenService } from '../../services/token.service';
import { AccountService } from '../../services/account.service';
import { of } from 'rxjs';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import { UserAuthenticate } from '../model';


@Injectable()
export class AuthEffects {
  @Effect()
  signUp = this.actions$
    .pipe(ofType(AuthActions.SIGN_UP),
      map((action: AuthActions.SignUp) => {
        return action.payload;
      }),
      switchMap((credentials: { fname: string, lname: string, username: string, email: string, password: string, passwordRepeat: string, refCode: string }) => {
        return this.accountService.createAccount(credentials.fname, credentials.lname, credentials.email, credentials.password, credentials.username, credentials.refCode)
          .pipe(switchMap(() => {
            return [
              {
                type: AuthActions.SIGN_UP_SUCCESS, payload: { effect: AuthActions.SIGN_UP }
              }
              ,
              {
                type: AuthActions.SIGN_IN,
                payload: { email: credentials.email, password: credentials.password }
              }
            ];
          }), catchError(error => of(new AuthActions.AuthError({ error, errorEffect: AuthActions.SIGN_UP }))));
      })
    );

  @Effect()
  signIn = this.actions$
    .pipe(ofType(AuthActions.SIGN_IN),
      map((action: AuthActions.SignIn) => {
        return action.payload;
      }),
      switchMap((credentials: { email: string, password: string, password2: string }) => {
        return this.accountService.loginAccount(credentials.email, credentials.password)
          .pipe(switchMap((res: UserAuthenticate) => {
            this.tokenService.saveToken(res.token);
            this.router.navigate(['/']);
            if (res.isActive) { localStorage.setItem('verificationStatus', 'true'); }
            else if (localStorage.getItem('verificationStatus')) { localStorage.removeItem('verificationStatus'); }
            localStorage.setItem('adminRole', res.roleVar_id.toString());
            return [
              {
                type: AuthActions.VERIFICATION_STATUS_SUCCESS, payload: res.isActive
              },
              {
                type: AuthActions.CHECK_ADMIN_ROLE_SUCCESS, payload: res.roleVar_id === 2
              },
              { type: AuthActions.SIGN_IN_SUCCESS, payload: { effect: AuthActions.SIGN_IN, isAdmin: res.roleVar_id === 2 } }
            ];
          }), catchError(error => of(new AuthActions.AuthError({ error, errorEffect: AuthActions.SIGN_IN }))));
      }));

  @Effect()
  socialSignIn = this.actions$
    .pipe(ofType(AuthActions.SOCIAL_SIGN_IN),
      map((action: AuthActions.SocialSignIn) => {
        return action.payload;
      }),
      switchMap((credentials: { email: string, id: string, firstName: string, lastName: string }) => {
        return this.accountService.loginSocialAccount(credentials.email, credentials.id, credentials.firstName, credentials.lastName)
          .pipe(switchMap((res: UserAuthenticate) => {
            this.tokenService.saveToken(res.token);
            this.router.navigate(['/']);
            if (res.isActive) { localStorage.setItem('verificationStatus', 'true'); }
            else if (localStorage.getItem('verificationStatus')) { localStorage.removeItem('verificationStatus'); }
            localStorage.setItem('adminRole', res.roleVar_id.toString());
            return [
              {
                type: AuthActions.VERIFICATION_STATUS_SUCCESS, payload: res.isActive
              },
              {
                type: AuthActions.CHECK_ADMIN_ROLE_SUCCESS, payload: res.roleVar_id === 2
              },
              { type: AuthActions.SOCIAL_SIGN_IN_SUCCESS, payload: { effect: AuthActions.SOCIAL_SIGN_IN, isAdmin: res.roleVar_id === 2 } }
            ];
          }), catchError(error => of(new AuthActions.AuthError({ error, errorEffect: AuthActions.SOCIAL_SIGN_IN }))));
      }));

  @Effect()
  signOut = this.actions$
    .pipe(ofType(AuthActions.SIGN_OUT),
      concatMap((action: AuthActions.SignOut) => {
        this.tokenService.removeToken();
        localStorage.removeItem('verificationStatus');
        localStorage.removeItem('adminRole');
        return [
          {
            type: AuthActions.SIGN_OUT_SUCCESS
          },
          {
            type: CartActions.EMPTY_CART_SUCCESS // clearing memory
          },
          {
            type: OrderActions.EMPTY_ORDER // clearing memory
          },
          {
            type: ShowcaseActions.EMPTY_INTERESTED // clearing memory
          }
        ];
      }));

  @Effect()
  checkIfLoggedIn = this.actions$
    .pipe(ofType(AuthActions.CHECK_IF_LOGGED_IN),
      switchMap((action: AuthActions.CheckIfLoggedIn) => {
        if (this.tokenService.checkIfTokenExists()) {
          return [
            {
              type: AuthActions.VERIFICATION_STATUS_SUCCESS, payload: localStorage.getItem('verificationStatus') !== null
            },
            {
              type: AuthActions.CHECK_ADMIN_ROLE_SUCCESS, payload: localStorage.getItem('adminRole') === '2'
            },
            {
              type: AuthActions.SIGN_IN_SUCCESS, payload: { effect: AuthActions.SIGN_IN_SUCCESS, isAdmin: localStorage.getItem('adminRole') === '2' }
            }
          ];
        }
        return [{
          type: AuthActions.SIGN_OUT_SUCCESS, payload: { effect: AuthActions.SIGN_OUT }
        }];
      }));

  @Effect()
  requestAdminRole = this.actions$
    .pipe(ofType(AuthActions.REQUEST_ADMIN_ROLE),
      switchMap((action: AuthActions.RequestAdminRole) => {
        return this.accountService.getUser()
        .pipe(switchMap(data => {
          localStorage.setItem('adminRole', data["roleVar_Id"]);
          return [
            {
              type: AuthActions.VERIFICATION_STATUS_SUCCESS, payload: localStorage.getItem('verificationStatus') !== null
            },
            {
              type: AuthActions.CHECK_ADMIN_ROLE_SUCCESS, payload: localStorage.getItem('adminRole') === '2'
            },
            { type: AuthActions.SIGN_IN_SUCCESS, payload: { effect: AuthActions.SIGN_IN_SUCCESS, isAdmin: localStorage.getItem('adminRole') === '2' } }
          ];
        }));
      }), catchError(error => of(new AuthActions.AuthError({ error, errorEffect: AuthActions.SIGN_OUT }))));

  constructor(private actions$: Actions, private tokenService: TokenService,
              private router: Router, private accountService: AccountService) {
  }
}
