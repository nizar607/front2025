import {Injectable} from "@angular/core";
import {of} from 'rxjs';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {MeetingService} from "src/app/core/services/meeting/meeting.service";
import {
  addmeetingData,
  addmeetingDataFailure,
  addmeetingDataSuccess,
  deletemeetingData,
  deletemeetingFailure,
  deletemeetingSuccess,
  fetchmeetingData,
  fetchmeetingFailure,
  fetchmeetingSuccess,
  updatemeetingData,
  updatemeetingDataFailure,
  updatemeetingDataSuccess
} from "./meeting.action";
import {meetingModel} from "./meeting.model";

@Injectable()

export class MeetingEffects {
  fetchData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchmeetingData),
      mergeMap(() =>
        this.meetingService.fetchData().pipe(
          map((meetingdata: any[]) => fetchmeetingSuccess({meetingdata:meetingdata})),
          catchError((error) =>
            of(fetchmeetingFailure({error}))
          )
        )
      )
    )
  );


  addData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addmeetingData),
      mergeMap(({newData}) =>
        this.meetingService.addData(newData).pipe(
          map((newAddedMeeting) => addmeetingDataSuccess({newData:newAddedMeeting})),
          catchError((error) => of(addmeetingDataFailure({error})))
        )
      )
    )
  );

  updateData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatemeetingData),
      mergeMap(({updatedData}) =>
        this.meetingService.updateData( updatedData).pipe(
          map(() => updatemeetingDataSuccess({updatedData})),
          catchError((error) => of(updatemeetingDataFailure({error})))
        )
      )
    )
  );

  deleteData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletemeetingData),
      mergeMap(({id}) =>
        this.meetingService.deleteData(id).pipe(
          map(() => deletemeetingSuccess({id})),
          catchError((error) => of(deletemeetingFailure({error})))
        )
      )
    )
  );


  constructor(
    private actions$: Actions,
    private meetingService: MeetingService
  ) {
  }
}
