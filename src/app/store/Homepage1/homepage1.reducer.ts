import { Action, createReducer, on } from '@ngrx/store';
import {
  addHomepage1DataSuccess,
  deleteHomepage1Success,
  fetchHomepage1Data,
  fetchHomepage1Failure,
  fetchHomepage1Success,
  updateHomepage1DataSuccess,
  updateHomepage1ImagesSuccess,
  uploadHomepage1ImageSuccess
} from './homepage1.action';
import { Homepage1Model } from './homepage1.model';

export interface Homepage1State {
  homepage1Data: Homepage1Model | null;
  loading: boolean;
  error: string | null;
}

export const initialState: Homepage1State = {
  homepage1Data: null,
  loading: false,
  error: null
};

export const Homepage1Reducer = createReducer(
  initialState,
  
  // Homepage1 Data
  on(fetchHomepage1Data, (state) => {
    return { ...state, loading: true, error: null };
  }),

  on(fetchHomepage1Success, (state, { fetchedHomepage1Data }) => {
    console.log('fetchedHomepage1Data ', fetchedHomepage1Data);
    return { ...state, homepage1Data: fetchedHomepage1Data, loading: false };
  }),

  on(fetchHomepage1Failure, (state, { error }) => {
    return { ...state, error, loading: false };
  }),

  on(addHomepage1DataSuccess, (state, { newData }) => {
    return { ...state, homepage1Data: newData, error: null };
  }),

  on(uploadHomepage1ImageSuccess, (state, { newData }) => {
    console.log('newData ', newData);
    return { ...state, homepage1Data: newData, error: null };
  }),

  on(updateHomepage1DataSuccess, (state, { updatedData }) => {
    console.log('updatedData ', updatedData);
    return {
      ...state,
      homepage1Data: updatedData,
      error: null
    };
  }),

  on(updateHomepage1ImagesSuccess, (state, { updatedData }) => {
    console.log('updated images data ', updatedData);
    return {
      ...state,
      homepage1Data: updatedData,
      error: null
    };
  }),

  on(deleteHomepage1Success, (state, { id }) => {
    console.log('deleted homepage1 with id: ', id);
    return { ...state, homepage1Data: null, error: null };
  })
);

// Selector
export function reducer(state: Homepage1State | undefined, action: Action) {
  return Homepage1Reducer(state, action);
}