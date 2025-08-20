import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Homepage1Service } from 'src/app/core/services/homepage1/homepage1.service';
import {
  addHomepage1Data,
  addHomepage1DataFailure,
  addHomepage1DataSuccess,
  deleteHomepage1Data,
  deleteHomepage1Failure,
  deleteHomepage1Success,
  fetchHomepage1Data,
  fetchHomepage1Failure,
  fetchHomepage1Success,
  updateHomepage1Data,
  updateHomepage1DataFailure,
  updateHomepage1DataSuccess,
  updateHomepage1Images,
  updateHomepage1ImagesFailure,
  updateHomepage1ImagesSuccess,
  uploadHomepage1Image,
  uploadHomepage1ImageSuccess,
  uploadHomepage1ImageFailure
} from './homepage1.action';

@Injectable()
export class Homepage1Effects {

  // Homepage1 Data Effects
  fetchData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchHomepage1Data),
      mergeMap(() =>
        this.homepage1Service.fetchData().pipe(
          map((homepage1Data) => fetchHomepage1Success({ fetchedHomepage1Data: homepage1Data })),
          catchError((error) =>
            of(fetchHomepage1Failure({ error }))
          )
        )
      )
    )
  );

  addData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addHomepage1Data),
      mergeMap(({ newData }) =>
        this.homepage1Service.addData(newData).pipe(
          map((addedHomepage1: any) => addHomepage1DataSuccess({ newData: addedHomepage1 })),
          catchError((error) => of(addHomepage1DataFailure({ error })))
        )
      )
    )
  );

  updateData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateHomepage1Data),
      mergeMap(({ id, updatedData }) =>
        this.homepage1Service.updateData(id, updatedData).pipe(
          map((newUpdatedData: any) => updateHomepage1DataSuccess({ updatedData: newUpdatedData })),
          catchError((error) => of(updateHomepage1DataFailure({ error })))
        )
      )
    )
  );

  updateImages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateHomepage1Images),
      mergeMap(({ id, imageData }) =>
        this.homepage1Service.updateImages(id, imageData).pipe(
          map((updatedData: any) => updateHomepage1ImagesSuccess({ updatedData })),
          catchError((error) => of(updateHomepage1ImagesFailure({ error })))
        )
      )
    )
  );

  uploadImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(uploadHomepage1Image),
      mergeMap(({ newData }) =>
        this.homepage1Service.uploadImage(newData).pipe(
          map((uploadedData: any) => uploadHomepage1ImageSuccess({ newData: uploadedData })),
          catchError((error) => of(uploadHomepage1ImageFailure({ error })))
        )
      )
    )
  );

  deleteData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteHomepage1Data),
      mergeMap(({ id }) =>
        this.homepage1Service.deleteData(id).pipe(
          map(() => deleteHomepage1Success({ id })),
          catchError((error) => of(deleteHomepage1Failure({ error })))
        )
      )
    )
  );



  constructor(
    private actions$: Actions,
    private homepage1Service: Homepage1Service
  ) {
  }
}