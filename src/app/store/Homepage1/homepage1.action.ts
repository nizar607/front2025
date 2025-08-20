import { createAction, props } from '@ngrx/store';
import { Homepage1Model } from './homepage1.model';

// Fetch homepage1 data
export const fetchHomepage1Data = createAction('[Data] Fetch Homepage1 Table Data');
export const fetchHomepage1Success = createAction('[Data] Fetch Homepage1 Data Success', props<{ fetchedHomepage1Data: any }>());
export const fetchHomepage1Failure = createAction('[Data] Fetch Homepage1 Data Failure', props<{ error: string }>());

// Add Data
export const addHomepage1Data = createAction(
  '[Data] Add Homepage1Data',
  props<{ newData: any }>()
);

export const uploadHomepage1Image = createAction(
  '[Data] Homepage1 Image Uploading',
  props<{ newData: FormData }>()
);

export const uploadHomepage1ImageSuccess = createAction(
  '[Data] Homepage1 Image Upload Success',
  props<{ newData: any }>()
);

export const uploadHomepage1ImageFailure = createAction(
  '[Data] Homepage1 Image Upload Failure',
  props<{ error: string }>()
);

export const addHomepage1DataSuccess = createAction(
  '[Data] Add Homepage1Data Success',
  props<{ newData: any }>()
);
export const addHomepage1DataFailure = createAction(
  '[Data] Add Homepage1Data Failure',
  props<{ error: string }>()
);

// Update Data
export const updateHomepage1Data = createAction(
  '[Data] Update Homepage1Data',
  props<{ id: number, updatedData: any }>()
);

export const updateHomepage1DataSuccess = createAction(
  '[Data] Update Homepage1Data Success',
  props<{ updatedData: Homepage1Model }>()
);
export const updateHomepage1DataFailure = createAction(
  '[Data] Update Homepage1Data Failure',
  props<{ error: string }>()
);

// Update Images
export const updateHomepage1Images = createAction(
  '[Data] Update Homepage1Images',
  props<{ id: number, imageData: FormData }>()
);

export const updateHomepage1ImagesSuccess = createAction(
  '[Data] Update Homepage1Images Success',
  props<{ updatedData: any }>()
);

export const updateHomepage1ImagesFailure = createAction(
  '[Data] Update Homepage1Images Failure',
  props<{ error: string }>()
);

// Delete Data
export const deleteHomepage1Data = createAction(
  '[Data] Delete Homepage1Data',
  props<{ id: string }>()
);
export const deleteHomepage1Success = createAction(
  '[Data] Delete Homepage1Data Success',
  props<{ id: string }>()
);
export const deleteHomepage1Failure = createAction(
  '[Data] Delete Homepage1Data Failure',
  props<{ error: string }>()
);