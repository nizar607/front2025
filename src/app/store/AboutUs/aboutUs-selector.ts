import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AboutUsState } from './aboutUs.reducer';

export const selectDataState = createFeatureSelector<AboutUsState>('AboutList');


export const selectaboutusData = createSelector(
    selectDataState,
    (state: AboutUsState) => state.aboutusData
);


export const selectDataLoading = createSelector(
    selectDataState,
    (state: AboutUsState) => state.loading
);


export const selectDataError = createSelector(
    selectDataState,
    (state: AboutUsState) => state.error
);


