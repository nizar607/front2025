import { Injectable } from "@angular/core";
import { exhaustAll, of, switchMap } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CategoryService } from "src/app/core/services/category/category.service";
import {
  addcategoryData,
  addcategoryDataFailure,
  addcategoryDataSuccess,
  deletecategoryData,
  deletecategoryFailure,
  deletecategorySuccess,
  fetchcategoryData,
  fetchcategoryFailure,
  fetchcategorySuccess,
  updatecategoryData,
  updatecategoryDataFailure,
  updatecategoryDataSuccess,
  uploadImage,
  uploadImageSuccess,
  uploadImageFailure
} from "./category.action";

import { CategoryModel } from "./category.model";


@Injectable()
export class CategoryEffects {

  fetchData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchcategoryData),
      mergeMap(() =>
        this.categoryService.fetchData().pipe(
          map((categorydata) => fetchcategorySuccess({ fetchedCategoryData: categorydata })),
          catchError((error) =>
            of(fetchcategoryFailure({ error }))
          )
        )
      )
    )
  );

  addData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addcategoryData),
      mergeMap(({ newData }) =>
        this.categoryService.addData(newData).pipe(
          map((addedCategory: any) => addcategoryDataSuccess({ newData: addedCategory })),
          catchError((error) => of(addcategoryDataFailure({ error })))
        )
      )
    )
  );

  updateData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatecategoryData),
      mergeMap(({ id, updatedData }) =>
        this.categoryService.updateData(id, updatedData).pipe(
          map((newUpdatedData: any) => updatecategoryDataSuccess({ updatedData: newUpdatedData })),
          catchError((error) => of(updatecategoryDataFailure({ error })))
        )
      )
    )
  );



  deleteData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletecategoryData),
      mergeMap(({ id }) =>
        this.categoryService.deleteData(id).pipe(
          map(() => deletecategorySuccess({ id })),
          catchError((error) => of(deletecategoryFailure({ error })))
        )
      )
    )
  );


  constructor(
    private actions$: Actions,
    private categoryService: CategoryService
  ) {
  }
}
