import {Action, createReducer, on} from '@ngrx/store';
import {
  addaboutusDataSuccess,
  deleteaboutusSuccess,
  fetchaboutusData,
  fetchaboutusFailure,
  fetchaboutusSuccess,
  updateaboutusDataSuccess,
  uploadImageSuccess
} from './aboutUs.action';


export interface AboutUsState {
  aboutusData: any | null;
  loading: boolean;
  error: any;
}

export const initialState: AboutUsState = {
  aboutusData: null,
  loading: false,
  error: null
};

export const AboutUsReducer = createReducer(
  initialState,
  on(fetchaboutusData, (state) => {
    return {...state, loading: true, error: null};
  }),

  on(fetchaboutusSuccess, (state, {fetchedAboutUsData}) => {
    console.log("fetchedAboutUsData ", fetchedAboutUsData);
    return {...state, aboutusData: fetchedAboutUsData, loading: false};
  }),

  on(fetchaboutusFailure, (state, {error}) => {
    return {...state, error, loading: false};
  }),

  on(addaboutusDataSuccess, (state, {newData}) => {
    return {...state, aboutusData: newData, error: null};
  }),

  on(uploadImageSuccess, (state, {newData}) => {
    console.log("newData ", newData);
    return {...state, aboutusData: newData, error: null};
  }),

  on(updateaboutusDataSuccess, (state, {updatedData}) => {
    console.log("updatedData ", updatedData);
    return {
      ...state,
      aboutusData: updatedData,
      error: null
    };
  }),

  on(deleteaboutusSuccess, (state, {id}) => {
    console.log("deleted aboutus with id: ", id);
    return {...state, aboutusData: null, error: null};
  }),
)

// Selector
export function reducer(state: AboutUsState | undefined, action: Action) {
  return AboutUsReducer(state, action);
}
