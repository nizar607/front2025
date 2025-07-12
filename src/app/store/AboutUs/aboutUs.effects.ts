import { Injectable } from "@angular/core";
import { exhaustAll, of, switchMap } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AboutUsService } from "src/app/core/services/aboutUs/aboutUs.service";
import {
  addaboutusData,
  addaboutusDataFailure,
  addaboutusDataSuccess,
  deleteaboutusData,
  deleteaboutusFailure,
  deleteaboutusSuccess,
  fetchaboutusData,
  fetchaboutusFailure,
  fetchaboutusSuccess,
  updateaboutusData,
  updateaboutusDataFailure,
  updateaboutusDataSuccess,
  uploadImage,
  uploadImageSuccess,
  uploadImageFailure
} from "./aboutUs.action";
import { AboutUsModel } from "./aboutUs.model";


@Injectable()
export class AboutUsEffects {

  fetchData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchaboutusData),
      mergeMap(() =>
        this.aboutusService.fetchData().pipe(
          map((aboutusdata) => fetchaboutusSuccess({ fetchedAboutUsData: aboutusdata })),
          catchError((error) =>
            of(fetchaboutusFailure({ error }))
          )
        )
      )
    )
  );

  addData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addaboutusData),
      mergeMap(({ newData }) =>
        this.aboutusService.addData(newData).pipe(
          map((addedAboutUs: any) => addaboutusDataSuccess({ newData: addedAboutUs })),
          catchError((error) => of(addaboutusDataFailure({ error })))
        )
      )
    )
  );

  updateData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateaboutusData),
      mergeMap(({ id, updatedData }) =>
        this.aboutusService.updateData(id, updatedData).pipe(
          map((newUpdatedData: any) => updateaboutusDataSuccess({ updatedData: newUpdatedData })),
          catchError((error) => of(updateaboutusDataFailure({ error })))
        )
      )
    )
  );



  deleteData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteaboutusData),
      mergeMap(({ id }) =>
        this.aboutusService.deleteData(id).pipe(
          map(() => deleteaboutusSuccess({ id })),
          catchError((error) => of(deleteaboutusFailure({ error })))
        )
      )
    )
  );


  constructor(
    private actions$: Actions,
    private aboutusService: AboutUsService
  ) {
  }
}
