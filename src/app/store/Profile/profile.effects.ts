import {Injectable} from "@angular/core";
import {exhaustAll, of, switchMap} from 'rxjs';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ProfileService} from "src/app/core/services/profile/profile.service";
import {
  addprofileData,
  addprofileDataFailure,
  addprofileDataSuccess,
  deleteprofileData,
  deleteprofileFailure,
  deleteprofileSuccess,
  fetchprofileData,
  fetchprofileFailure,
  fetchprofileSuccess,
  updateprofileData,
  updateprofileDataFailure,
  updateprofileDataSuccess,
  uploadImage,
  uploadImageSuccess,
  uploadImageFailure
} from "./profile.action";

import {ProfileModel} from "./profile.model";


@Injectable()
export class ProfileEffects {

  fetchData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchprofileData),
      mergeMap(() =>
        this.profileService.fetchData().pipe(
          map((profiledata) => fetchprofileSuccess({profiledata})),
          catchError((error) =>
            of(fetchprofileFailure({error}))
          )
        )
      )
    )
  );

  addData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addprofileData),
      mergeMap(({newData}) =>
        this.profileService.addData(newData).pipe(
          map((addedProfile: any) => addprofileDataSuccess({newData: addedProfile})),
          catchError((error) => of(addprofileDataFailure({error})))
        )
      )
    )
  );


  updateData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateprofileData),
      mergeMap(({updatedData}) =>
        this.profileService.updateData(updatedData).pipe(
          map((newUpdatedData:any) => updateprofileDataSuccess({updatedData:newUpdatedData})),
          catchError((error) => of(updateprofileDataFailure({error})))
        )
      )
    )
  );



  deleteData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteprofileData),
      mergeMap(({id}) =>
        this.profileService.deleteData(id).pipe(
          map(() => deleteprofileSuccess({id})),
          catchError((error) => of(deleteprofileFailure({error})))
        )
      )
    )
  );


  constructor(
    private actions$: Actions,
    private profileService: ProfileService
  ) {
  }
}
