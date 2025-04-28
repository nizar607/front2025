import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DocumentState } from './document.reducer';

export const selectDataState = createFeatureSelector<DocumentState>('DocumentList');

export const selectdocumentsData = createSelector(
    selectDataState,
    (state: DocumentState) => state.documentdata
);

export const selectDataLoading = createSelector(
    selectDataState,
    (state: DocumentState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: DocumentState) => state.error
);


