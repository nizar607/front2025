import {Action, createReducer, on} from '@ngrx/store';
import {
  addCalendarDataSuccess,
  deleteCalendarFailure,
  deleteCalendarSuccess,
  fetchCalendarData,
  fetchCalendarFailure,
  fetchCalendarSuccess,
  fetchSelectedCalendarData,
  fetchSelectedCalendarDataFailure,
  fetchSelectedCalendarDataSuccess,
  updateCalendarData,
  updateCalendarDataSuccess
} from './calendar.action';

export interface CalendarState {
  CalendarData: any[];
  selectedCalendar: any[];
  loading: boolean;
  error: any;
}

export const initialState: CalendarState = {
  CalendarData: [],
  selectedCalendar: [],
  loading: true,
  error: null
};

export const CalendarReducer = createReducer(
  initialState,
  on(fetchCalendarData, (state) => {
    return {...state, loading: true, selectedCalendar: [], error: null};
  }),

  on(fetchCalendarSuccess, (state, {calendarData}) => {
    return {...state, CalendarData: [...calendarData], loading: false, error: null};
  }),

  on(fetchCalendarFailure, (state, {error}) => {
    return {...state, error, loading: false};
  }),

  on(fetchSelectedCalendarData, (state) => {
    return {...state, loading: true, error: null};
  }),

  on(fetchSelectedCalendarDataSuccess, (state, {selectedCalendar}) => {
    return {...state, selectedCalendar: [...selectedCalendar], loading: false, error: null};
  }),

  on(fetchSelectedCalendarDataFailure, (state, {error}) => {
    return {...state, error, loading: false};
  }),

  on(addCalendarDataSuccess, (state, {newData}) => {
    console.log('newData : ', newData);
    return {...state, CalendarData: [newData, ...state.CalendarData], error: null};
  }),

  on(updateCalendarDataSuccess, (state, {updatedData}) => {
    return {
      ...state,
      CalendarData: state.CalendarData.map((Calendardata) => Calendardata.id === updatedData.id ? updatedData : Calendardata),
      error: null
    };
  }),

  on(deleteCalendarSuccess, (state, {id}) => {
    return {...state, CalendarData: state.CalendarData.filter((CalendarData) => CalendarData.id !== id), error: null};
  }),
);

export function reducer(state: CalendarState | undefined, action: Action) {
  return CalendarReducer(state, action);
}
