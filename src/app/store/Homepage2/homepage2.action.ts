import { createAction, props } from '@ngrx/store';
import { Homepage2Model } from './homepage2.model';

// Fetch homepage2 data
export const fetchHomepage2Data = createAction('[Data] Fetch Homepage2 Table Data');
export const fetchHomepage2Success = createAction('[Data] Fetch Homepage2 Data Success', props<{ fetchedHomepage2Data: any }>());
export const fetchHomepage2Failure = createAction('[Data] Fetch Homepage2 Data Failure', props<{ error: string }>());

// Add Data
export const addHomepage2Data = createAction(
  '[Data] Add Homepage2Data',
  props<{ newData: any }>()
);

export const uploadHomepage2Image = createAction(
  '[Data] Homepage2 Image Uploading',
  props<{ newData: FormData }>()
);

export const uploadHomepage2ImageSuccess = createAction(
  '[Data] Homepage2 Image Upload Success',
  props<{ newData: any }>()
);

export const uploadHomepage2ImageFailure = createAction(
  '[Data] Homepage2 Image Upload Failure',
  props<{ error: string }>()
);

export const addHomepage2DataSuccess = createAction(
  '[Data] Add Homepage2Data Success',
  props<{ newData: any }>()
);
export const addHomepage2DataFailure = createAction(
  '[Data] Add Homepage2Data Failure',
  props<{ error: string }>()
);

// Update Data
export const updateHomepage2Data = createAction(
  '[Data] Update Homepage2Data',
  props<{ id: number, updatedData: any }>()
);

export const updateHomepage2DataSuccess = createAction(
  '[Data] Update Homepage2Data Success',
  props<{ updatedData: Homepage2Model }>()
);
export const updateHomepage2DataFailure = createAction(
  '[Data] Update Homepage2Data Failure',
  props<{ error: string }>()
);

// Update Images
export const updateHomepage2Images = createAction(
  '[Data] Update Homepage2Images',
  props<{ id: number, imageData: FormData }>()
);

export const updateHomepage2ImagesSuccess = createAction(
  '[Data] Update Homepage2Images Success',
  props<{ updatedData: any }>()
);

export const updateHomepage2ImagesFailure = createAction(
  '[Data] Update Homepage2Images Failure',
  props<{ error: string }>()
);

// Delete Data
export const deleteHomepage2Data = createAction(
  '[Data] Delete Homepage2Data',
  props<{ id: string }>()
);
export const deleteHomepage2Success = createAction(
  '[Data] Delete Homepage2Data Success',
  props<{ id: string }>()
);
export const deleteHomepage2Failure = createAction(
  '[Data] Delete Homepage2Data Failure',
  props<{ error: string }>()
);