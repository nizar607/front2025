import {Action, createReducer, on} from '@ngrx/store';
import {
  addPhaseDataSuccess,
  deletePhaseFailure,
  deletePhaseSuccess,
  fetchPhaseData,
  fetchPhaseFailure,
  fetchPhaseSuccess,
  fetchSelectedPhaseData,
  fetchSelectedPhaseDataFailure,
  fetchSelectedPhaseDataSuccess,
  updatePhaseData,
  updatePhaseDataSuccess
} from './phase.action';
import {fetchCalendarData, fetchCalendarFailure, fetchCalendarSuccess} from "../Calendar/calendar.action";

export interface PhaseState {
  phaseData: any[];
  selectedPhase: any[];
  loading: boolean;
  error: any;
}

export const initialState: PhaseState = {
  phaseData: [],
  selectedPhase: [],
  loading: true,
  error: null
};

export const PhaseReducer = createReducer(

  initialState,

  on(fetchPhaseData, (state) => {
    return {...state, loading: true, selectedPhase: [], error: null};
  }),

  on(fetchPhaseSuccess, (state, {phaseData}) => {
    return {...state, phaseData: [...phaseData], loading: false, error: null};
  }),

  on(fetchPhaseFailure, (state, {error}) => {
    return {...state, error, loading: false};
  }),


  on(addPhaseDataSuccess, (state, {newData}) => {
    console.log('newData : ', newData);
    return {...state, selectedPhase: [newData, ...state.selectedPhase], error: null};
  }),

  on(fetchSelectedPhaseData, (state) => {
    return {...state, loading: true, error: null};
  }),

  on(fetchSelectedPhaseDataSuccess, (state, {selectedPhase}) => {
    return {...state, selectedPhase: selectedPhase, loading: false, error: null};
  }),

  on(fetchSelectedPhaseDataFailure, (state, {error}) => {
    return {...state, error, loading: false};
  }),

  on(fetchPhaseFailure, (state, {error}) => {
    return {...state, error, loading: false};
  }),


 /* on(updatePhaseDataSuccess, (state, {updatedData}) => {
    return {
      ...state,
      phaseData: state.selectedPhase.map((phasedata) => phasedata.id === updatedData.id ? updatedData : phasedata),
      error: null
    };
  }),


  on(deletePhaseSuccess, (state, {id}) => {
    return {...state, phaseData: state.selectedPhase.filter((phaseData) => phaseData.id !== id), error: null};
  }),

  */
);

export function reducer(state: PhaseState | undefined, action: Action) {
  return PhaseReducer(state, action);
}
