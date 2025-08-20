import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Homepage2State } from './homepage2.reducer';

export const selectHomepage2State = createFeatureSelector<Homepage2State>('Homepage2List');

// Homepage2 Data Selectors
export const selectHomepage2Data = createSelector(
    selectHomepage2State,
    (state: Homepage2State) => state.homepage2Data
);

export const selectHomepage2Loading = createSelector(
    selectHomepage2State,
    (state: Homepage2State) => state.loading
);
 
export const selectHomepage2Error = createSelector(
    selectHomepage2State,
    (state: Homepage2State) => state.error
);



// Combined Selectors
export const selectHomepage2Content = createSelector(
    selectHomepage2Data,
    selectHomepage2Loading,
    selectHomepage2Error,
    (homepage2Data, loading, error) => ({
        homepage2Data,
        loading,
        error
    })
);