import { Injectable } from "@angular/core";
import { exhaustAll, of, switchMap } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { InvoiceService } from "src/app/core/services/invoice/invoice.service";
import {
  addinvoiceData,
  addinvoiceDataFailure,
  addinvoiceDataSuccess,
  deleteinvoiceData,
  deleteinvoiceFailure,
  deleteinvoiceSuccess,
  fetchinvoiceData,
  fetchinvoiceFailure,
  fetchinvoiceSuccess,
  updateinvoiceData,
  updateinvoiceDataFailure,
  updateinvoiceDataSuccess,
  uploadImage,
  uploadImageSuccess,
  uploadImageFailure
} from "./invoice.action";
import { InvoiceModel } from "./invoice.model";


@Injectable()
export class InvoiceEffects {

  fetchData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchinvoiceData),
      mergeMap(() =>
        this.invoiceService.fetchData().pipe(
          map((invoicedata) => fetchinvoiceSuccess({ fetchedInvoiceData: invoicedata })),
          catchError((error) =>
            of(fetchinvoiceFailure({ error }))
          )
        )
      )
    )
  );

  addData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addinvoiceData),
      mergeMap(({ newData }) =>
        this.invoiceService.addData(newData).pipe(
          map((addedInvoice: any) => addinvoiceDataSuccess({ newData: addedInvoice })),
          catchError((error) => of(addinvoiceDataFailure({ error })))
        )
      )
    )
  );

  updateData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateinvoiceData),
      mergeMap(({ id, updatedData }) =>
        this.invoiceService.updateData(id, updatedData).pipe(
          map((newUpdatedData: any) => updateinvoiceDataSuccess({ updatedData: newUpdatedData })),
          catchError((error) => of(updateinvoiceDataFailure({ error })))
        )
      )
    )
  );



  deleteData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteinvoiceData),
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
    private invoiceService: InvoiceService
  ) {
  }
}
