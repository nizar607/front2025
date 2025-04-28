import { createAction, props } from '@ngrx/store';
import { CourtModel } from './court.model';


// fetch court data
export const fetchcourtData = createAction('[Data] Fetch court Table Data');
export const fetchcourtSuccess = createAction('[Data] Fetch court Data Success', props<{ fetchedCourtData: any[] }>());
export const fetchcourtFailure = createAction('[Data] Fetch court Data Failure', props<{ error: string }>());

// Add Data
export const addcourtData = createAction(
  '[Data] Add courtData',
  props<{ newData: FormData }>()
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

export const addcourtDataSuccess = createAction(
  '[Data] Add courtData Success',
  props<{ newData: any }>()
);
export const addcourtDataFailure = createAction(
  '[Data] Add courtData Failure',
  props<{ error: string }>()
);


// Update Data
export const updatecourtData = createAction(
  '[Data] Update courtData',
  props<{ id: string, updatedData: any }>()
);

export const updatecourtDataSuccess = createAction(
  '[Data] Update courtData Success',
  props<{ updatedData: CourtModel }>()
);
export const updatecourtDataFailure = createAction(
  '[Data] Update courtData Failure',
  props<{ error: string }>()
);

// Delete Data
export const deletecourtData = createAction(
  '[Data] Delete courtData',
  props<{ id: string }>()
);
export const deletecourtSuccess = createAction(
  '[Data] Delete courtData Success',
  props<{ id: string }>()
);
export const deletecourtFailure = createAction(
  '[Data] Delete courtData Failure',
  props<{ error: string }>()
);
