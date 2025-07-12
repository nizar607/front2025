import { createReducer, on } from '@ngrx/store';
import { Register, RegisterFailure, RegisterSuccess, login, loginFailure, loginSuccess, logout, fetchUser, fetchUserSuccess, fetchUserFailure } from './authentication.actions';
import { User } from './auth.models';

export interface AuthenticationState {
    isLoggedIn: boolean;
    user: any | null;
    error: string | null;
}
// rever changes here any to User

const initialState: AuthenticationState = {
    isLoggedIn: false,
    user: null,
    error: null,
};

export const authenticationReducer = createReducer(
    initialState,
    on(Register, (state) => ({ ...state, error: null })),
    on(RegisterSuccess, (state, { user }) => ({ ...state, isLoggedIn: true, user, error: null, })),
    on(RegisterFailure, (state, { error }) => ({ ...state, error })),

    on(login, (state) => ({ ...state, error: null })),
    on(loginSuccess, (state, { user }) => ({ ...state, isLoggedIn: true, user, error: null, })),
    on(loginFailure, (state, { error }) => ({ ...state, error })),
    on(logout, (state) => ({ ...state, user: null })),

    on(fetchUser, (state) => ({ ...state, error: null })),
    on(fetchUserSuccess, (state, { user }) => ({ ...state, isLoggedIn: true, user, error: null })),
    on(fetchUserFailure, (state, { error }) => ({ ...state, error })),

);
