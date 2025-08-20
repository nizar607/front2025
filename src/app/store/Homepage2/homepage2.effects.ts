import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Homepage2Service } from 'src/app/core/services/homepage2/homepage2.service';
import * as Homepage2Actions from './homepage2.action';
import {
  addHomepage2Data,
  addHomepage2DataFailure,
  addHomepage2DataSuccess,
  deleteHomepage2Data,
  deleteHomepage2Failure,
  deleteHomepage2Success,
  fetchHomepage2Data,
  fetchHomepage2Failure,
  fetchHomepage2Success,
  updateHomepage2Data,
  updateHomepage2DataFailure,
  updateHomepage2DataSuccess,
  updateHomepage2Images,
  updateHomepage2ImagesFailure,
  updateHomepage2ImagesSuccess,
  uploadHomepage2Image,
  uploadHomepage2ImageSuccess,
  uploadHomepage2ImageFailure
} from './homepage2.action';

@Injectable()
export class Homepage2Effects {

  // Homepage2 Data Effects
  fetchData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchHomepage2Data),
      mergeMap(() =>
        this.homepage2Service.fetchData().pipe(
          map((homepage2Data) => fetchHomepage2Success({ fetchedHomepage2Data: homepage2Data })),
          catchError((error) =>
            of(fetchHomepage2Failure({ error }))
          )
        )
      )
    )
  );

  addData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addHomepage2Data),
      mergeMap(({ newData }) =>
        this.homepage2Service.addData(newData).pipe(
          map((addedHomepage2: any) => addHomepage2DataSuccess({ newData: addedHomepage2 })),
          catchError((error) => of(addHomepage2DataFailure({ error })))
        )
      )
    )
  );

  updateData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateHomepage2Data),
      mergeMap(({ id, updatedData }) =>
        this.homepage2Service.updateData(id, updatedData).pipe(
          map((newUpdatedData: any) => updateHomepage2DataSuccess({ updatedData: newUpdatedData })),
          catchError((error) => of(updateHomepage2DataFailure({ error })))
        )
      )
    )
  );

  updateImages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateHomepage2Images),
      mergeMap(({ id, imageData }) =>
        this.homepage2Service.updateImages(id, imageData).pipe(
          map((updatedData: any) => updateHomepage2ImagesSuccess({ updatedData })),
          catchError((error) => of(updateHomepage2ImagesFailure({ error })))
        )
      )
    )
  );

  uploadImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(uploadHomepage2Image),
      mergeMap(({ newData }) =>
        this.homepage2Service.uploadImage(newData).pipe(
          map((uploadedData: any) => uploadHomepage2ImageSuccess({ newData: uploadedData })),
          catchError((error) => of(uploadHomepage2ImageFailure({ error })))
        )
      )
    )
  );

  deleteData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteHomepage2Data),
      mergeMap(({ id }) =>
        this.homepage2Service.deleteData(id).pipe(
          map(() => deleteHomepage2Success({ id })),
          catchError((error) => of(deleteHomepage2Failure({ error })))
        )
      )
    )
  );



  constructor(
    private actions$: Actions,
    private homepage2Service: Homepage2Service
  ) {
  }
}