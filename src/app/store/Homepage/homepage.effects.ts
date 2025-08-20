import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HomepageService } from 'src/app/core/services/homepage/homepage.service';
import * as HomepageActions from './homepage.action';
import {
  addHomepageData,
  addHomepageDataFailure,
  addHomepageDataSuccess,
  deleteHomepageData,
  deleteHomepageFailure,
  deleteHomepageSuccess,
  fetchHomepageData,
  fetchHomepageFailure,
  fetchHomepageSuccess,
  updateHomepageData,
  updateHomepageDataFailure,
  updateHomepageDataSuccess,
  updateHomepageImages,
  updateHomepageImagesFailure,
  updateHomepageImagesSuccess,
  uploadHomepageImage,
  uploadHomepageImageSuccess,
  uploadHomepageImageFailure,
  fetchStatistics,
  fetchStatisticsSuccess,
  fetchStatisticsFailure
} from './homepage.action';

@Injectable()
export class HomepageEffects {

  // Homepage Data Effects
  fetchData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchHomepageData),
      mergeMap(() =>
        this.homepageService.fetchData().pipe(
          map((homepageData) => fetchHomepageSuccess({ fetchedHomepageData: homepageData })),
          catchError((error) =>
            of(fetchHomepageFailure({ error }))
          )
        )
      )
    )
  );

  addData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addHomepageData),
      mergeMap(({ newData }) =>
        this.homepageService.addData(newData).pipe(
          map((addedHomepage: any) => addHomepageDataSuccess({ newData: addedHomepage })),
          catchError((error) => of(addHomepageDataFailure({ error })))
        )
      )
    )
  );

  updateData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateHomepageData),
      mergeMap(({ id, updatedData }) =>
        this.homepageService.updateData(id, updatedData).pipe(
          map((newUpdatedData: any) => updateHomepageDataSuccess({ updatedData: newUpdatedData })),
          catchError((error) => of(updateHomepageDataFailure({ error })))
        )
      )
    )
  );

  updateImages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateHomepageImages),
      mergeMap(({ id, imageData }) =>
        this.homepageService.updateImages(id, imageData).pipe(
          map((updatedData: any) => updateHomepageImagesSuccess({ updatedData })),
          catchError((error) => of(updateHomepageImagesFailure({ error })))
        )
      )
    )
  );

  uploadImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(uploadHomepageImage),
      mergeMap(({ newData }) =>
        this.homepageService.uploadImage(newData).pipe(
          map((uploadedData: any) => uploadHomepageImageSuccess({ newData: uploadedData })),
          catchError((error) => of(uploadHomepageImageFailure({ error })))
        )
      )
    )
  );

  deleteData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteHomepageData),
      mergeMap(({ id }) =>
        this.homepageService.deleteData(id).pipe(
          map(() => deleteHomepageSuccess({ id })),
          catchError((error) => of(deleteHomepageFailure({ error })))
        )
      )
    )
  );

  // Fetch Featured Products
  fetchFeaturedProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomepageActions.fetchFeaturedProducts),
      switchMap(() =>
        this.homepageService.getFeaturedProducts().pipe(
          map(featuredProducts => HomepageActions.fetchFeaturedProductsSuccess({ featuredProducts })),
          catchError(error => of(HomepageActions.fetchFeaturedProductsFailure({ error: error.message })))
        )
      )
    )
  );

  // Fetch Categories
  fetchCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomepageActions.fetchCategories),
      switchMap(() =>
        this.homepageService.getCategories().pipe(
          map(categories => HomepageActions.fetchCategoriesSuccess({ categories })),
          catchError(error => of(HomepageActions.fetchCategoriesFailure({ error: error.message })))
        )
      )
    )
  );

  // Fetch Experience Cards
  fetchExperienceCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomepageActions.fetchExperienceCards),
      switchMap(() =>
        this.homepageService.getExperienceCards().pipe(
          map(experienceCards => HomepageActions.fetchExperienceCardsSuccess({ experienceCards })),
          catchError(error => of(HomepageActions.fetchExperienceCardsFailure({ error: error.message })))
        )
      )
    )
  );

  // Fetch Gallery Products
  fetchGalleryProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomepageActions.fetchGalleryProducts),
      switchMap(() =>
        this.homepageService.getGalleryProducts().pipe(
          map(galleryProducts => HomepageActions.fetchGalleryProductsSuccess({ galleryProducts })),
          catchError(error => of(HomepageActions.fetchGalleryProductsFailure({ error: error.message })))
        )
      )
    )
  );

  // Fetch Features
  fetchFeatures$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomepageActions.fetchFeatures),
      switchMap(() =>
        this.homepageService.getFeatures().pipe(
          map(features => HomepageActions.fetchFeaturesSuccess({ features })),
          catchError(error => of(HomepageActions.fetchFeaturesFailure({ error: error.message })))
        )
      )
    )
  );

  // Fetch Products
  fetchProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomepageActions.fetchProducts),
      switchMap(() =>
        this.homepageService.getProducts().pipe(
          map(products => HomepageActions.fetchProductsSuccess({ products })),
          catchError(error => of(HomepageActions.fetchProductsFailure({ error: error.message })))
        )
      )
    )
  );

  // Statistics Effects
  fetchStatistics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchStatistics),
      mergeMap(() =>
        this.homepageService.getStatistics().pipe(
          map((statistics) => fetchStatisticsSuccess({ statistics })),
          catchError((error) => of(fetchStatisticsFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private homepageService: HomepageService
  ) {
  }
}