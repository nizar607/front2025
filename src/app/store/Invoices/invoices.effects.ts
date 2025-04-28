import { Injectable } from "@angular/core";
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CrudService } from "src/app/core/services/crud.service";
import { addInvoiceData, addInvoiceDataFailure, addInvoiceDataSuccess, deleteinvoice, deleteinvoiceFailure, deleteinvoiceSuccess, fetchInvoiceData, fetchInvoiceFailure, fetchInvoiceSuccess, fetchInvoicelistData, fetchInvoicelistFailure, fetchInvoicelistSuccess } from "./invoices.action";
import { InvoiceService } from "src/app/core/services/invoice/invoice.service";


@Injectable()

export class InvoiceEffects {
    fetchlistData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchInvoicelistData),
            mergeMap(() =>
                this.invoiceService.fetchData().pipe(
                    map((Invoicelistdata) => fetchInvoicelistSuccess({ Invoicelistdata })),
                    catchError((error) =>
                        of(fetchInvoicelistFailure({ error }))
                    )

                )
            )
        )
    );

    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchInvoiceData),
            mergeMap(() =>
                this.invoiceService.fetchData().pipe(
                    map((Invoicedata) => fetchInvoiceSuccess({ Invoicedata })),
                    catchError((error) =>
                        of(fetchInvoiceFailure({ error }))
                    )

                )
            )
        )
    );

    addData$ = createEffect(() =>
        this.actions$.pipe(
          ofType(addInvoiceData),
          tap(() => console.log('Effect triggered with data')),
          mergeMap(({newData}) => {
            console.log('Sending data to service: ', newData);
            return this.invoiceService.addData(newData).pipe(
              map((response) => {
                console.log('Response from service: ', response);
                return addInvoiceDataSuccess({newData : response});
              }),
              catchError((error) => {
                console.error('Error in effect: ', error);
                return of(addInvoiceDataFailure({error}));
              })
            );
          })
        )
      );

    deleteData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteinvoice),
            mergeMap(({ id }) =>
                this.invoiceService.deleteData(id).pipe(
                    map(() => deleteinvoiceSuccess({ id })),
                    catchError((error) => of(deleteinvoiceFailure({ error })))
                )
            )
        )
    );
    constructor(
        private actions$: Actions,
        private invoiceService:InvoiceService
    ) { }
}