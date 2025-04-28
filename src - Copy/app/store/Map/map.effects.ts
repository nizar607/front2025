import {Injectable} from "@angular/core";
import {exhaustAll, of, switchMap} from 'rxjs';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {MapService} from "src/app/core/services/map/map.service";
import {
  addMapData,
  addMapDataFailure,
  addMapDataSuccess,
  deleteMapData,
  deleteMapFailure,
  deleteMapSuccess,
  fetchMapData,
  fetchMapFailure,
  fetchMapSuccess,
  updateMapData,
  updateMapDataFailure,
  updateMapDataSuccess,
} from "./map.action";

import {MapModel} from "./map.model";
import {fetchSelectedCaseData, fetchSelectedCaseDataFailure, fetchSelectedCaseDataSuccess} from "../Case/case.action";


@Injectable()
export class MapEffects {

  fetchData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchMapData),
      mergeMap(() =>
        this.mapService.fetchData().pipe(
          map((mapdata: MapModel[]) => fetchMapSuccess({mapData: mapdata})),
          catchError((error) =>
            of(fetchMapFailure({error}))
          )
        )
      )
    )
  );

  /*
  fetchSelectedData$ = createEffect(() =>
     this.actions$.pipe(
       ofType(fetchSelectedCaseData),
       mergeMap(({id}) =>
         this.mapService.(id).pipe(
           map((selectedCase: any) => fetchSelectedCaseDataSuccess({selectedCase})),
           catchError((error) => of(fetchSelectedCaseDataFailure({error})))
         )
       )
     )
   );
   */

  addData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addMapData),
      mergeMap(({newData}) =>
        this.mapService.addData(newData).pipe(
          map((addedMap: any) => addMapDataSuccess({newData: addedMap})),
          catchError((error) => of(addMapDataFailure({error})))
        )
      )
    )
  );


  updateData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateMapData),
      mergeMap(({updatedData}) =>
        this.mapService.updateData(updatedData).pipe(
          map((newUpdatedData: any) => updateMapDataSuccess({updatedData: newUpdatedData})),
          catchError((error) => of(updateMapDataFailure({error})))
        )
      )
    )
  );


  deleteData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteMapData),
      mergeMap(({id}) =>
        this.mapService.deleteData(id).pipe(
          map(() => deleteMapSuccess({id})),
          catchError((error) => of(deleteMapFailure({error})))
        )
      )
    )
  );


  constructor(
    private actions$: Actions,
    private mapService: MapService
  ) {
  }
}
