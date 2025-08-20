import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Homepage3Service } from '../../core/services/homepage3/homepage3.service';
import * as Homepage3Actions from './homepage3.action';

@Injectable()
export class Homepage3Effects {
  constructor(
    private actions$: Actions,
    private homepage3Service: Homepage3Service
  ) {}

  // Homepage3 Data Effects
  fetchHomepage3Data$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Homepage3Actions.fetchHomepage3Data),
      mergeMap(() =>
        this.homepage3Service.fetchData().pipe(
          map((homepage3Data) => Homepage3Actions.fetchHomepage3DataSuccess({ homepage3Data })),
          catchError((error) => of(Homepage3Actions.fetchHomepage3DataFailure({ error: error.message })))
        )
      )
    )
  );

  addHomepage3Data$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Homepage3Actions.addHomepage3Data),
      mergeMap((action) =>
        this.homepage3Service.addData(action.newData).pipe(
          map((homepage3Data) => Homepage3Actions.addHomepage3DataSuccess({ homepage3Data })),
          catchError((error) => of(Homepage3Actions.addHomepage3DataFailure({ error: error.message })))
        )
      )
    )
  );

  updateHomepage3Data$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Homepage3Actions.updateHomepage3Data),
      mergeMap((action) =>
        this.homepage3Service.updateData(action.id, action.updatedData).pipe(
          map((homepage3Data) => Homepage3Actions.updateHomepage3DataSuccess({ homepage3Data })),
          catchError((error) => of(Homepage3Actions.updateHomepage3DataFailure({ error: error.message })))
        )
      )
    )
  );

  updateHomepage3Images$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Homepage3Actions.updateHomepage3Images),
      mergeMap((action) =>
        this.homepage3Service.updateImages(action.id, action.imageData).pipe(
          map((homepage3Data) => Homepage3Actions.updateHomepage3ImagesSuccess({ homepage3Data })),
          catchError((error) => of(Homepage3Actions.updateHomepage3ImagesFailure({ error: error.message })))
        )
      )
    )
  );

  uploadHomepage3Image$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Homepage3Actions.uploadHomepage3Image),
      mergeMap((action) =>
        this.homepage3Service.uploadImage(action.imageData).pipe(
          map((response) => Homepage3Actions.uploadHomepage3ImageSuccess({ imageUrl: response.imageUrl })),
          catchError((error) => of(Homepage3Actions.uploadHomepage3ImageFailure({ error: error.message })))
        )
      )
    )
  );

  deleteHomepage3Data$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Homepage3Actions.deleteHomepage3Data),
      mergeMap((action) =>
        this.homepage3Service.deleteData(action.id).pipe(
          map(() => Homepage3Actions.deleteHomepage3DataSuccess({ id: action.id })),
          catchError((error) => of(Homepage3Actions.deleteHomepage3DataFailure({ error: error.message })))
        )
      )
    )
  );

  // Featured Products Effects
  fetchFeaturedProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Homepage3Actions.fetchFeaturedProducts),
      switchMap(() =>
        this.homepage3Service.getFeaturedProducts().pipe(
          map((featuredProducts) => Homepage3Actions.fetchFeaturedProductsSuccess({ featuredProducts })),
          catchError((error) => of(Homepage3Actions.fetchFeaturedProductsFailure({ error: error.message })))
        )
      )
    )
  );

  // Categories Effects
  fetchCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Homepage3Actions.fetchCategories),
      switchMap(() =>
        this.homepage3Service.getCategories().pipe(
          map((categories) => Homepage3Actions.fetchCategoriesSuccess({ categories })),
          catchError((error) => of(Homepage3Actions.fetchCategoriesFailure({ error: error.message })))
        )
      )
    )
  );

  // Experience Cards Effects
  fetchExperienceCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Homepage3Actions.fetchExperienceCards),
      switchMap(() =>
        this.homepage3Service.getExperienceCards().pipe(
          map((experienceCards) => Homepage3Actions.fetchExperienceCardsSuccess({ experienceCards })),
          catchError((error) => of(Homepage3Actions.fetchExperienceCardsFailure({ error: error.message })))
        )
      )
    )
  );

  // Gallery Products Effects
  fetchGalleryProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Homepage3Actions.fetchGalleryProducts),
      switchMap(() =>
        this.homepage3Service.getGalleryProducts().pipe(
          map((galleryProducts) => Homepage3Actions.fetchGalleryProductsSuccess({ galleryProducts })),
          catchError((error) => of(Homepage3Actions.fetchGalleryProductsFailure({ error: error.message })))
        )
      )
    )
  );

  // Features Effects
  fetchFeatures$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Homepage3Actions.fetchFeatures),
      switchMap(() =>
        this.homepage3Service.getFeatures().pipe(
          map((features) => Homepage3Actions.fetchFeaturesSuccess({ features })),
          catchError((error) => of(Homepage3Actions.fetchFeaturesFailure({ error: error.message })))
        )
      )
    )
  );

  // Products Effects
  fetchProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Homepage3Actions.fetchProducts),
      switchMap(() =>
        this.homepage3Service.getProducts().pipe(
          map((products) => Homepage3Actions.fetchProductsSuccess({ products })),
          catchError((error) => of(Homepage3Actions.fetchProductsFailure({ error: error.message })))
        )
      )
    )
  );

  // Statistics Effects
  fetchStatistics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Homepage3Actions.fetchStatistics),
      switchMap(() =>
        this.homepage3Service.getStatistics().pipe(
          map((statistics) => Homepage3Actions.fetchStatisticsSuccess({ statistics })),
          catchError((error) => of(Homepage3Actions.fetchStatisticsFailure({ error: error.message })))
        )
      )
    )
  );
}