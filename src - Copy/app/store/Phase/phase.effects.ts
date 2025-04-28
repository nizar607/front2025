import {Injectable} from "@angular/core";
import {of} from 'rxjs';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {PhaseService} from "src/app/core/services/phase/phase.service";
import {
  addPhaseData,
  addPhaseDataFailure,
  addPhaseDataSuccess,
  deletePhaseData,
  deletePhaseFailure,
  deletePhaseSuccess,
  fetchSelectedPhaseData,
  fetchSelectedPhaseDataFailure,
  fetchSelectedPhaseDataSuccess,
  updatePhaseData,
  updatePhaseDataFailure,
  updatePhaseDataSuccess
} from "./phase.action";

import {PhaseModel} from "./phase.model";

@Injectable()

export class PhaseEffects {



  // fetchData$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(fetchSelectedPhaseData),
  //     mergeMap(({id}) =>
  //       this.phaseService.fetchData(id).pipe(
  //         map((selectedPhase: any) => fetchSelectedPhaseDataSuccess({selectedPhase})),
  //         catchError((error) => of(fetchSelectedPhaseDataFailure({error})))
  //       )
  //     )
  //   )
  // );

  fetchSelectedData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchSelectedPhaseData),
      mergeMap(({id}) =>
        this.phaseService.fetchData(id).pipe(
          map((selectedPhase: any) => fetchSelectedPhaseDataSuccess({selectedPhase})),
          catchError((error) => of(fetchSelectedPhaseDataFailure({error})))
        )
      )
    )
  );

  addData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addPhaseData),
      tap(() => console.log('Effect triggered with data')),
      mergeMap(({newData}) => {
        console.log('Sending data to service: ', newData);
        return this.phaseService.addData(newData).pipe(
          map((response) => {
            console.log('Response from service: ', response);
            return addPhaseDataSuccess({newData : response});
          }),
          catchError((error) => {
            console.error('Error in effect: ', error);
            return of(addPhaseDataFailure({error}));
          })
        );
      })
    )
  );

  /*  updateData$ = createEffect(() =>
      this.actions$.pipe(
        ofType(updatePhaseData),
        mergeMap(({updatedData}) =>
          this.phaseService.updateData(updatedData).pipe(
            map(() => updatePhaseDataSuccess({updatedData})),
            catchError((error) => of(updatePhaseDataFailure({error})))
          )
        )
      )
    );

   */

  deleteData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePhaseData),
      mergeMap(({id}) =>
        this.phaseService.deleteData(id).pipe(
          map(() => deletePhaseSuccess({id})),
          catchError((error) => of(deletePhaseFailure({error})))
        )
      )
    )
  );


  constructor(
    private actions$: Actions,
    private phaseService: PhaseService
  ) {
  }
}
