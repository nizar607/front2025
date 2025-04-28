import { Injectable } from "@angular/core";
import { exhaustAll, of, switchMap } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ArticleService } from "src/app/core/services/article/article.service";
import {
  addarticleData,
  addarticleDataFailure,
  addarticleDataSuccess,
  deletearticleData,
  deletearticleFailure,
  deletearticleSuccess,
  fetcharticleData,
  fetcharticleFailure,
  fetcharticleSuccess,
  updatearticleData,
  updatearticleDataFailure,
  updatearticleDataSuccess,
  uploadImage,
  uploadImageSuccess,
  uploadImageFailure
} from "./article.action";
import { fetchsalesFailure } from "../Ecommerce/ecommerce.actions";
import { ArticleModel } from "./article.model";


@Injectable()
export class ArticleEffects {

  fetchData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetcharticleData),
      mergeMap(() =>
        this.articleService.fetchData().pipe(
          map((articledata) => fetcharticleSuccess({ fetchedArticleData: articledata })),
          catchError((error) =>
            of(fetcharticleFailure({ error }))
          )
        )
      )
    )
  );

  addData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addarticleData),
      mergeMap(({ newData }) =>
        this.articleService.addData(newData).pipe(
          map((addedArticle: any) => addarticleDataSuccess({ newData: addedArticle })),
          catchError((error) => of(addarticleDataFailure({ error })))
        )
      )
    )
  );

  updateData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatearticleData),
      mergeMap(({ id, updatedData }) =>
        this.articleService.updateData(id, updatedData).pipe(
          map((newUpdatedData: any) => updatearticleDataSuccess({ updatedData: newUpdatedData })),
          catchError((error) => of(updatearticleDataFailure({ error })))
        )
      )
    )
  );



  deleteData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletearticleData),
      mergeMap(({ id }) =>
        this.articleService.deleteData(id).pipe(
          map(() => deletearticleSuccess({ id })),
          catchError((error) => of(deletearticleFailure({ error })))
        )
      )
    )
  );


  constructor(
    private actions$: Actions,
    private articleService: ArticleService
  ) {
  }
}
