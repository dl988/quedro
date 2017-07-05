import { Action } from '@ngrx/store';

export class UserActions {
  static FETCH_USER = 'FETCH_USER';
  static FETCH_USER_FAILED = 'FETCH_USER_FAILED';
  static USER_FETCHED = 'USER_FETCHED';

  fetchUser (user: any): Action {
    return {
      type: UserActions.FETCH_USER,
      payload: {
        user
      }
    }
  }

  fetchUserFailed (error: any): Action {
    console.log('fetchUserFailed');
    return {
      type: UserActions.FETCH_USER_FAILED,
      payload: error
    }
  }

  userFetched (user: any): Action {
    return {
      type: UserActions.USER_FETCHED,
      payload: {
        user
      }
    }
  }
}