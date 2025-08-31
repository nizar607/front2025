import { Action, createReducer, on } from '@ngrx/store';
import { updateUserDataSuccess,updateUserDataFailure, fetchUserData, fetchUserDataFailure, fetchUserDataSuccess, fetchUserStats, fetchUserStatsSuccess, fetchUserStatsFailure } from './users.action';

export interface UserState {
    userData: any;
    userStats: any;
    loading: boolean;
    error: any;
}

export const initialState: UserState = {
    userData: [],
    userStats: null,
    loading: false,
    error: null
};

export const UserReducer = createReducer(
    initialState,
    on(fetchUserData, (state) => {
        return { ...state, loading: true, error: null };
    }),

    on(fetchUserDataSuccess, (state, { userData }) => {
        return { ...state, userData, loading: false };
    }),

    on(fetchUserDataFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    on(updateUserDataSuccess, (state, {updatedData}) => {
        console.log('user updated : ', updatedData);
        const updatedUserData = state.userData.map((user: any) => 
          user.id === updatedData.id ? updatedData : user
        );
        return {...state, userData: updatedUserData, error: null};
      }),

    on(fetchUserStats, (state) => {
        return { ...state, loading: true, error: null };
    }),

    on(fetchUserStatsSuccess, (state, { userStats }) => {
        return { ...state, userStats, loading: false, error: null };
    }),

    on(fetchUserStatsFailure, (state, { error }) => {
        return { ...state, loading: false, error };
    }),
)

// Selector
export function reducer(state: UserState | undefined, action: Action) {
    return UserReducer(state, action);
}