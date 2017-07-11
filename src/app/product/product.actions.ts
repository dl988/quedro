import { Action } from '@ngrx/store';

export class ProductActions {
  static UPDATE_PRODUCT = 'UPDATE_PRODUCT';
  static UPDATED_PRODUCT = 'UPDATED_PRODUCT';

  static ADD_PRODUCT = 'ADD_PRODUCT';
  static ADD_PRODUCT_FAILED = 'ADD_PRODUCT_FAILED';
  static ADD_PRODUCT_FULFILLED = 'ADD_PRODUCT_FULFILLED';

  static FETCH_PRODUCT = 'FETCH_PRODUCT';
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


  // Update product
  updateProduct (product: any): Action {
    return {
      type: ProductActions.UPDATE_PRODUCT,
      payload: product
    }
  }

  updatedProduct (product: any): Action {
    return {
      type: ProductActions.UPDATED_PRODUCT,
      payload: product
    }
  }

  // Add product
  addProduct (product: any): Action {
    return {
      type: ProductActions.ADD_PRODUCT,
      payload: product
    }
  }

  addProductFailed (error: any): Action {
    return {
      type: ProductActions.ADD_PRODUCT_FAILED,
      payload: error
    };
  }

  addProductFulfilled (product: any): Action {
    return {
      type: ProductActions.ADD_PRODUCT_FULFILLED,
      payload: product
    };
  }

  // Fetch product
  fetchProduct (productID: any): Action {
    return {
      type: ProductActions.FETCH_PRODUCT,
      payload: productID
    }
  }

  // Fetch sold products
  fetchSoldProducts (): Action {
    return {
      type: ProductActions.FETCH_SOLD_PRODUCTS
    };
  }

  soldProductsFetched (products: any): Action {
    return {
      type: ProductActions.FETCH_PRODUCTS_FULFILLED,
      payload: products
    };
  }

  // Fetch avalable products
  fetchAvailableProducts (): Action {
    return {
      type: ProductActions.FETCH_AVAILABLE_PRODUCTS
    };
  }

  availableProductsFetched (products: any): Action {
    return {
      type: ProductActions.FETCH_PRODUCTS_FULFILLED,
      payload: products
    };
  }

  // Fetch products
  fetchProducts (): Action {
    return {
      type: ProductActions.FETCH_PRODUCTS
    };
  }

  fetchProductsFailed (error: any): Action {
    return {
      type: ProductActions.FETCH_PRODUCTS_FAILED,
      payload: error
    };
  }

  fetchProductsFulfilled (products: any): Action {
    return {
      type: ProductActions.FETCH_PRODUCTS_FULFILLED,
      payload: products
    };
  }
}