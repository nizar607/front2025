import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HearingState } from './hearing.reducer';


export const selectDataState = createFeatureSelector<HearingState>('HearingList');

export const selectData = createSelector(
    selectDataState,
    (state: HearingState) => state.hearingData
);

export const selectNewHearingData = createSelector(
  selectDataState,
  (state: HearingState) => state.newHearingData
);

export const selectDataLoading = createSelector(
    selectDataState,
    (state: HearingState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: HearingState) => state.error
);

