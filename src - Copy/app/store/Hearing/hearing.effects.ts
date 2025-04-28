import { Injectable } from "@angular/core";
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { HearingService } from "src/app/core/services/hearing/hearing.service";
import {
  addHearingData,
  addHearingDataFailure,
  addHearingDataSuccess,
  deleteHearingData,
  deleteHearingFailure,
  deleteHearingSuccess,
  fetchHearingData,
  fetchHearingFailure,
  fetchHearingSuccess,
  updateHearingData,
  updateHearingDataFailure,
  updateHearingDataSuccess
} from "./hearing.action";
import { hearingModel } from "./hearing.model";

@Injectable()

export class HearingEffects {
  fetchData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchHearingData),
      mergeMap(() =>
        this.hearingService.fetchData().pipe(
          map((hearingdata: any[]) => fetchHearingSuccess({ hearingdata: hearingdata })),
          catchError((error) =>
            of(fetchHearingFailure({ error }))
          )
        )
      )
    )
  );


  addData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addHearingData),
      mergeMap(({ newData }) =>
        this.hearingService.addData(newData).pipe(
          map((newAddedHearing) => addHearingDataSuccess({ newData: newAddedHearing })),
          catchError((error) => of(addHearingDataFailure({ error })))
        )
      )
    )
  );

  updateData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateHearingData),
      mergeMap(({ updatedData }) =>
        this.hearingService.updateData(updatedData).pipe(
          map(() => updateHearingDataSuccess({ updatedData })),
          catchError((error) => of(updateHearingDataFailure({ error })))
        )
      )
    )
  );

  deleteData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteHearingData),
      mergeMap(({ id }) =>
        this.hearingService.deleteData(id).pipe(
          map(() => deleteHearingSuccess({ id })),
          catchError((error) => of(deleteHearingFailure({ error })))
        )
      )
    )
  );


  constructor(
    private actions$: Actions,
    private hearingService: HearingService
  ) {
  }
}
