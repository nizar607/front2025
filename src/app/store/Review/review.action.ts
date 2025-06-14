import { createAction, props } from '@ngrx/store';
import { ReviewModel } from './review.model';


// fetch review data
export const fetchreviewData = createAction('[Data] Fetch review Table Data');
export const fetchreviewSuccess = createAction('[Data] Fetch review Data Success', props<{ fetchedReviewData: any[] }>());
export const fetchreviewFailure = createAction('[Data] Fetch review Data Failure', props<{ error: string }>());

export const fetchreviewByArticleData = createAction('[Data] Fetch review by article Table Data', props<{ id: number }>());
export const fetchreviewByArticleSuccess = createAction('[Data] Fetch review by article Data Success', props<{ fetchedReviewData: any[] }>());
export const fetchreviewByArticleFailure = createAction('[Data] Fetch review by article Data Failure', props<{ error: string }>());

// Add Data
export const addreviewData = createAction(
  '[Data] Add reviewData',
  props<{ newData: any }>()
);

export const uploadImage = createAction(
  '[Data] Image Uploading',
  props<{ newData: FormData }>()
);

export const uploadImageSuccess = createAction(
  '[Data] Image Upload Success',
  props<{ newData: any }>()
);

export const uploadImageFailure = createAction(
  '[Data] Image Upload Failure',
  props<{ error: string }>()
);

export const addreviewDataSuccess = createAction(
  '[Data] Add reviewData Success',
  props<{ newData: any }>()
);
export const addreviewDataFailure = createAction(
  '[Data] Add reviewData Failure',
  props<{ error: string }>()
);


// Update Data
export const updatereviewData = createAction(
  '[Data] Update reviewData',
  props<{ id: number, updatedData: any }>()
);

export const updatereviewDataSuccess = createAction(
  '[Data] Update reviewData Success',
  props<{ updatedData: ReviewModel }>()
);
export const updatereviewDataFailure = createAction(
  '[Data] Update reviewData Failure',
  props<{ error: string }>()
);

// Delete Data
export const deletereviewData = createAction(
  '[Data] Delete reviewData',
  props<{ id: number }>()
);
export const deletereviewSuccess = createAction(
  '[Data] Delete reviewData Success',
  props<{ id: number }>()
);
export const deletereviewFailure = createAction(
  '[Data] Delete reviewData Failure',
  props<{ error: string }>()
);
