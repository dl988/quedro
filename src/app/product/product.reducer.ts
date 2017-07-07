import { Action, ActionReducer } from '@ngrx/store';
import { ProductActions } from './product.actions';

export const ProductReducer: ActionReducer<any> = (state: any = [], { payload, type }) => {
  switch (type) {
    case ProductActions.FETCH_PRODUCT:
      console.log('product')
      return state;

    case ProductActions.ADD_PRODUCT_FULFILLED:
      return [...state, payload.product];

    case ProductActions.FETCH_PRODUCTS_FULFILLED:
      return payload.products || [];

    default:
      return state;
  }
}