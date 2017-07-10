import { Action } from '@ngrx/store';

export class SelectedProductActions {
  static SELECT_PRODUCT = 'SELECT_PRODUCT';

  selectProduct (product: any): Action {
    return {
      type: SelectedProductActions.SELECT_PRODUCT,
      payload: product
    }
  }
}