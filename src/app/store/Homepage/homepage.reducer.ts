import { Action, createReducer, on } from '@ngrx/store';
import {
  addHomepageDataSuccess,
  deleteHomepageSuccess,
  fetchHomepageData,
  fetchHomepageFailure,
  fetchHomepageSuccess,
  updateHomepageDataSuccess,
  uploadHomepageImageSuccess,
  fetchFeaturedProducts,
  fetchFeaturedProductsSuccess,
  fetchFeaturedProductsFailure,
  fetchCategories,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  fetchExperienceCards,
  fetchExperienceCardsSuccess,
  fetchExperienceCardsFailure,
  fetchGalleryProducts,
  fetchGalleryProductsSuccess,
  fetchGalleryProductsFailure,
  fetchFeatures,
  fetchFeaturesSuccess,
  fetchFeaturesFailure,
  fetchProducts,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchStatistics,
  fetchStatisticsSuccess,
  fetchStatisticsFailure
} from './homepage.action';
import { CategoryItemModel, ExperienceCardModel, FeaturedProductModel, FeatureItemModel, GalleryProductModel, HomepageModel, ProductItemModel, StatisticModel } from './homepage.model';

export interface HomepageState {
  homepageData: HomepageModel | null;
  featuredProducts: FeaturedProductModel[];
  categories: CategoryItemModel[];
  experienceCards: ExperienceCardModel[];
  galleryProducts: GalleryProductModel[];
  features: FeatureItemModel[];
  products: ProductItemModel[];
  statistics: StatisticModel[];
  loading: boolean;
  error: string | null;
}

export const initialState: HomepageState = {
  homepageData: null,
  featuredProducts: [],
  categories: [],
  experienceCards: [],
  galleryProducts: [],
  features: [],
  products: [],
  statistics: [],
  loading: false,
  error: null
};

export const HomepageReducer = createReducer(
  initialState,
  
  // Homepage Data
  on(fetchHomepageData, (state) => {
    return { ...state, loading: true, error: null };
  }),

  on(fetchHomepageSuccess, (state, { fetchedHomepageData }) => {
    console.log('fetchedHomepageData ', fetchedHomepageData);
    return { ...state, homepageData: fetchedHomepageData, loading: false };
  }),

  on(fetchHomepageFailure, (state, { error }) => {
    return { ...state, error, loading: false };
  }),

  on(addHomepageDataSuccess, (state, { newData }) => {
    return { ...state, homepageData: newData, error: null };
  }),

  on(uploadHomepageImageSuccess, (state, { newData }) => {
    console.log('newData ', newData);
    return { ...state, homepageData: newData, error: null };
  }),

  on(updateHomepageDataSuccess, (state, { updatedData }) => {
    console.log('updatedData ', updatedData);
    return {
      ...state,
      homepageData: updatedData,
      error: null
    };
  }),

  on(deleteHomepageSuccess, (state, { id }) => {
    console.log('deleted homepage with id: ', id);
    return { ...state, homepageData: null, error: null };
  }),

  // Featured Products
  on(fetchFeaturedProducts, (state) => {
    return { ...state, loading: true, error: null };
  }),

  on(fetchFeaturedProductsSuccess, (state, { featuredProducts }) => {
    return { ...state, featuredProducts, loading: false };
  }),

  on(fetchFeaturedProductsFailure, (state, { error }) => {
    return { ...state, error, loading: false };
  }),

  // Categories
  on(fetchCategories, (state) => {
    return { ...state, loading: true, error: null };
  }),

  on(fetchCategoriesSuccess, (state, { categories }) => {
    return { ...state, categories, loading: false };
  }),

  on(fetchCategoriesFailure, (state, { error }) => {
    return { ...state, error, loading: false };
  }),

  // Experience Cards
  on(fetchExperienceCards, (state) => {
    return { ...state, loading: true, error: null };
  }),

  on(fetchExperienceCardsSuccess, (state, { experienceCards }) => {
    return { ...state, experienceCards, loading: false };
  }),

  on(fetchExperienceCardsFailure, (state, { error }) => {
    return { ...state, error, loading: false };
  }),

  // Gallery Products
  on(fetchGalleryProducts, (state) => {
    return { ...state, loading: true, error: null };
  }),

  on(fetchGalleryProductsSuccess, (state, { galleryProducts }) => {
    return { ...state, galleryProducts, loading: false };
  }),

  on(fetchGalleryProductsFailure, (state, { error }) => {
    return { ...state, error, loading: false };
  }),

  // Features
  on(fetchFeatures, (state) => {
    return { ...state, loading: true, error: null };
  }),

  on(fetchFeaturesSuccess, (state, { features }) => {
    return { ...state, features, loading: false };
  }),

  on(fetchFeaturesFailure, (state, { error }) => {
    return { ...state, error, loading: false };
  }),

  // Products
  on(fetchProducts, (state) => {
    return { ...state, loading: true, error: null };
  }),

  on(fetchProductsSuccess, (state, { products }) => {
    return { ...state, products, loading: false };
  }),

  on(fetchProductsFailure, (state, { error }) => {
    return { ...state, error, loading: false };
  }),

  // Statistics
  on(fetchStatistics, (state) => {
    return { ...state, loading: true, error: null };
  }),

  on(fetchStatisticsSuccess, (state, { statistics }) => {
    return { ...state, statistics, loading: false };
  }),

  on(fetchStatisticsFailure, (state, { error }) => {
    return { ...state, error, loading: false };
  })
);

// Selector
export function reducer(state: HomepageState | undefined, action: Action) {
  return HomepageReducer(state, action);
}