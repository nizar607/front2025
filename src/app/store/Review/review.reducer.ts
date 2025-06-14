import { Action, createReducer, on } from '@ngrx/store';
import {
  addreviewDataSuccess,
  deletereviewSuccess,
  fetchreviewByArticleData,
  fetchreviewByArticleFailure,
  fetchreviewByArticleSuccess,
  fetchreviewData,
  fetchreviewFailure,
  fetchreviewSuccess,
  updatereviewDataSuccess,
  uploadImageSuccess
} from './review.action';


export interface ReviewState {
  reviewData: any[];
  loading: boolean;
  error: any;
}

export const initialState: ReviewState = {
  reviewData: [],
  loading: false,
  error: null
};

export const ReviewReducer = createReducer(
  initialState,
  on(fetchreviewData, (state) => {
    return { ...state, loading: true, error: null };
  }),

  on(fetchreviewSuccess, (state, { fetchedReviewData }) => {
    console.log("fetchedReviewData ", fetchedReviewData);
    return { ...state, reviewData: fetchedReviewData, loading: false };
  }),

  on(fetchreviewFailure, (state, { error }) => {
    return { ...state, error, loading: false };
  }),


  on(fetchreviewByArticleData, (state) => {
    return { ...state, loading: true, error: null };
  }),

  on(fetchreviewByArticleSuccess, (state, { fetchedReviewData }) => {
    console.log("fetchedReviewByArticleData ", fetchedReviewData);
    return { ...state, reviewData: fetchedReviewData, loading: false };
  }),

  on(fetchreviewByArticleFailure, (state, { error }) => {
    return { ...state, error, loading: false };
  }),

  on(addreviewDataSuccess, (state, { newData }) => {
    return { ...state, reviewData: [newData, ...state.reviewData], error: null };
  }),

  on(uploadImageSuccess, (state, { newData }) => {
    console.log("newData ", newData);
    return { ...state, reviewData: [newData, ...state.reviewData], error: null };
  }),

  on(updatereviewDataSuccess, (state, { updatedData }) => {
    console.log("updatedData ", updatedData);
    return {
      ...state,
      reviewData: state.reviewData.map((reviewdata) => reviewdata.id === updatedData.id ? updatedData : reviewdata),
      error: null
    };
  }),

  on(deletereviewSuccess, (state, { id }) => {
    const updatedlist = state.reviewData.filter((reviewdata) => id != reviewdata.id);
    console.log("updatedlist ", updatedlist);
    return { ...state, reviewData: updatedlist, error: null };
  }),
)

// Selector
export function reducer(state: ReviewState | undefined, action: Action) {
  return ReviewReducer(state, action);
}
