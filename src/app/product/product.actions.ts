import { Action } from '@ngrx/store';

export class ProductActions {
  static FETCH_PRODUCTS = 'FETCH_PRODUCTS';
  static FETCH_PRODUCTS_FULFILLED = 'FETCH_PRODUCTS_FULFILLED';
  static FETCH_PRODUCTS_FAILED = 'FETCH_PRODUCTS_FAILED';

  // 
  static FETCH_SOLD_PRODUCTS = 'FETCH_SOLD_PRODUCTS';
  static SOLD_PRODUCTS_FETCHED = 'SOLD_PRODUCTS_FETCHED';
  static FETCH_AVAILABLE_PRODUCTS = 'FETCH_AVAILABLE_PRODUCTS';
  static AVAILABLE_PRODUCTS_FETCHED = 'AVAILABLE_PRODUCTS_FETCHED';

  //===================================
  //  FETCH
  //-----------------------------------

  // Fetch sold products
  fetchSoldProducts(): Action {
    return {
      type: ProductActions.FETCH_SOLD_PRODUCTS
    };
  }

  soldProductsFetched(products: any): Action {
    return {
      type: ProductActions.FETCH_PRODUCTS_FULFILLED,
      payload: products
    };
  }

  // Fetch avalable products
  fetchAvailableProducts(): Action {
    return {
      type: ProductActions.FETCH_AVAILABLE_PRODUCTS
    };
  }

  availableProductsFetched(products: any): Action {
    return {
      type: ProductActions.FETCH_PRODUCTS_FULFILLED,
      payload: products
    };
  }

  // Fetch products
  fetchProducts(): Action {
    return {
      type: ProductActions.FETCH_PRODUCTS
    };
  }

  fetchProductsFailed(error: any): Action {
    return {
      type: ProductActions.FETCH_PRODUCTS_FAILED,
      payload: error
    };
  }

  fetchProductsFulfilled(products: any): Action {
    return {
      type: ProductActions.FETCH_PRODUCTS_FULFILLED,
      payload: products
    };
  }
}