import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ArticleState } from './article.reducer';

export const selectDataState = createFeatureSelector<ArticleState>('ArticleList');


export const selectarticleData = createSelector(
    selectDataState,
    (state: ArticleState) => state.articleData
);


export const selectDataLoading = createSelector(
    selectDataState,
    (state: ArticleState) => state.loading
);


export const selectDataError = createSelector(
    selectDataState,
    (state: ArticleState) => state.error
);


export const selectSingleArticleData = createSelector(
    selectDataState,
    (state: ArticleState) => state.article
);


export const selectSingleArticleDataLoading = createSelector(
    selectDataState,
    (state: ArticleState) => state.loading
);


export const selectSingleArticleDataError = createSelector(
    selectDataState,
    (state: ArticleState) => state.error
);


