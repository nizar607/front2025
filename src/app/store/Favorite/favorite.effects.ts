import { Injectable } from "@angular/core";
import { exhaustAll, of, switchMap } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { FavoriteService } from "src/app/core/services/favorite/favorite.service";
import {
  deletefavoriteData,
  deletefavoriteFailure,
  deletefavoriteSuccess,
  fetchfavoriteData,
  fetchfavoriteFailure,
  fetchfavoriteSuccess,
  fetchfavoriteDataByUser,
  fetchfavoriteByUserSuccess,
  fetchfavoriteByUserFailure,
  updatefavoriteData,
  updatefavoriteDataFailure,
  updatefavoriteDataSuccess,
  uploadImage,
  uploadImageSuccess,
  uploadImageFailure,
  checkIsFavorite,
  checkIsFavoriteSuccess,
  checkIsFavoriteFailure
} from "./favorite.action";
import { FavoriteModel } from "./favorite.model";


@Injectable()
export class FavoriteEffects {

  fetchData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchfavoriteData),
      mergeMap(() =>
        this.favoriteService.fetchData().pipe(
          map((favoritedata) => fetchfavoriteSuccess({ fetchedFavoriteData: favoritedata })),
          catchError((error) =>
            of(fetchfavoriteFailure({ error }))
          )
        )
      )
    )
  );

  fetchDataByUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchfavoriteDataByUser),
      mergeMap(() =>
        this.favoriteService.fetchDataByUser().pipe(
          map((favoritedata) => fetchfavoriteByUserSuccess({ fetchedFavoriteData: favoritedata })),
          catchError((error) =>
            of(fetchfavoriteByUserFailure({ error }))
          )
        )
      )
    ));

    checkIsFavorite$ = createEffect(() =>
      this.actions$.pipe(
        ofType(checkIsFavorite),
        switchMap(({ articleId }) =>
          this.favoriteService.fetchIsFavorite(articleId).pipe(
            map((result) => checkIsFavoriteSuccess({ 
              articleId, 
              isFavorite: result.length > 0 // Adjust based on your API response
            })),
            catchError((error) => of(checkIsFavoriteFailure({ error })))
          )
        )
      )
    );



  updateData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatefavoriteData),
      mergeMap(({ id, updatedData }) =>
        this.favoriteService.updateData(id, updatedData).pipe(
          map((newUpdatedData: any) => updatefavoriteDataSuccess({ updatedData: newUpdatedData })),
          catchError((error) => of(updatefavoriteDataFailure({ error })))
        )
      )
    )
  );



  deleteData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletefavoriteData),
      mergeMap(({ id }) =>
        this.favoriteService.deleteFavotiteByArticleData(id).pipe(
          map(() => deletefavoriteSuccess({ id })),
          catchError((error) => of(deletefavoriteFailure({ error })))
        )
      )
    )
  );




  constructor(
    private actions$: Actions,
    private favoriteService: FavoriteService
  ) {
  }
}
