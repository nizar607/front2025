import { createAction, props } from '@ngrx/store';
import { CategoryItemModel, ExperienceCardModel, FeaturedProductModel, FeatureItemModel, GalleryProductModel, HomepageModel, ProductItemModel, StatisticModel } from './homepage.model';

// Fetch homepage data
export const fetchHomepageData = createAction('[Data] Fetch Homepage Table Data');
export const fetchHomepageSuccess = createAction('[Data] Fetch Homepage Data Success', props<{ fetchedHomepageData: any }>());
export const fetchHomepageFailure = createAction('[Data] Fetch Homepage Data Failure', props<{ error: string }>());

// Add Data
export const addHomepageData = createAction(
  '[Data] Add HomepageData',
  props<{ newData: any }>()
);

export const uploadHomepageImage = createAction(
  '[Data] Homepage Image Uploading',
  props<{ newData: FormData }>()
);

export const uploadHomepageImageSuccess = createAction(
  '[Data] Homepage Image Upload Success',
  props<{ newData: any }>()
);

export const uploadHomepageImageFailure = createAction(
  '[Data] Homepage Image Upload Failure',
  props<{ error: string }>()
);

export const addHomepageDataSuccess = createAction(
  '[Data] Add HomepageData Success',
  props<{ newData: any }>()
);
export const addHomepageDataFailure = createAction(
  '[Data] Add HomepageData Failure',
  props<{ error: string }>()
);

// Update Data
export const updateHomepageData = createAction(
  '[Data] Update HomepageData',
  props<{ id: number, updatedData: any }>()
);

export const updateHomepageDataSuccess = createAction(
  '[Data] Update HomepageData Success',
  props<{ updatedData: HomepageModel }>()
);
export const updateHomepageDataFailure = createAction(
  '[Data] Update HomepageData Failure',
  props<{ error: string }>()
);

// Update Images
export const updateHomepageImages = createAction(
  '[Data] Update HomepageImages',
  props<{ id: number, imageData: FormData }>()
);

export const updateHomepageImagesSuccess = createAction(
  '[Data] Update HomepageImages Success',
  props<{ updatedData: any }>()
);

export const updateHomepageImagesFailure = createAction(
  '[Data] Update HomepageImages Failure',
  props<{ error: string }>()
);

// Delete Data
export const deleteHomepageData = createAction(
  '[Data] Delete HomepageData',
  props<{ id: string }>()
);
export const deleteHomepageSuccess = createAction(
  '[Data] Delete HomepageData Success',
  props<{ id: string }>()
);
export const deleteHomepageFailure = createAction(
  '[Data] Delete HomepageData Failure',
  props<{ error: string }>()
);

// Fetch Featured Products
export const fetchFeaturedProducts = createAction(
  '[Homepage] Fetch Featured Products'
);

export const fetchFeaturedProductsSuccess = createAction(
  '[Homepage] Fetch Featured Products Success',
  props<{ featuredProducts: FeaturedProductModel[] }>()
);

export const fetchFeaturedProductsFailure = createAction(
  '[Homepage] Fetch Featured Products Failure',
  props<{ error: string }>()
);

// Fetch Categories
export const fetchCategories = createAction(
  '[Homepage] Fetch Categories'
);

export const fetchCategoriesSuccess = createAction(
  '[Homepage] Fetch Categories Success',
  props<{ categories: CategoryItemModel[] }>()
);

export const fetchCategoriesFailure = createAction(
  '[Homepage] Fetch Categories Failure',
  props<{ error: string }>()
);

// Fetch Experience Cards
export const fetchExperienceCards = createAction(
  '[Homepage] Fetch Experience Cards'
);

export const fetchExperienceCardsSuccess = createAction(
  '[Homepage] Fetch Experience Cards Success',
  props<{ experienceCards: ExperienceCardModel[] }>()
);

export const fetchExperienceCardsFailure = createAction(
  '[Homepage] Fetch Experience Cards Failure',
  props<{ error: string }>()
);

// Fetch Gallery Products
export const fetchGalleryProducts = createAction(
  '[Homepage] Fetch Gallery Products'
);

export const fetchGalleryProductsSuccess = createAction(
  '[Homepage] Fetch Gallery Products Success',
  props<{ galleryProducts: GalleryProductModel[] }>()
);

export const fetchGalleryProductsFailure = createAction(
  '[Homepage] Fetch Gallery Products Failure',
  props<{ error: string }>()
);

// Fetch Features
export const fetchFeatures = createAction(
  '[Homepage] Fetch Features'
);

export const fetchFeaturesSuccess = createAction(
  '[Homepage] Fetch Features Success',
  props<{ features: FeatureItemModel[] }>()
);

export const fetchFeaturesFailure = createAction(
  '[Homepage] Fetch Features Failure',
  props<{ error: string }>()
);

// Fetch Products
export const fetchProducts = createAction(
  '[Homepage] Fetch Products'
);

export const fetchProductsSuccess = createAction(
  '[Homepage] Fetch Products Success',
  props<{ products: ProductItemModel[] }>()
);

export const fetchProductsFailure = createAction(
  '[Homepage] Fetch Products Failure',
  props<{ error: string }>()
);

// Fetch Statistics
export const fetchStatistics = createAction(
  '[Homepage] Fetch Statistics'
);

export const fetchStatisticsSuccess = createAction(
  '[Homepage] Fetch Statistics Success',
  props<{ statistics: StatisticModel[] }>()
);

export const fetchStatisticsFailure = createAction(
  '[Homepage] Fetch Statistics Failure',
  props<{ error: string }>()
);