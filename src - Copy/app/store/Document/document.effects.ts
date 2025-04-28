import { Injectable } from "@angular/core";
import { exhaustAll, of, switchMap } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { DocumentService } from "src/app/core/services/document/document.service";
import {
  adddocumentData,
  adddocumentDataFailure,
  adddocumentDataSuccess,
  deletedocumentData,
  deletedocumentFailure,
  deletedocumentSuccess,
  fetchdocumentData,
  fetchdocumentFailure,
  fetchdocumentSuccess,
  updatedocumentData,
  updatedocumentDataFailure,
  updatedocumentDataSuccess,
  uploadImage,
  uploadImageSuccess,
  uploadImageFailure,
  fetchDocumentsByCase
} from "./document.action";
import { fetchsalesFailure } from "../Ecommerce/ecommerce.actions";



@Injectable()
export class DocumentEffects {


  fetchData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchDocumentsByCase),
      mergeMap(({ caseId }) =>
        this.documentService.fetchDataByCase(caseId).pipe(
          map((documentdata) => fetchdocumentSuccess({ documentdata })),
          catchError((error) =>
            of(fetchdocumentFailure({ error }))
          )
        )
      )
    )
  );


  addData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(adddocumentData),
      mergeMap(({ newData }) =>
        this.documentService.addData(newData).pipe(
          map((addedDocument: any) => adddocumentDataSuccess({ newData: addedDocument })),
          catchError((error) => of(adddocumentDataFailure({ error })))
        )
      )
    )
  );


  updateData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatedocumentData),
      mergeMap(({ updatedData }) =>
        this.documentService.updateData(updatedData).pipe(
          map((newUpdatedData: any) => updatedocumentDataSuccess({ updatedData: newUpdatedData })),
          catchError((error) => of(updatedocumentDataFailure({ error })))
        )
      )
    )
  );



  deleteData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletedocumentData),
      mergeMap(({ id }) =>
        this.documentService.deleteData(id).pipe(
          map(() => deletedocumentSuccess({ id })),
          catchError((error) => of(deletedocumentFailure({ error })))
        )
      )
    )
  );


  constructor(
    private actions$: Actions,
    private documentService: DocumentService
  ) {
  }
}
