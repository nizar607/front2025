import { createAction, props } from '@ngrx/store';
import { ArticleModel } from './article.model';


// fetch article data
export const fetcharticleData = createAction('[Data] Fetch article Table Data');
export const fetcharticleSuccess = createAction('[Data] Fetch article Data Success', props<{ fetchedArticleData: any[] }>());
export const fetcharticleFailure = createAction('[Data] Fetch article Data Failure', props<{ error: string }>());

// Add Data
export const addarticleData = createAction(
  '[Data] Add articleData',
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

export const addarticleDataSuccess = createAction(
  '[Data] Add articleData Success',
  props<{ newData: any }>()
);
export const addarticleDataFailure = createAction(
  '[Data] Add articleData Failure',
  props<{ error: string }>()
);


// Update Data
export const updatearticleData = createAction(
  '[Data] Update articleData',
  props<{ id: number, updatedData: any }>()
);

export const updatearticleDataSuccess = createAction(
  '[Data] Update articleData Success',
  props<{ updatedData: ArticleModel }>()
);
export const updatearticleDataFailure = createAction(
  '[Data] Update articleData Failure',
  props<{ error: string }>()
);

// Delete Data
export const deletearticleData = createAction(
  '[Data] Delete articleData',
  props<{ id: string }>()
);
export const deletearticleSuccess = createAction(
  '[Data] Delete articleData Success',
  props<{ id: string }>()
);
export const deletearticleFailure = createAction(
  '[Data] Delete articleData Failure',
  props<{ error: string }>()
);
