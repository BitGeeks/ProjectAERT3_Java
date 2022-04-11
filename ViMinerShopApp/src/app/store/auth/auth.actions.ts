import { Action } from '@ngrx/store';
import { HttpError } from '../app.reducers';

export const SIGN_UP = 'SIGN_UP';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_OUT = 'SIGN_OUT';
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS';
export const CHECK_IF_LOGGED_IN = 'CHECK_IF_LOGGED_IN';
export const FETCH_VERIFICATION_STATUS = 'FETCH_VERIFICATION_STATUS';
export const FETCH_VERIFICATION_STATUS_SUCCESS = 'FETCH_VERIFICATION_STATUS_SUCCESS';
export const AUTH_ERROR = 'AUTH_ERROR';
export const VERIFICATION_STATUS_SUCCESS = 'VERIFICATION_STATUS_SUCCESS';
export const CHECK_ADMIN_ROLE_SUCCESS = 'CHECK_ADMIN_ROLE_SUCCESS';
export const REQUEST_ADMIN_ROLE = 'REQUEST_ADMIN_ROLE';
export const SOCIAL_SIGN_IN = 'SOCIAL_SIGN_IN';
export const SOCIAL_SIGN_IN_SUCCESS = 'SOCIAL_SIGN_IN_SUCCESS';


export class SignUp implements Action {
  readonly type = SIGN_UP;

  constructor(public payload: { fname: string, lname: string, username: string, email: string, password: string, passwordRepeat: string, refCode: string }) {
  }
}

export class SignUpSuccess implements Action {
  readonly type = SIGN_UP_SUCCESS;

  constructor(public payload: { effect: string }) {
  }
}

export class SignIn implements Action {
  readonly type = SIGN_IN;

  constructor(public payload: { email: string, password: string }) {
  }
}

export class SignInSuccess implements Action {
  readonly type = SIGN_IN_SUCCESS;
  constructor(public payload: { effect: string, isAdmin: boolean }) {
  }
}

export class SocialSignIn implements Action {
  readonly type = SOCIAL_SIGN_IN;

  constructor(public payload: { email: string, id: string, firstName: string, lastName: string }) {
  }
}

export class SocialSignInSuccess implements Action {
  readonly type = SOCIAL_SIGN_IN_SUCCESS;
  constructor(public payload: { effect: string, isAdmin: boolean }) {
  }
}

export class SignOut implements Action {
  readonly type = SIGN_OUT;
}

export class SignOutSuccess implements Action {
  readonly type = SIGN_OUT_SUCCESS;
}

export class CheckIfLoggedIn implements Action {
  readonly type = CHECK_IF_LOGGED_IN;
}

export class AuthError implements Action {
  readonly type = AUTH_ERROR;

  constructor(public payload: HttpError) {
  }
}

export class VerificationStatusSuccess implements Action {
  readonly type = VERIFICATION_STATUS_SUCCESS;

  constructor(public payload: boolean) {
  }
}

export class CheckAdminRole implements Action {
  readonly type = CHECK_ADMIN_ROLE_SUCCESS;

  constructor(public payload: boolean) {
  }
}

export class RequestAdminRole implements Action {
  readonly type = REQUEST_ADMIN_ROLE;
}


export type AuthActions = SignUp | SignUpSuccess | SignIn | SignInSuccess
  | SignOut | SignOutSuccess | CheckIfLoggedIn
  | AuthError | VerificationStatusSuccess | CheckAdminRole | RequestAdminRole
  | SocialSignIn | SocialSignInSuccess;
