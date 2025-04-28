import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ContactState } from './contact.reducer';


export const selectDataState = createFeatureSelector<ContactState>('ContactList');

export const selectData = createSelector(
    selectDataState,
    (state: ContactState) => state.contactdata
);

export const selectDataLoading = createSelector(
    selectDataState,
    (state: ContactState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: ContactState) => state.error
);

