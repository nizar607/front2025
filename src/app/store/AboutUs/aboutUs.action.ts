import { createAction, props } from '@ngrx/store';
import { AboutUsModel } from './aboutUs.model';


// fetch aboutus data
export const fetchaboutusData = createAction('[Data] Fetch aboutus Table Data');
export const fetchaboutusSuccess = createAction('[Data] Fetch aboutus Data Success', props<{ fetchedAboutUsData: any }>());
export const fetchaboutusFailure = createAction('[Data] Fetch aboutus Data Failure', props<{ error: string }>());

// Add Data
export const addaboutusData = createAction(
  '[Data] Add aboutusData',
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

export const addaboutusDataSuccess = createAction(
  '[Data] Add aboutusData Success',
  props<{ newData: any }>()
);
export const addaboutusDataFailure = createAction(
  '[Data] Add aboutusData Failure',
  props<{ error: string }>()
);


// Update Data
export const updateaboutusData = createAction(
  '[Data] Update aboutusData',
  props<{ id: number, updatedData: any }>()
);

export const updateaboutusDataSuccess = createAction(
  '[Data] Update aboutusData Success',
  props<{ updatedData: AboutUsModel }>()
);
export const updateaboutusDataFailure = createAction(
  '[Data] Update aboutusData Failure',
  props<{ error: string }>()
);

// Delete Data
export const deleteaboutusData = createAction(
  '[Data] Delete aboutusData',
  props<{ id: string }>()
);
export const deleteaboutusSuccess = createAction(
  '[Data] Delete aboutusData Success',
  props<{ id: string }>()
);
export const deleteaboutusFailure = createAction(
  '[Data] Delete aboutusData Failure',
  props<{ error: string }>()
);
