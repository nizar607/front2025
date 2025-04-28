import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GlobalComponent} from 'src/app/global-component';
import {AgentModel} from "../../../store/Agent/agent.model";

const API_URL = GlobalComponent.API_URL + 'calendar/';

@Injectable({providedIn: 'root'})
export class CalendarService {
  constructor(private http: HttpClient) {
  }

  /***
   * Get
   ***/
  fetchData(): Observable<any[]> {
    return this.http.get<any[]>(API_URL);
  }
}
