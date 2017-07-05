import { Action, ActionReducer } from '@ngrx/store';
import { ProductActions } from './product.actions';

export const ProductReducer: ActionReducer<any> = (state: any = [], { payload, type }) => {
  switch (type) {
    case ProductActions.FETCH_PRODUCTS_FULFILLED:
      return payload.products || [];

    default:
      return state;
  }
}