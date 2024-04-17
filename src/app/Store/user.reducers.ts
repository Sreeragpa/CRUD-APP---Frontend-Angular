import { createReducer, on } from '@ngrx/store';
import { IUserState, IUser } from '../Model/User';
import * as UserActions from './user.actions';
import { state } from '@angular/animations';

export const initialState: IUserState = {
  isLoading: false,
  loggedIn: false,
  token: null,
  user: null,
  error: null,
};
// createReducer(ourinitialstate,on(our changes),function where will get access to our state and we need to return our new state)
export const userReducer = createReducer(
  initialState,
  on(UserActions.loginUser, (state, action) => ({ ...state, isLoading: true })),
  // on(UserActions.loginUserSuccess, (state,action) => ({ ...state, isLoading: false,user:action.userData  })),
  on(UserActions.loginUserSuccess, (state, action) => {
    // if (action.userData.accessToken) {
    //   console.log("action",action);
    //     localStorage.setItem('token', action.userData.accessToken);
    //   }
    return {
      ...state,
      isLoading: false,
      user: action.userData,
      loggedIn: true,
      error: null,
    };
  }),
  on(UserActions.loginUserFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  // Get User Reducers

  on(UserActions.getUser, (state, action) => ({ ...state, isLoading: true })),
  on(UserActions.getUserSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      user: action.userData,
      loggedIn: true,
    };
  }),
  on(UserActions.getUserFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  on(UserActions.userProfileUpdateSuccess, (state, action) => ({
    ...state, 
    user: action.user,
  }))
);
