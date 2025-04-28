import { Injectable } from "@angular/core";
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PeopleGroupService } from "src/app/core/services/contact/people-group.service";
import { addpeopleGroupData, addpeopleGroupDataFailure, addpeopleGroupDataSuccess, deletepeopleGroupData, deletepeopleGroupFailure, deletepeopleGroupSuccess, fetchpeopleGroupData, fetchpeopleGroupFailure, fetchpeopleGroupSuccess, updatepeopleGroupData, updatepeopleGroupDataFailure, updatepeopleGroupDataSuccess } from "./peapleGroup.action";

@Injectable()

export class PeopleGroupEffects {
    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchpeopleGroupData),
            mergeMap(() =>
                this.PeopleGroupService.fetchData().pipe(
                    map((peopleGroupdata) => fetchpeopleGroupSuccess({ peopleGroupdata })),

                    catchError((error) =>
                        of(fetchpeopleGroupFailure({ error }))
                    )

                )
            )
        )
    );

    addData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addpeopleGroupData),
            mergeMap(({ name }) =>
                this.PeopleGroupService.addData({ name }).pipe(
                    map((newData) => addpeopleGroupDataSuccess({ newData })),
                    catchError((error) => of(addpeopleGroupDataFailure({ error })))
                )
            )
        )
    );

    updateData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updatepeopleGroupData),
            mergeMap(({ updatedData }) =>
                this.PeopleGroupService.updateData(updatedData).pipe(
                    map(() => updatepeopleGroupDataSuccess({ updatedData })),
                    catchError((error) => of(updatepeopleGroupDataFailure({ error })))
                )
            )
        )
    );

    deleteData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deletepeopleGroupData),
            mergeMap(({ id }) =>
                this.PeopleGroupService.deleteData( id ).pipe(
                    map(() => deletepeopleGroupSuccess({ id })),
                    catchError((error) => of(deletepeopleGroupFailure({ error })))
                )
            )
        )
    );


    constructor(
        private actions$: Actions,
        private PeopleGroupService: PeopleGroupService
    ) { }
}