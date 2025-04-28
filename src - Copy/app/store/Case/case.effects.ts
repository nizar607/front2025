import {Injectable} from "@angular/core";
import {of} from 'rxjs';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {CaseService} from "src/app/core/services/case/case.service";
import {
  addCaseData,
  addCaseDataFailure,
  addCaseDataSuccess,
  deleteCaseData,
  deleteCaseFailure,
  deleteCaseSuccess,
  fetchCaseData,
  fetchCaseFailure,
  fetchCaseSuccess, fetchSelectedCaseData, fetchSelectedCaseDataFailure, fetchSelectedCaseDataSuccess,
  updateCaseData,
  updateCaseDataFailure,
  updateCaseDataSuccess
} from "./case.action";
import {CaseModel} from "./case.model";

@Injectable()

export class CaseEffects {

  fetchData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchCaseData),
      mergeMap(() =>
        this.caseService.fetchData().pipe(
          map((caseData: any[]) => {
            console.log('Fetched data: ', caseData); // Check what data is coming here
            return fetchCaseSuccess({caseData});
          }),
          catchError((error) => of(fetchCaseFailure({error})))
        )
      )
    )
  );


  fetchSelectedData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchSelectedCaseData),
      mergeMap(({id}) =>
        this.caseService.fetchSelectedData(id).pipe(
          map((selectedCase: any) => fetchSelectedCaseDataSuccess({selectedCase})),
          catchError((error) => of(fetchSelectedCaseDataFailure({error})))
        )
      )
    )
  );

  addData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addCaseData),
      tap(() => console.log('Effect triggered with data')),
      mergeMap(({newData}) => {
        console.log('Sending data to service: ', newData);
        return this.caseService.addData(newData).pipe(
          map((response) => {
            console.log('Response from service: ', response);
            return addCaseDataSuccess({newData : response});
          }),
          catchError((error) => {
            console.error('Error in effect: ', error);
            return of(addCaseDataFailure({error}));
          })
        );
      })
    )
  );

  /*  updateData$ = createEffect(() =>
      this.actions$.pipe(
        ofType(updateCaseData),
        mergeMap(({updatedData}) =>
          this.caseService.updateData(updatedData).pipe(
            map(() => updateCaseDataSuccess({updatedData})),
            catchError((error) => of(updateCaseDataFailure({error})))
          )
        )
      )
    );

   */

  deleteData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteCaseData),
      mergeMap(({id}) =>
        this.caseService.deleteData(id).pipe(
          map(() => deleteCaseSuccess({id})),
          catchError((error) => of(deleteCaseFailure({error})))
        )
      )
    )
  );


  constructor(
    private actions$: Actions,
    private caseService: CaseService
  ) {
  }
}
