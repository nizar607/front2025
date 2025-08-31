import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './users.reducer';

export const selectDataState = createFeatureSelector<UserState>('Userlist');

export const selectlistData = createSelector(
    selectDataState,
    (state: UserState) => state.userData
);
export const selectData = createSelector(
    selectDataState,
    (state: UserState) => state.userData
);

export const selectDataLoading = createSelector(
    selectDataState,
    (state: UserState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: UserState) => state.error
);

export const selectUserStats = createSelector(
    selectDataState,
    (state: UserState) => state.userStats
);


