import { createAction, props } from '@ngrx/store';
import { FavoriteModel } from './favorite.model';


// fetch favorite data
export const fetchfavoriteData = createAction('[Data] Fetch favorite Table Data');
export const fetchfavoriteSuccess = createAction('[Data] Fetch favorite Data Success', props<{ fetchedFavoriteData: any[] }>());
export const fetchfavoriteFailure = createAction('[Data] Fetch favorite Data Failure', props<{ error: string }>());

// fetch favorite data by user
export const fetchfavoriteDataByUser = createAction('[Data] Fetch favorite Table Data');
export const fetchfavoriteByUserSuccess = createAction('[Data] Fetch favorite by user Data Success', props<{ fetchedFavoriteData: any[] }>());
export const fetchfavoriteByUserFailure = createAction('[Data] Fetch favorite by user Data Failure', props<{ error: string }>());

// Add Data
export const addfavoriteData = createAction(
  '[Data] Add favoriteData',
  props<{ newData: any }>()
);
export const addfavoriteDataSuccess = createAction(
  '[Data] Add favoriteData Success',
  props<{ newData: any }>()
);
export const addfavoriteDataFailure = createAction(
  '[Data] Add favoriteData Failure',
  props<{ error: string }>()
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



export const checkIsFavorite = createAction(
  '[Favorite] Check Is Favorite',
  props<{ articleId: number }>()
);

export const checkIsFavoriteSuccess = createAction(
  '[Favorite] Check Is Favorite Success',
  props<{ articleId: number; isFavorite: boolean }>()
);

export const checkIsFavoriteFailure = createAction(
  '[Favorite] Check Is Favorite Failure',
  props<{ error: any }>()
);


// Update Data
export const updatefavoriteData = createAction(
  '[Data] Update favoriteData',
  props<{ id: number, updatedData: any }>()
);

export const updatefavoriteDataSuccess = createAction(
  '[Data] Update favoriteData Success',
  props<{ updatedData: FavoriteModel }>()
);
export const updatefavoriteDataFailure = createAction(
  '[Data] Update favoriteData Failure',
  props<{ error: string }>()
);

// Delete Data
export const deletefavoriteData = createAction(
  '[Data] Delete favoriteData',
  props<{ id: string }>()
);



export const deletefavoriteSuccess = createAction(
  '[Data] Delete favoriteData Success',
  props<{ id: string }>()
);

export const deletefavoriteFailure = createAction(
  '[Data] Delete favoriteData Failure',
  props<{ error: string }>()
);
