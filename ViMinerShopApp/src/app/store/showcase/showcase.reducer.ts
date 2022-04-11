import * as ShowcaseActions from './showcase.actions';
import { HttpError } from '../app.reducers';
import { ProductDetail } from '../model';


export interface ShowcaseState {
  newMiner: Array<ProductDetail>;
  bestMiner: Array<ProductDetail>;
  interested: Array<ProductDetail>;
  errors: Array<HttpError>;
  loading: Array<string>;
}

const initialState: ShowcaseState = {
  newMiner: [],
  bestMiner: [],
  interested: [],
  errors: [],
  loading: []
};

export function showcaseReducer(state = initialState, action: ShowcaseActions.ShowcaseActions) {
  switch (action.type) {
    case (ShowcaseActions.FETCH_NEW_MINER):
      const newMinerLoad = [...state.loading];
      newMinerLoad.push(ShowcaseActions.FETCH_NEW_MINER);
      return {
        ...state,
        loading: newMinerLoad
      };

    case (ShowcaseActions.FETCH_BEST_MINER):
      const bestMinerLoad = [...state.loading];
      bestMinerLoad.push(ShowcaseActions.FETCH_BEST_MINER);
      return {
        ...state,
        loading: bestMinerLoad
      };

    case (ShowcaseActions.FETCH_INTERESTED):
      const interestedLoad = [...state.loading];
      interestedLoad.push(ShowcaseActions.FETCH_INTERESTED);
      return {
        ...state,
        loading: interestedLoad
      };

    case (ShowcaseActions.FETCH_NEW_MINER_SUCCESS):
      return {
        ...state,
        newMiner: action.payload.res,
        errors: [...state.errors.filter(error => error.errorEffect !== action.payload.effect)],
        loading: [...state.loading.filter(loaded => loaded !== action.payload.effect)]
      };

    case (ShowcaseActions.FETCH_BEST_MINER_SUCCESS):
      return {
        ...state,
        bestMiner: action.payload.res,
        errors: [...state.errors.filter(error => error.errorEffect !== action.payload.effect)],
        loading: [...state.loading.filter(loaded => loaded !== action.payload.effect)]
      };

    case (ShowcaseActions.FETCH_INTERESTED_SUCCESS):
      return {
        ...state,
        interested: action.payload.res,
        errors: [...state.errors.filter(error => error.errorEffect !== action.payload.effect)],
        loading: [...state.loading.filter(loaded => loaded !== action.payload.effect)]
      };

    case (ShowcaseActions.SHOWCASE_ERROR):
      const errors = [...state.errors];
      const index = errors.findIndex(error => error.errorEffect === action.payload.errorEffect);
      if (index !== -1) {
        errors[index] = action.payload;
      } else {
        errors.push(action.payload);
      }
      return {
        ...state,
        loading: [...state.loading.filter(loaded => loaded !== action.payload.errorEffect)],
        errors
      };

    case (ShowcaseActions.EMPTY_INTERESTED):
      return {
        ...state,
        interested: []
      };

    default:
      return state;
  }
}
