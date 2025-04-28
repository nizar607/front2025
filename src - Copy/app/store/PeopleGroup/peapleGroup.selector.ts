import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PeopleGroupState } from './peapleGroup.reducer';


export const selectDataState = createFeatureSelector<PeopleGroupState>('PeopleGroupList');

export const selectData = createSelector(
    selectDataState,
    (state: PeopleGroupState) => state.peopleGroupdata
);

export const selectDataLoading = createSelector(
    selectDataState,
    (state: PeopleGroupState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: PeopleGroupState) => state.error
);

