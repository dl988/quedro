import { SelectedProductActions } from '../actions';

export const SelectedProductReducer = (state: any = null, {type, payload}) => {
  switch (type) {
    case SelectedProductActions.SELECT_PRODUCT:
      return payload;
    default:
      return state;
  }
};
