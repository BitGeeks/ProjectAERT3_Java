import * as AddressAction from './address.actions';
import { HttpError } from '../app.reducers';

export interface AddressState {
    userAddress: string;
    errors: Array<HttpError>;
    loading: boolean;
}

const initialState: AddressState = {
    userAddress: null,
    errors: [],
    loading: false
};

export function addressReducer(state = initialState, action: AddressAction.AddressAction) {
    switch (action.type) {
      case (AddressAction.ADD_NEW_ADDRESS):
        return {
          ...state,
          loading: true
        };
    }
}
