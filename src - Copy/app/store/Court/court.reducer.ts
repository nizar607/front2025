import {Action, createReducer, on} from '@ngrx/store';
import {
  addcourtDataSuccess,
  deletecourtSuccess,
  fetchcourtData,
  fetchcourtFailure,
  fetchcourtSuccess,
  updatecourtDataSuccess,
  uploadImageSuccess
} from './court.action';


export interface CourtState {
  courtData: any[];
  loading: boolean;
  error: any;
}

export const initialState: CourtState = {
  courtData: [],
  loading: false,
  error: null
};

export const CourtReducer = createReducer(
  initialState,
  on(fetchcourtData, (state) => {
    return {...state, loading: true, error: null};
  }),

  on(fetchcourtSuccess, (state, {fetchedCourtData}) => {
    console.log("fetchedCourtData ", fetchedCourtData);
    return {...state, courtData:fetchedCourtData, loading: false};
  }),

  on(fetchcourtFailure, (state, {error}) => {
    return {...state, error, loading: false};
  }),

  on(addcourtDataSuccess, (state, {newData}) => {
    return {...state, courtData: [newData, ...state.courtData], error: null};
  }),

  on(uploadImageSuccess, (state, {newData}) => {
    console.log("newData ", newData);
    return {...state, courtData: [newData, ...state.courtData], error: null};
  }),

  on(updatecourtDataSuccess, (state, {updatedData}) => {
    console.log("updatedData ", updatedData);
    return {
      ...state,
      courtData: state.courtData.map((courtdata) => courtdata.id === updatedData.id ? updatedData : courtdata),
      error: null
    };
  }),

  on(deletecourtSuccess, (state, {id}) => {
    const updatedlist = state.courtData.filter((courtdata) => !id.includes(courtdata.id));
    console.log("updatedlist ", updatedlist);
    return {...state, courtData: updatedlist, error: null};
  }),
)

// Selector
export function reducer(state: CourtState | undefined, action: Action) {
  return CourtReducer(state, action);
}
