import { createAction, props } from '@ngrx/store';
import { User } from './auth.models';

// Register action
export const Register = createAction('[Authentication] Register', props<{
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  roles:[string]
}>());
// revert back any to User
export const RegisterSuccess = createAction('[Authentication] Register Success', props<{ user: any }>());
export const RegisterFailure = createAction('[Authentication] Register Failure', props<{ error: string }>());

// login action
export const login = createAction('[Authentication] Login', props<{ email: string, password: string }>());
export const loginSuccess = createAction('[Authentication] Login Success', props<{ user: any }>());
export const loginFailure = createAction('[Authentication] Login Failure', props<{ error: string }>());

// logout action
export const logout = createAction('[Authentication] Logout');

export const logoutSuccess = createAction('[Auth] Logout Success');

// fetch user from localStorage action
export const fetchUser = createAction('[Authentication] Fetch User');
export const fetchUserSuccess = createAction('[Authentication] Fetch User Success', props<{ user: any }>());
export const fetchUserFailure = createAction('[Authentication] Fetch User Failure', props<{ error: string }>());


