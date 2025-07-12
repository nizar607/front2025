import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CompanyState } from './company.reducer';

export const selectDataState = createFeatureSelector<CompanyState>('CompanyList');


export const selectcompanyData = createSelector(
    selectDataState,
    (state: CompanyState) => state.companyData
);


export const selectDataLoading = createSelector(
    selectDataState,
    (state: CompanyState) => state.loading
);


export const selectDataError = createSelector(
    selectDataState,
    (state: CompanyState) => state.error
);


