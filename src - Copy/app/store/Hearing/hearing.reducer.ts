import {Action, createReducer, on} from '@ngrx/store';
import {
  addHearingData,
  addHearingDataSuccess,
  deleteHearingFailure,
  deleteHearingSuccess,
  fetchHearingData,
  fetchHearingFailure,
  fetchHearingSuccess,
  updateHearingData,
  updateHearingDataSuccess
} from './hearing.action';
import {createEventId} from "../../pages/apps/calendar/data";


export interface HearingState {
  hearingData: any[];
  newHearingData: any;
  loading: boolean;
  error: any;
}

export const initialState: HearingState = {
  hearingData: [],
  newHearingData: null,
  loading: false,
  error: null
};

export const HearingReducer = createReducer(
  initialState,
  on(fetchHearingData, (state) => {
    return {...state, loading: true, error: null};
  }),

  on(fetchHearingSuccess, (state, {hearingdata}) => {
    console.log("from reducer hearingdata", hearingdata);
    hearingdata.forEach((hearingdata) => {
      return {
        ...hearingdata,
        start: new Date(hearingdata.start),
        end: new Date(new Date(hearingdata.end).setDate(new Date(hearingdata.end).getDate() - 1)),
        className: "bg-danger-subtle",
      }
    });

    return {...state, hearingData: hearingdata, loading: false};
  }),
  
  on(fetchHearingFailure, (state, {error}) => {
    return {...state, error, loading: false};
  }),

  on(addHearingDataSuccess, (state, {newData}) => {
    const newHearingData = {...newData, id: createEventId(), start: new Date(newData.start), end: new Date(new Date(newData.end).setDate(new Date(newData.end).getDate() - 1)), className: "bg-danger-subtle"};
    return {...state, hearingData: [newData, ...state.hearingData],newHearingData:newHearingData, error: null};
  }),
  on(updateHearingDataSuccess, (state, {updatedData}) => {
    return {
      ...state,
      hearingData: state.hearingData.map((hearingdata) => hearingdata.id === updatedData.id ? updatedData : hearingdata),
      error: null
    };
  }),

  on(deleteHearingSuccess, (state, {id}) => {
    return {...state, hearingData: state.hearingData.filter((hearingData) => hearingData.id !== id), error: null}
  }),
)

// Selector
export function reducer(state: HearingState | undefined, action: Action) {
  return HearingReducer(state, action);
}
