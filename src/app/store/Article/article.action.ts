import { createAction, props } from '@ngrx/store';
import { ArticleModel } from './article.model';


// fetch article data
export const fetcharticleData = createAction('[Data] Fetch article Table Data');
export const fetchfavoriteArticlesByUserData = createAction('[Data] Fetch favorite article by user Data');
export const fetcharticleSuccess = createAction('[Data] Fetch article Data Success', props<{ fetchedArticleData: any[] }>());
export const fetcharticleFailure = createAction('[Data] Fetch article Data Failure', props<{ error: string }>());

//fetch article by id
export const fetchSingleArticleData = createAction('[Data] Fetch single article by id Data', props<{ id: number }>());
export const fetchSingleArticleSuccess = createAction('[Data] Fetch single article by id Data Success', props<{ fetchedSingleArticleData: any }>());
export const fetchSingleArticleFailure = createAction('[Data] Fetch single article by id Data Failure', props<{ error: string }>());

// search article data
export const searcharticleData = createAction('[Data] Search article Table Data', props<{ searchInput: string, minPrice: number, maxPrice: number, categories: number[] }>());
export const searcharticleSuccess = createAction('[Data] Search article Data Success', props<{ fetchedArticleData: any[] }>());
export const searcharticleFailure = createAction('[Data] Search article Data Failure', props<{ error: string }>());


// search article by categorie
// export const searcharticleByCategoryData = createAction('[Data] Fetch article Table Data', props<{ searchValue: string }>());
// export const searcharticleByCategorySuccess = createAction('[Data] Fetch article Data Success', props<{ fetchedArticleData: any[] }>());
// export const searcharticleByCategoryFailure = createAction('[Data] Fetch article Data Failure', props<{ error: string }>());

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

export const deletefavoriteByArticleData = createAction(
  '[Data] Delete favoriteData by article',
  props<{ id: string }>()
);

export const deleteFavoriteArticleSuccess = createAction(
  '[Data] Delete favorite article Success',
  props<{ id: string }>()
);

export const deleteFavoriteArticleFailure = createAction(
  '[Data] Delete favorite article Failure',
  props<{ error: string }>()
);

export const deletearticleFailure = createAction(
  '[Data] Delete articleData Failure',
  props<{ error: string }>()
);

export const addfavoriteByArticleData = createAction(
  '[Data] Add favoriteData',
  props<{ newData: any }>()
);
export const addfavoriteByArticleDataSuccess = createAction(
  '[Data] Add favoriteData Success',
  props<{ newData: any }>()
);
export const addfavoriteByArticleDataFailure = createAction(
  '[Data] Add favoriteData Failure',
  props<{ error: string }>()
);

// Add to Cart
export const addToCartData = createAction(
  '[Data] Add to Cart',
  props<{ articleId: number, quantity: number }>()
);

export const addToCartSuccess = createAction(
  '[Data] Add to Cart Success',
  props<{ updatedArticle: any }>()
);

export const addToCartFailure = createAction(
  '[Data] Add to Cart Failure',
  props<{ error: string }>()
);

// Remove from Cart
export const removeFromCartData = createAction(
  '[Data] Remove from Cart',
  props<{ articleId: number }>()
);

export const removeFromCartSuccess = createAction(
  '[Data] Remove from Cart Success',
  props<{ updatedArticle: any }>()
);

export const removeFromCartFailure = createAction(
  '[Data] Remove from Cart Failure',
  props<{ error: string }>()
);

// Remove Item from Cart by Article ID
export const removeItemFromCartByArticleId = createAction(
  '[Article] Remove Item from Cart by Article ID',
  props<{ articleId: number }>()
);

export const removeItemFromCartByArticleIdSuccess = createAction(
  '[Article] Remove Item from Cart by Article ID Success',
  props<{ updatedArticle: any }>()
);

export const removeItemFromCartByArticleIdFailure = createAction(
  '[Article] Remove Item from Cart by Article ID Failure',
  props<{ error: string }>()
);
