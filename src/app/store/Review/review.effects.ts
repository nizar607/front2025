import { Injectable } from "@angular/core";
import { exhaustAll, of, switchMap } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ReviewService } from "src/app/core/services/review/review.service";
import {
  addreviewData,
  addreviewDataFailure,
  addreviewDataSuccess,
  deletereviewData,
  deletereviewFailure,
  deletereviewSuccess,
  fetchreviewData,
  fetchreviewFailure,
  fetchreviewSuccess,
  updatereviewData,
  updatereviewDataFailure,
  updatereviewDataSuccess,
  uploadImage,
  uploadImageSuccess,
  uploadImageFailure,
  fetchreviewByArticleData,
  fetchreviewByArticleSuccess,
  fetchreviewByArticleFailure
} from "./review.action";
import { ReviewModel } from "./review.model";


@Injectable()
export class ReviewEffects {

  fetchData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchreviewData),
      mergeMap(() =>
        this.reviewService.fetchData().pipe(
          map((reviewdata) => fetchreviewSuccess({ fetchedReviewData: reviewdata })),
          catchError((error) =>
            of(fetchreviewFailure({ error }))
          )
        )
      )
    )
  );

  addData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addreviewData),
      mergeMap(({ newData }) =>
        this.reviewService.addData(newData).pipe(
          map((addedReview: any) => addreviewDataSuccess({ newData: addedReview })),
          catchError((error) => of(addreviewDataFailure({ error })))
        )
      )
    )
  );

  updateData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatereviewData),
      mergeMap(({ id, updatedData }) =>
        this.reviewService.updateData(id, updatedData).pipe(
          map((newUpdatedData: any) => updatereviewDataSuccess({ updatedData: newUpdatedData })),
          catchError((error) => of(updatereviewDataFailure({ error })))
        )
      )
    )
  );



  deleteData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletereviewData),
      mergeMap(({ id }) =>
        this.reviewService.deleteData(id).pipe(
          map(() => deletereviewSuccess({ id })),
          catchError((error) => of(deletereviewFailure({ error })))
        )
      )
    )
  );

  // implement this fetchreviewByArticleData
  fetchreviewByArticleData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchreviewByArticleData),
      mergeMap(({ id }) =>
        this.reviewService.fetchDataByArticle(id).pipe(
          map((reviewdata) => fetchreviewByArticleSuccess({ fetchedReviewData: reviewdata })),
          catchError((error) =>
            of(fetchreviewByArticleFailure({ error }))
          )
        )
      )
    ));


  constructor(
    private actions$: Actions,
    private reviewService: ReviewService
  ) {
  }
}
