import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MeetingService } from '../services/meeting/meeting.service';
import { Store } from "@ngrx/store";
import { fetchmeetingData } from "../../store/Meeting/meeting.action";
import { selectData } from "../../store/Meeting/meeting.selector";
import { CalendarService } from '../services/calendar/calendar.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarResolver implements Resolve<any> {
  constructor(private calendarService: CalendarService, private store: Store) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.calendarService.fetchData();
  }
}
