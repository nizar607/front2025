import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CalendarState } from './calendar.reducer';


export const selectDataState = createFeatureSelector<CalendarState>('CaseList');

export const selectData = createSelector(
  selectDataState,
  (state: CalendarState) => state.CalendarData
);

export const selectSelectedData = createSelector(
  selectDataState,
  (state: CalendarState) => state.selectedCalendar
);

export const selectDataLoading = createSelector(
    selectDataState,
    (state: CalendarState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: CalendarState) => state.error
);

