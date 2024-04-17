import { createAction, props } from '@ngrx/store';
import { IUser, IUserLoginFormData } from '../Model/User';

// export const loginUser = createAction('[User] Get Token');
export const loginUser = createAction('[User] Login User', props<{ formData: IUserLoginFormData }>());
export const loginUserSuccess = createAction('[User] Login User Success', props<{ userData: IUser }>());
export const loginUserFailure = createAction('[User] Login User Failure', props<{ error: string }>());

export const getUser = createAction('[User] Get User');
export const getUserSuccess = createAction('[User] Get User Success', props<{ userData: IUser}>());
export const getUserFailure = createAction('[User] Get User Failure', props<{ error: string}>());



export const userProfileUpdateSuccess = createAction('[User] Update Profile Success ', props<{ user: IUser | null}>());
