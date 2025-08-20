import { Action, createReducer, on } from '@ngrx/store';
import {
  addHomepage3DataSuccess,
  deleteHomepage3DataSuccess,
  fetchHomepage3Data,
  fetchHomepage3DataFailure,
  fetchHomepage3DataSuccess,
  updateHomepage3DataSuccess,
  updateHomepage3ImagesSuccess,
  uploadHomepage3ImageSuccess
} from './homepage3.action';
import { Homepage3DTO } from './homepage3.model';

export interface Homepage3State {
  homepage3Data: any;
  loading: boolean;
  error: string | null;
}

export const initialState: Homepage3State = {
  homepage3Data: null,
  loading: false,
  error: null
};

export const Homepage3Reducer = createReducer(
  initialState,
  
  // Homepage3 Data
  on(fetchHomepage3Data, (state) => {
    return { ...state, loading: true, error: null };
  }),

  on(fetchHomepage3DataSuccess, (state, { homepage3Data }) => {
    console.log('fetchedHomepage3Data ', homepage3Data);
    return { ...state, homepage3Data: homepage3Data, loading: false };
  }),

  on(fetchHomepage3DataFailure, (state, { error }) => {
    return { ...state, error, loading: false };
  }),

  on(addHomepage3DataSuccess, (state, { homepage3Data }) => {
    return { ...state, homepage3Data: homepage3Data, error: null };
  }),

  on(uploadHomepage3ImageSuccess, (state, { imageUrl }) => {
    console.log('imageUrl ', imageUrl);
    return { ...state, error: null };
  }),

  on(updateHomepage3DataSuccess, (state, { homepage3Data }) => {
    console.log('updatedData ', homepage3Data);
    return {
      ...state,
      homepage3Data: homepage3Data,
      loading: false,
      error: null
    };
  }),

  on(updateHomepage3ImagesSuccess, (state, { homepage3Data }) => {
    console.log('updatedData ', homepage3Data);
    return {
      ...state,
      homepage3Data: homepage3Data,
      loading: false,
      error: null
    };
  }),

  on(deleteHomepage3DataSuccess, (state, { id }) => {
    return { ...state, homepage3Data: null, loading: false };
  })

);

export function reducer(state: Homepage3State | undefined, action: Action) {
  return Homepage3Reducer(state, action);
}