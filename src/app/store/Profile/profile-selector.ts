import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfileState } from './profile.reducer';

export const selectDataState = createFeatureSelector<ProfileState>('Profilelist');

export const selectprofileData = createSelector(
    selectDataState,
    (state: ProfileState) => state.profiledata
);

export const selectDataLoading = createSelector(
    selectDataState,
    (state: ProfileState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: ProfileState) => state.error
);


