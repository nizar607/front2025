import {Action, createReducer, on} from '@ngrx/store';
import {
  addCaseDataSuccess,
  deleteCaseFailure,
  deleteCaseSuccess,
  fetchCaseData,
  fetchCaseFailure,
  fetchCaseSuccess,
  fetchSelectedCaseData,
  fetchSelectedCaseDataFailure,
  fetchSelectedCaseDataSuccess,
  updateCaseData,
  updateCaseDataSuccess
} from './case.action';

export interface CaseState {
  caseData: any[];
  selectedCase: any;
  loading: boolean;
  error: any;
}

export const initialState: CaseState = {
  caseData: [],
  selectedCase: null,
  loading: true,
  error: null
};

export const CaseReducer = createReducer(
  initialState,
  on(fetchCaseData, (state) => {
    return {...state, loading: true, selectedCase: null, error: null};
  }),

  on(fetchCaseSuccess, (state, {caseData}) => {
    return {...state, caseData: [...caseData], loading: false, error: null};
  }),

  on(fetchSelectedCaseData, (state) => {
    return {...state, loading: true, error: null};
  }),

  on(fetchSelectedCaseDataSuccess, (state, {selectedCase}) => {
    return {...state, selectedCase: selectedCase, loading: false, error: null};
  }),

  on(fetchSelectedCaseDataFailure, (state, {error}) => {
    return {...state, error, loading: false};
  }),

  on(fetchCaseFailure, (state, {error}) => {
    return {...state, error, loading: false};
  }),

  on(addCaseDataSuccess, (state, {newData}) => {
    console.log('newData from reducer: ', newData);
    return {...state, caseData: [...state.caseData,newData ], error: null};
  }),

  on(updateCaseDataSuccess, (state, {updatedData}) => {
    return {
      ...state,
      caseData: state.caseData.map((casedata) => casedata.id === updatedData.id ? updatedData : casedata),
      error: null
    };
  }),

  on(deleteCaseSuccess, (state, {id}) => {
    return {...state, caseData: state.caseData.filter((caseData) => caseData.id !== id), error: null};
  }),
);

export function reducer(state: CaseState | undefined, action: Action) {
  return CaseReducer(state, action);
}
