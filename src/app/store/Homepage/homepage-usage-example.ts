// // Homepage Store Usage Example
// // This file demonstrates how to use the Homepage store in components

// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Store } from '@ngrx/store';
// import { Observable, Subject } from 'rxjs';
// import { takeUntil } from 'rxjs/operators';

// // Import actions
// import {
//   fetchHomepageData,
//   updateHomepageData,
//   fetchFeaturedProducts,
//   fetchCategories,
//   fetchExperienceCards,
//   fetchGalleryProducts,
//   fetchFeatures,
//   fetchProducts,
//   fetchStatistics
// } from './homepage.action';

// // Import selectors
// import {
//   selectHomepageData,
//   selectHomepageLoading,
//   selectHomepageError,
//   selectFeaturedProducts,
//   selectCategories,
//   selectExperienceCards,
//   selectGalleryProducts,
//   selectFeatures,
//   selectProducts,
//   selectStatistics,
//   selectHeroSection,
//   selectFeaturedSection,
//   selectCategoriesSection,
//   selectExperienceSection,
//   selectGallerySection,
//   selectFeaturesSection,
//   selectProductsSection,
//   selectStatsSection,
//   selectWhyChooseSection,
//   selectArtisanSection,
//   selectNewsletterSection
// } from './homepage-selector';

// // Import models
// import {
//   HomepageModel,
//   FeaturedProductModel,
//   CategoryItemModel,
//   ExperienceCardModel,
//   GalleryProductModel,
//   FeatureItemModel,
//   ProductItemModel,
//   StatisticModel
// } from './homepage.model';
// import { RootReducerState } from '../index';

// @Component({
//   selector: 'app-homepage-example',
//   template: `
//     <div class="homepage-container">
//       <!-- Loading State -->
//       <div *ngIf="loading$ | async" class="loading">
//         Loading homepage content...
//       </div>

//       <!-- Error State -->
//       <div *ngIf="error$ | async as error" class="error">
//         Error: {{ error }}
//       </div>

//       <!-- Hero Section -->
//       <section *ngIf="heroSection$ | async as hero" class="hero">
//         <h1>{{ hero.title }}</h1>
//         <p>{{ hero.subtitle }}</p>
//         <a [href]="hero.primaryCta" class="btn primary">{{ hero.primaryButton }}</a>
//         <a [href]="hero.secondaryCta" class="btn secondary">{{ hero.secondaryButton }}</a>
//         <img [src]="hero.backgroundImage" alt="Hero Background" />
//       </section>

//       <!-- Featured Products -->
//       <section *ngIf="featuredProducts$ | async as products" class="featured">
//         <div *ngFor="let product of products" class="featured-product">
//           <h3>{{ product.name }}</h3>
//           <p>{{ product.description }}</p>
//           <img [src]="product.image" [alt]="product.name" />
//           <span class="price">{{ product.price | currency }}</span>
//         </div>
//       </section>

//       <!-- Categories -->
//       <section *ngIf="categories$ | async as categories" class="categories">
//         <div *ngFor="let category of categories" class="category">
//           <h3>{{ category.name }}</h3>
//           <p>{{ category.description }}</p>
//           <img [src]="category.image" [alt]="category.name" />
//         </div>
//       </section>

//       <!-- Experience Cards -->
//       <section *ngIf="experienceCards$ | async as cards" class="experience-cards">
//         <div *ngFor="let card of cards" class="experience-card">
//           <h3>{{ card.title }}</h3>
//           <p>{{ card.description }}</p>
//           <img [src]="card.image" [alt]="card.title" />
//         </div>
//       </section>

//       <!-- Newsletter Section -->
//       <section *ngIf="newsletterSection$ | async as newsletter" class="newsletter">
//         <h2>{{ newsletter.title }}</h2>
//         <p>{{ newsletter.text }}</p>
//       </section>
//
//       <!-- Stats Section -->
//       <section *ngIf="statsSection$ | async as stats" class="stats">
//         <div *ngFor="let stat of stats.items" class="stat-item">
//           <span class="number">{{ stat.number }}</span>
//           <span class="label">{{ stat.label }}</span>
//         </div>
//       </section>
//     </div>
//   `
// })
// export class HomepageExampleComponent implements OnInit, OnDestroy {
//   private destroy$ = new Subject<void>();

//   // Observables for template
//   homepageData$: Observable<any>;
//   loading$: Observable<boolean>;
//   error$: Observable<any>;
//   featuredProducts$: Observable<FeaturedProductModel[]>;
//   categories$: Observable<CategoryItemModel[]>;
//   experienceCards$: Observable<ExperienceCardModel[]>;
//   galleryProducts$: Observable<GalleryProductModel[]>;
//   features$: Observable<FeatureItemModel[]>;
//   products$: Observable<ProductItemModel[]>;
//   statistics$: Observable<StatisticModel[]>;
//   heroSection$: Observable<any>;
//   featuredSection$: Observable<any>;
//   categoriesSection$: Observable<any>;
//   experienceSection$: Observable<any>;
//   gallerySection$: Observable<any>;
//   featuresSection$: Observable<any>;
//   productsSection$: Observable<any>;
//   statsSection$: Observable<any>;
//   whyChooseSection$: Observable<any>;
//   artisanSection$: Observable<any>;
//   newsletterSection$: Observable<any>;

//   constructor(private store: Store<RootReducerState>) {
//     // Initialize observables
//     this.homepageData$ = this.store.select(selectHomepageData);
//     this.loading$ = this.store.select(selectHomepageLoading);
//     this.error$ = this.store.select(selectHomepageError);
//     this.featuredProducts$ = this.store.select(selectFeaturedProducts);
//     this.categories$ = this.store.select(selectCategories);
//     this.experienceCards$ = this.store.select(selectExperienceCards);
//     this.galleryProducts$ = this.store.select(selectGalleryProducts);
//     this.features$ = this.store.select(selectFeatures);
//     this.products$ = this.store.select(selectProducts);
//     this.statistics$ = this.store.select(selectStatistics);
//     this.heroSection$ = this.store.select(selectHeroSection);
//     this.featuredSection$ = this.store.select(selectFeaturedSection);
//     this.categoriesSection$ = this.store.select(selectCategoriesSection);
//     this.experienceSection$ = this.store.select(selectExperienceSection);
//     this.gallerySection$ = this.store.select(selectGallerySection);
//     this.featuresSection$ = this.store.select(selectFeaturesSection);
//     this.productsSection$ = this.store.select(selectProductsSection);
//     this.statsSection$ = this.store.select(selectStatsSection);
//     this.whyChooseSection$ = this.store.select(selectWhyChooseSection);
//     this.artisanSection$ = this.store.select(selectArtisanSection);
//     this.newsletterSection$ = this.store.select(selectNewsletterSection);
//   }

//   ngOnInit(): void {
//     // Fetch all homepage data on component initialization
//     this.loadHomepageData();

//     // Subscribe to homepage data changes
//     this.homepageData$
//       .pipe(takeUntil(this.destroy$))
//       .subscribe(data => {
//         console.log('Homepage data updated:', data);
//       });
//   }

//   ngOnDestroy(): void {
//     this.destroy$.next();
//     this.destroy$.complete();
//   }

//   /**
//    * Load all homepage data
//    */
//   loadHomepageData(): void {
//     this.store.dispatch(fetchHomepageData());
//     this.store.dispatch(fetchFeaturedProducts());
//     this.store.dispatch(fetchCategories());
//     this.store.dispatch(fetchExperienceCards());
//     this.store.dispatch(fetchGalleryProducts());
//     this.store.dispatch(fetchFeatures());
//     this.store.dispatch(fetchProducts());
//     this.store.dispatch(fetchStatistics());
//   }

//   /**
//    * Update homepage data
//    */
//   updateHomepage(id: number, updatedData: Partial<HomepageModel>): void {
//     this.store.dispatch(updateHomepageData({ id, updatedData }));
//   }

//   /**
//    * Refresh specific section
//    */
//   refreshFeaturedProducts(): void {
//     this.store.dispatch(fetchFeaturedProducts());
//   }

//   refreshCategories(): void {
//     this.store.dispatch(fetchCategories());
//   }

//   refreshExperienceCards(): void {
//     this.store.dispatch(fetchExperienceCards());
//   }

//   refreshGalleryProducts(): void {
//     this.store.dispatch(fetchGalleryProducts());
//   }

//   refreshFeatures(): void {
//     this.store.dispatch(fetchFeatures());
//   }

//   refreshProducts(): void {
//     this.store.dispatch(fetchProducts());
//   }

//   refreshStatistics(): void {
//     this.store.dispatch(fetchStatistics());
//   }
// }

// /*
//   USAGE INSTRUCTIONS:
  
//   1. Import this component in your module
//   2. Add HomepageEffects to your EffectsModule.forRoot() array
//   3. Make sure HomepageService is provided
//   4. Use the component in your templates
  
//   EXAMPLE SERVICE INJECTION:
//   constructor(
//     private store: Store<RootReducerState>,
//     private homepageService: HomepageService
//   ) {}
  
//   EXAMPLE DISPATCH ACTIONS:
//   // Fetch data
//   this.store.dispatch(fetchHomepageData());
  
//   // Update data
//   this.store.dispatch(updateHomepageData({ 
//     id: 1, 
//     updatedData: { heroTitle: 'New Title' } 
//   }));
  
//   // Fetch specific sections
//   this.store.dispatch(fetchFeaturedProducts());
//   this.store.dispatch(fetchCategories());
//   this.store.dispatch(fetchExperienceCards());
  
//   // Upload images
//   const formData = new FormData();
//   formData.append('heroImage', file);
//   this.store.dispatch(updateHomepageImages({ id: 1, imageData: formData }));
  
//   EXAMPLE SELECTORS:
//   // Get specific data
//   const heroData$ = this.store.select(selectHeroSection);
//   const isLoading$ = this.store.select(selectHomepageLoading);
//   const error$ = this.store.select(selectHomepageError);
// */