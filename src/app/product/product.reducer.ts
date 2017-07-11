import { Action, ActionReducer } from '@ngrx/store';
import { ProductActions } from './product.actions';

export const ProductReducer: ActionReducer<any> = (state: any = [], { payload, type }) => {
  switch (type) {
    case ProductActions.UPDATED_PRODUCT:
      console.log('UPDATED_PRODUCT ', payload);
      return state.map(item => {
        return item._id === payload._id ? payload : item;
      });

      // console.log('ProductReducer ', products);
      // return products;

    case ProductActions.ADD_PRODUCT_FULFILLED:
      return [...state, payload.product];

    case ProductActions.FETCH_PRODUCTS_FULFILLED:
      return payload.products || [];

    default:
      return state;
  }
}