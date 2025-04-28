import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MapState } from './map.reducer';

export const selectDataState = createFeatureSelector<MapState>('MapList');

export const selectMapData = createSelector(
    selectDataState,
    (state: MapState) => state.mapData
);

export const selectSelectedMapData = createSelector(
  selectDataState,
  (state: MapState) => state.selectedMapData
);


export const selectDataLoading = createSelector(
    selectDataState,
    (state: MapState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: MapState) => state.error
);


