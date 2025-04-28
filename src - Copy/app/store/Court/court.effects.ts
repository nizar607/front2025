import { Injectable } from "@angular/core";
import { exhaustAll, of, switchMap } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CourtService } from "src/app/core/services/court/court.service";
import {
  addcourtData,
  addcourtDataFailure,
  addcourtDataSuccess,
  deletecourtData,
  deletecourtFailure,
  deletecourtSuccess,
  fetchcourtData,
  fetchcourtFailure,
  fetchcourtSuccess,
  updatecourtData,
  updatecourtDataFailure,
  updatecourtDataSuccess,
  uploadImage,
  uploadImageSuccess,
  uploadImageFailure
} from "./court.action";
import { fetchsalesFailure } from "../Ecommerce/ecommerce.actions";
import { CourtModel } from "./court.model";


@Injectable()
export class CourtEffects {

  fetchData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchcourtData),
      mergeMap(() =>
        this.courtService.fetchData().pipe(
          map((courtdata) => fetchcourtSuccess({ fetchedCourtData: courtdata })),
          catchError((error) =>
            of(fetchcourtFailure({ error }))
          )
        )
      )
    )
  );

  addData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addcourtData),
      mergeMap(({ newData }) =>
        this.courtService.addData(newData).pipe(
          map((addedCourt: any) => addcourtDataSuccess({ newData: addedCourt })),
          catchError((error) => of(addcourtDataFailure({ error })))
        )
      )
    )
  );

  updateData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatecourtData),
      mergeMap(({ id, updatedData }) =>
        this.courtService.updateData(id, updatedData).pipe(
          map((newUpdatedData: any) => updatecourtDataSuccess({ updatedData: newUpdatedData })),
          catchError((error) => of(updatecourtDataFailure({ error })))
        )
      )
    )
  );



  deleteData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletecourtData),
      mergeMap(({ id }) =>
        this.courtService.deleteData(id).pipe(
          map(() => deletecourtSuccess({ id })),
          catchError((error) => of(deletecourtFailure({ error })))
        )
      )
    )
  );


  constructor(
    private actions$: Actions,
    private courtService: CourtService
  ) {
  }
}
