import {createFeatureSelector, createSelector} from '@ngrx/store';
import {PhaseState} from './phase.reducer';


export const selectDataState = createFeatureSelector<PhaseState>('PhaseList');



export const selectData = createSelector(
  selectDataState,
  (state: PhaseState) => state.phaseData
);

export const selectSelectedPhaseData = createSelector(
  selectDataState,
  (state: PhaseState) => state.selectedPhase
);

export const selectDataLoading = createSelector(
  selectDataState,
  (state: PhaseState) => state.loading
);

export const selectDataError = createSelector(
  selectDataState,
  (state: PhaseState) => state.error
);

