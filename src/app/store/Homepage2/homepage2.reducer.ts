import { Action, createReducer, on } from '@ngrx/store';
import {
  addHomepage2DataSuccess,
  deleteHomepage2Success,
  fetchHomepage2Data,
  fetchHomepage2Failure,
  fetchHomepage2Success,
  updateHomepage2DataSuccess,
  updateHomepage2ImagesSuccess,
  uploadHomepage2ImageSuccess
} from './homepage2.action';
import { Homepage2Model } from './homepage2.model';

export interface Homepage2State {
  homepage2Data: Homepage2Model | null;
  loading: boolean;
  error: string | null;
}

export const initialState: Homepage2State = {
  homepage2Data: null,
  loading: false,
  error: null
};

export const Homepage2Reducer = createReducer(
  initialState,
  
  // Homepage2 Data
  on(fetchHomepage2Data, (state) => {
    return { ...state, loading: true, error: null };
  }),

  on(fetchHomepage2Success, (state, { fetchedHomepage2Data }) => {
    console.log('fetchedHomepage2Data ', fetchedHomepage2Data);
    return { ...state, homepage2Data: fetchedHomepage2Data, loading: false };
  }),

  on(fetchHomepage2Failure, (state, { error }) => {
    return { ...state, error, loading: false };
  }),

  on(addHomepage2DataSuccess, (state, { newData }) => {
    return { ...state, homepage2Data: newData, error: null };
  }),

  on(uploadHomepage2ImageSuccess, (state, { newData }) => {
    console.log('newData ', newData);
    return { ...state, homepage2Data: newData, error: null };
  }),

  on(updateHomepage2DataSuccess, (state, { updatedData }) => {
    console.log('updatedData ', updatedData);
    return {
      ...state,
      homepage2Data: updatedData,
      error: null
    };
  }),

  on(updateHomepage2ImagesSuccess, (state, { updatedData }) => {
    console.log('updated images ', updatedData);
    return {
      ...state,
      homepage2Data: updatedData,
      error: null
    };
  }),

  on(deleteHomepage2Success, (state, { id }) => {
    console.log('deleted homepage2 with id: ', id);
    return { ...state, homepage2Data: null, error: null };
  })


);

// Selector
export function reducer(state: Homepage2State | undefined, action: Action) {
  return Homepage2Reducer(state, action);
}