import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CaseState } from './case.reducer';

export const selectDataState = createFeatureSelector<CaseState>('CaseList');


export const selectData = createSelector(
  selectDataState,
  (state: CaseState) => state.caseData
);

export const selectSelectedData = createSelector(
  selectDataState,
  (state: CaseState) => state.selectedCase
);

export const selectDataLoading = createSelector(
    selectDataState,
    (state: CaseState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: CaseState) => state.error
);

