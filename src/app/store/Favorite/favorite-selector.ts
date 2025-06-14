import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoriteState } from './favorite.reducer';

export const selectDataState = createFeatureSelector<FavoriteState>('FavoriteList');


export const selectfavoriteData = createSelector(
    selectDataState,
    (state: FavoriteState) => state.favoriteData
);



export const selectDataLoading = createSelector(
    selectDataState,
    (state: FavoriteState) => state.loading
);


export const selectDataError = createSelector(
    selectDataState,
    (state: FavoriteState) => state.error
);


export const selectFavoriteStatus = createSelector(
    selectDataState,
    (state: FavoriteState) => state.favoriteStatus
  );
  
  export const selectIsFavorite = (articleId: number) => createSelector(
    selectFavoriteStatus,
    (favoriteStatus) => favoriteStatus[articleId] || false
  );

export const selectFavoriteCount = createSelector(
    selectfavoriteData,
    (favoriteData) => favoriteData ? favoriteData.length : 0
);

