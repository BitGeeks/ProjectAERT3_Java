import { Action } from '@ngrx/store';

export const ADD_NEW_ADDRESS = 'ADD_NEW_ADDRESS';

export class AddNewAddress implements Action {
    readonly type = ADD_NEW_ADDRESS;

    constructor(public payload: { address: string, streetName: string, cityName: string, postalCode: string, countryCode: string, telephone: string, mobile: string }) {
    }
  }

export type AddressAction = AddNewAddress;
