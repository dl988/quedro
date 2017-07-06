import { Action, ActionReducer } from '@ngrx/store';
import { UserActions } from './user.actions';

export const UserReducer: ActionReducer<any> = (state: any = {}, { payload, type }) => {
  switch (type) {
    case UserActions.USER_FETCHED:
      return payload.user || {}

    case UserActions.LOGOUT_USER:
      return {};

    case UserActions.FETCH_USER_FAILED:
      return payload.error

    default:
      return state;
  }
}