import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MeetingService } from '../services/meeting/meeting.service';
import { Store } from "@ngrx/store";
import { fetchmeetingData } from "../../store/Meeting/meeting.action";
import { selectData } from "../../store/Meeting/meeting.selector";

@Injectable({
  providedIn: 'root'
})
export class MeetingResolver implements Resolve<any> {
  constructor(private meetingService: MeetingService, private store: Store) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    this.store.dispatch(fetchmeetingData());
    return this.meetingService.fetchData();
  }
}
