import { createAction, props } from '@ngrx/store';
import { CategoryModel } from './category.model';


// fetch category data
export const fetchcategoryData = createAction('[Data] Fetch category Table Data');
export const fetchcategorySuccess = createAction('[Data] Fetch category Data Success', props<{ fetchedCategoryData: any[] }>());
export const fetchcategoryFailure = createAction('[Data] Fetch category Data Failure', props<{ error: string }>());

// Add Data
export const addcategoryData = createAction(
  '[Data] Add categoryData',
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

export const addcategoryDataSuccess = createAction(
  '[Data] Add categoryData Success',
  props<{ newData: any }>()
);
export const addcategoryDataFailure = createAction(
  '[Data] Add categoryData Failure',
  props<{ error: string }>()
);


// Update Data
export const updatecategoryData = createAction(
  '[Data] Update categoryData',
  props<{ id: number, updatedData: any }>()
);

export const updatecategoryDataSuccess = createAction(
  '[Data] Update categoryData Success',
  props<{ updatedData: any }>()
);
export const updatecategoryDataFailure = createAction(
  '[Data] Update categoryData Failure',
  props<{ error: string }>()
);

// Delete Data
export const deletecategoryData = createAction(
  '[Data] Delete categoryData',
  props<{ id: string }>()
);
export const deletecategorySuccess = createAction(
  '[Data] Delete categoryData Success',
  props<{ id: string }>()
);
export const deletecategoryFailure = createAction(
  '[Data] Delete categoryData Failure',
  props<{ error: string }>()
);
