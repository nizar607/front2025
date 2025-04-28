import { Injectable } from "@angular/core";
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ContactService } from "src/app/core/services/contact/contact.service";
import { addcontactData, addcontactDataFailure, addcontactDataSuccess, deletecontactData, deletecontactFailure, deletecontactSuccess, fetchcontactData, fetchcontactFailure, fetchcontactSuccess, updatecontactData, updatecontactDataFailure, updatecontactDataSuccess } from "./contact.action";

@Injectable()

export class ContactEffects {
    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchcontactData),
            mergeMap(() =>
                this.ContactService.fetchData().pipe(
                    map((contactdata) => fetchcontactSuccess({ contactdata })),

                    catchError((error) =>
                        of(fetchcontactFailure({ error }))
                    )

                )
            )
        )
    );

    addData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addcontactData),
            mergeMap(({ contactData }) =>
                this.ContactService.addData(contactData).pipe(
                    map((newData) => addcontactDataSuccess({ newData })),
                    catchError((error) => of(addcontactDataFailure({ error })))
                )
            )
        )
    );

    updateData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updatecontactData),
            mergeMap(({ id, updatedData }) =>
                this.ContactService.updateData(id, updatedData).pipe(

                    map((newData) => updatecontactDataSuccess({ updatedData : newData })),
                    catchError((error) => of(updatecontactDataFailure({ error })))
                )
            )
        )
    );

    deleteData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deletecontactData),
            mergeMap(({ id }) =>
                this.ContactService.deleteData( id ).pipe(
                    map(() => deletecontactSuccess({ id })),
                    catchError((error) => of(deletecontactFailure({ error })))
                )
            )
        )
    );


    constructor(
        private actions$: Actions,
        private ContactService: ContactService
    ) { }
}