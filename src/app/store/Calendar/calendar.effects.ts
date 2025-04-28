import {Injectable} from "@angular/core";
import {of} from 'rxjs';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {CalendarService} from "src/app/core/services/calendar/calendar.service";
import {
  addCalendarData,
  addCalendarDataFailure,
  addCalendarDataSuccess,
  deleteCalendarData,
  deleteCalendarFailure,
  deleteCalendarSuccess,
  fetchCalendarData,
  fetchCalendarFailure,
  fetchCalendarSuccess, fetchSelectedCalendarData, fetchSelectedCalendarDataFailure, fetchSelectedCalendarDataSuccess,
  updateCalendarData,
  updateCalendarDataFailure,
  updateCalendarDataSuccess
} from "./calendar.action";
import {CalendarModel} from "./calendar.model";

@Injectable()

export class CalendarEffects {

  fetchData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchCalendarData),
      mergeMap(() =>
        this.calendarService.fetchData().pipe(
          map((calendarData: any[]) => {
            console.log('Fetched data: ', calendarData); // Check what data is coming here
            return fetchCalendarSuccess({calendarData});
          }),
          catchError((error) => of(fetchCalendarFailure({error})))
        )
      )
    )
  );


  fetchSelectedData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchSelectedCalendarData),
      mergeMap(({id}) =>
        this.calendarService.fetchSelectedData(id).pipe(
          map((selectedCalendar: any) => fetchSelectedCalendarDataSuccess({selectedCalendar})),
          catchError((error) => of(fetchSelectedCalendarDataFailure({error})))
        )
      )
    )
  );

  addData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addCalendarData),
      tap(() => console.log('Effect triggered with data')),
      mergeMap(({newData}) => {
        console.log('Sending data to service: ', newData);
        return this.calendarService.addData(newData).pipe(
          map((response) => {
            console.log('Response from service: ', response);
            return addCalendarDataSuccess({newData : response});
          }),
          catchError((error) => {
            console.error('Error in effect: ', error);
            return of(addCalendarDataFailure({error}));
          })
        );
      })
    )
  );

  /*  updateData$ = createEffect(() =>
      this.actions$.pipe(
        ofType(updateCalendarData),
        mergeMap(({updatedData}) =>
          this.calendarService.updateData(updatedData).pipe(
            map(() => updateCalendarDataSuccess({updatedData})),
            catchError((error) => of(updateCalendarDataFailure({error})))
          )
        )
      )
    );

   */

  deleteData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteCalendarData),
      mergeMap(({id}) =>
        this.calendarService.deleteData(id).pipe(
          map(() => deleteCalendarSuccess({id})),
          catchError((error) => of(deleteCalendarFailure({error})))
        )
      )
    )
  );


  constructor(
    private actions$: Actions,
    private calendarService: CalendarService
  ) {
  }
}
