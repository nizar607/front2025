import { createSelector } from '@ngrx/store';
import { Homepage3State } from './homepage3.reducer';

export const selectHomepage3State = (state: any) => state.Homepage3List;

export const selectHomepage3Data = createSelector(
  selectHomepage3State,
  (state: Homepage3State) => state.homepage3Data
);

export const selectHomepage3Loading = createSelector(
  selectHomepage3State,
  (state: Homepage3State) => state.loading
);

export const selectHomepage3Error = createSelector(
  selectHomepage3State,
  (state: Homepage3State) => state.error
);