import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Homepage1State } from './homepage1.reducer';

export const selectHomepage1State = createFeatureSelector<Homepage1State>('Homepage1List');

// Homepage1 Data Selectors
export const selectHomepage1Data = createSelector(
    selectHomepage1State,
    (state: Homepage1State) => state.homepage1Data
);

export const selectHomepage1Loading = createSelector(
    selectHomepage1State,
    (state: Homepage1State) => state.loading
);
 
export const selectHomepage1Error = createSelector(
    selectHomepage1State,
    (state: Homepage1State) => state.error
);