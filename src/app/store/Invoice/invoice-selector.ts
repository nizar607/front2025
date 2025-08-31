import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InvoiceState } from './invoice.reducer';

export const selectDataState = createFeatureSelector<InvoiceState>('InvoiceList');


export const selectinvoiceData = createSelector(
    selectDataState,
    (state: InvoiceState) => state.invoiceData
);


export const selectDataLoading = createSelector(
    selectDataState,
    (state: InvoiceState) => state.loading
);


export const selectDataError = createSelector(
    selectDataState,
    (state: InvoiceState) => state.error
);


