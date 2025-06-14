import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReviewState } from './review.reducer';

export const selectDataState = createFeatureSelector<ReviewState>('ReviewList');


export const selectreviewData = createSelector(
    selectDataState,
    (state: ReviewState) => state.reviewData
);


export const selectDataLoading = createSelector(
    selectDataState,
    (state: ReviewState) => state.loading
);


export const selectDataError = createSelector(
    selectDataState,
    (state: ReviewState) => state.error
);


