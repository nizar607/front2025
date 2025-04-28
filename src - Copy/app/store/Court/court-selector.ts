import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourtState } from './court.reducer';

export const selectDataState = createFeatureSelector<CourtState>('CourtList');


export const selectcourtData = createSelector(
    selectDataState,
    (state: CourtState) => state.courtData
);


export const selectDataLoading = createSelector(
    selectDataState,
    (state: CourtState) => state.loading
);


export const selectDataError = createSelector(
    selectDataState,
    (state: CourtState) => state.error
);


