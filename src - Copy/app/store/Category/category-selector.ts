import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CategoryState } from './category.reducer';

export const selectDataState = createFeatureSelector<CategoryState>('CategoryList');


export const selectcategoryData = createSelector(
    selectDataState,
    (state: CategoryState) => state.categoryData
);


export const selectDataLoading = createSelector(
    selectDataState,
    (state: CategoryState) => state.loading
);


export const selectDataError = createSelector(
    selectDataState,
    (state: CategoryState) => state.error
);


