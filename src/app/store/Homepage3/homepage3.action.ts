import { createAction, props } from '@ngrx/store';
import { Homepage3DTO } from './homepage3.model';

// Homepage3 Data Actions
export const fetchHomepage3Data = createAction('[Homepage3] Fetch Homepage3 Data');
export const fetchHomepage3DataSuccess = createAction(
  '[Homepage3] Fetch Homepage3 Data Success',
  props<{ homepage3Data: any }>()
);
export const fetchHomepage3DataFailure = createAction(
  '[Homepage3] Fetch Homepage3 Data Failure',
  props<{ error: string }>()
);

export const addHomepage3Data = createAction(
  '[Homepage3] Add Homepage3 Data',
  props<{ newData: FormData }>()
);
export const addHomepage3DataSuccess = createAction(
  '[Homepage3] Add Homepage3 Data Success',
  props<{ homepage3Data: any }>()
);
export const addHomepage3DataFailure = createAction(
  '[Homepage3] Add Homepage3 Data Failure',
  props<{ error: string }>()
);

export const updateHomepage3Data = createAction(
  '[Homepage3] Update Homepage3 Data',
  props<{ id: number; updatedData: any }>()
);
export const updateHomepage3DataSuccess = createAction(
  '[Homepage3] Update Homepage3 Data Success',
  props<{ homepage3Data: any }>()
);
export const updateHomepage3DataFailure = createAction(
  '[Homepage3] Update Homepage3 Data Failure',
  props<{ error: string }>()
);

export const updateHomepage3Images = createAction(
  '[Homepage3] Update Homepage3 Images',
  props<{ id: number; imageData: FormData }>()
);
export const updateHomepage3ImagesSuccess = createAction(
  '[Homepage3] Update Homepage3 Images Success',
  props<{ homepage3Data: any }>()
);
export const updateHomepage3ImagesFailure = createAction(
  '[Homepage3] Update Homepage3 Images Failure',
  props<{ error: string }>()
);

export const uploadHomepage3Image = createAction(
  '[Homepage3] Upload Homepage3 Image',
  props<{ imageData: FormData }>()
);
export const uploadHomepage3ImageSuccess = createAction(
  '[Homepage3] Upload Homepage3 Image Success',
  props<{ imageUrl: string }>()
);
export const uploadHomepage3ImageFailure = createAction(
  '[Homepage3] Upload Homepage3 Image Failure',
  props<{ error: string }>()
);

export const deleteHomepage3Data = createAction(
  '[Homepage3] Delete Homepage3 Data',
  props<{ id: string }>()
);
export const deleteHomepage3DataSuccess = createAction(
  '[Homepage3] Delete Homepage3 Data Success',
  props<{ id: string }>()
);
export const deleteHomepage3DataFailure = createAction(
  '[Homepage3] Delete Homepage3 Data Failure',
  props<{ error: string }>()
);

// Featured Products Actions
export const fetchFeaturedProducts = createAction('[Homepage3] Fetch Featured Products');
export const fetchFeaturedProductsSuccess = createAction(
  '[Homepage3] Fetch Featured Products Success',
  props<{ featuredProducts: any[] }>()
);
export const fetchFeaturedProductsFailure = createAction(
  '[Homepage3] Fetch Featured Products Failure',
  props<{ error: string }>()
);

// Categories Actions
export const fetchCategories = createAction('[Homepage3] Fetch Categories');
export const fetchCategoriesSuccess = createAction(
  '[Homepage3] Fetch Categories Success',
  props<{ categories: any[] }>()
);
export const fetchCategoriesFailure = createAction(
  '[Homepage3] Fetch Categories Failure',
  props<{ error: string }>()
);

// Experience Cards Actions
export const fetchExperienceCards = createAction('[Homepage3] Fetch Experience Cards');
export const fetchExperienceCardsSuccess = createAction(
  '[Homepage3] Fetch Experience Cards Success',
  props<{ experienceCards: any[] }>()
);
export const fetchExperienceCardsFailure = createAction(
  '[Homepage3] Fetch Experience Cards Failure',
  props<{ error: string }>()
);

// Gallery Products Actions
export const fetchGalleryProducts = createAction('[Homepage3] Fetch Gallery Products');
export const fetchGalleryProductsSuccess = createAction(
  '[Homepage3] Fetch Gallery Products Success',
  props<{ galleryProducts: any[] }>()
);
export const fetchGalleryProductsFailure = createAction(
  '[Homepage3] Fetch Gallery Products Failure',
  props<{ error: string }>()
);

// Features Actions
export const fetchFeatures = createAction('[Homepage3] Fetch Features');
export const fetchFeaturesSuccess = createAction(
  '[Homepage3] Fetch Features Success',
  props<{ features: any[] }>()
);
export const fetchFeaturesFailure = createAction(
  '[Homepage3] Fetch Features Failure',
  props<{ error: string }>()
);

// Products Actions
export const fetchProducts = createAction('[Homepage3] Fetch Products');
export const fetchProductsSuccess = createAction(
  '[Homepage3] Fetch Products Success',
  props<{ products: any[] }>()
);
export const fetchProductsFailure = createAction(
  '[Homepage3] Fetch Products Failure',
  props<{ error: string }>()
);

// Statistics Actions
export const fetchStatistics = createAction('[Homepage3] Fetch Statistics');
export const fetchStatisticsSuccess = createAction(
  '[Homepage3] Fetch Statistics Success',
  props<{ statistics: any[] }>()
);
export const fetchStatisticsFailure = createAction(
  '[Homepage3] Fetch Statistics Failure',
  props<{ error: string }>()
);