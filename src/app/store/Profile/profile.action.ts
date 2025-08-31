import {createAction, props} from '@ngrx/store';
import {ProfileModel} from './profile.model';


// fetch profile data
export const fetchprofileData = createAction('[Data] Fetch profile Table Data');
export const fetchprofileSuccess = createAction('[Data] Fetch profile Data Success', props<{
  profiledata: ProfileModel
}>());
export const fetchprofileFailure = createAction('[Data] Fetch profile Data Failure', props<{ error: string }>());

// Add Data
export const addprofileData = createAction(
  '[Data] Add profileData',
  props<{ newData:FormData }>()
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

/*
export const addprofileData = createAction(
    '[Data] Add profileData',
    props<{ profileData : ProfileModel,newData: FormData }>()
);
 */
export const addprofileDataSuccess = createAction(
  '[Data] Add profileData Success',
  props<{ newData: any }>()
);
export const addprofileDataFailure = createAction(
  '[Data] Add profileData Failure',
  props<{ error: string }>()
);


// Update Data
export const updateprofileData = createAction(
  '[Data] Update profileData',
  props<{ updatedData: FormData }>()
);
export const updateprofileDataSuccess = createAction(
  '[Data] Update profileData Success',
  props<{ updatedData: ProfileModel }>()
);
export const updateprofileDataFailure = createAction(
  '[Data] Update profileData Failure',
  props<{ error: string }>()
);

// Delete Data
export const deleteprofileData = createAction(
  '[Data] Delete profileData',
  props<{ id: string }>()
);
export const deleteprofileSuccess = createAction(
  '[Data] Delete profileData Success',
  props<{ id: string }>()
);
export const deleteprofileFailure = createAction(
  '[Data] Delete profileData Failure',
  props<{ error: string }>()
);
