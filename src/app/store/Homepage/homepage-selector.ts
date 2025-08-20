import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HomepageState } from './homepage.reducer';

export const selectHomepageState = createFeatureSelector<HomepageState>('HomepageList');

// Homepage Data Selectors
export const selectHomepageData = createSelector(
    selectHomepageState,
    (state: HomepageState) => state.homepageData
);

export const selectHomepageLoading = createSelector(
    selectHomepageState,
    (state: HomepageState) => state.loading
);
 
export const selectHomepageError = createSelector(
    selectHomepageState,
    (state: HomepageState) => state.error
);

// Featured Products Selectors
export const selectFeaturedProducts = createSelector(
    selectHomepageState,
    (state: HomepageState) => state.featuredProducts
);

// Categories Selectors
export const selectCategories = createSelector(
    selectHomepageState,
    (state: HomepageState) => state.categories
);

// Experience Cards Selectors
export const selectExperienceCards = createSelector(
    selectHomepageState,
    (state: HomepageState) => state.experienceCards
);

// Gallery Products Selectors
export const selectGalleryProducts = createSelector(
    selectHomepageState,
    (state: HomepageState) => state.galleryProducts
);

// Features Selectors
export const selectFeatures = createSelector(
    selectHomepageState,
    (state: HomepageState) => state.features
);

// Products Selectors
export const selectProducts = createSelector(
    selectHomepageState,
    (state: HomepageState) => state.products
);

// Statistics Selectors
export const selectStatistics = createSelector(
    selectHomepageState,
    (state: HomepageState) => state.statistics
);

// Combined Selectors
export const selectHomepageContent = createSelector(
    selectHomepageData,
    selectFeaturedProducts,
    selectCategories,
    selectExperienceCards,
    selectGalleryProducts,
    selectFeatures,
    selectProducts,
    selectStatistics,
    (homepageData, featuredProducts, categories, experienceCards, galleryProducts, features, products, statistics) => ({
        homepageData,
        featuredProducts,
        categories,
        experienceCards,
        galleryProducts,
        features,
        products,
        statistics
    })
);

// Hero Section Selectors
export const selectHeroSection = createSelector(
    selectHomepageData,
    (homepageData) => homepageData?.hero || null
);

// Featured Section Selectors
export const selectFeaturedSection = createSelector(
    selectHomepageData,
    (homepageData) => homepageData?.featured || null
);

// Categories Section Selectors
export const selectCategoriesSection = createSelector(
    selectHomepageData,
    (homepageData) => homepageData?.categories || null
);

// Experience Section Selectors
export const selectExperienceSection = createSelector(
    selectHomepageData,
    (homepageData) => homepageData?.experience || null
);

// Gallery Section Selectors
export const selectGallerySection = createSelector(
    selectHomepageData,
    (homepageData) => homepageData?.gallery || null
);

// Features Section Selectors
export const selectFeaturesSection = createSelector(
    selectHomepageData,
    (homepageData) => homepageData?.features || null
);

// Products Section Selectors
export const selectProductsSection = createSelector(
    selectHomepageData,
    (homepageData) => homepageData?.products || null
);

// Stats Section Selectors
export const selectStatsSection = createSelector(
    selectHomepageData,
    (homepageData) => homepageData?.stats || null
);

// Why Choose Section Selectors
export const selectWhyChooseSection = createSelector(
    selectHomepageData,
    (homepageData) => homepageData?.whyChoose || null
);

// Artisan Section Selectors
export const selectArtisanSection = createSelector(
    selectHomepageData,
    (homepageData) => homepageData?.artisan || null
);

// Newsletter Section Selectors
export const selectNewsletterSection = createSelector(
    selectHomepageData,
    (homepageData) => homepageData?.newsletter || null
);