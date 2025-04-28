import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GlobalComponent} from 'src/app/global-component';
import {AgentModel} from "../../../store/Agent/agent.model";

const API_URL = GlobalComponent.API_URL + 'agent/';

@Injectable({providedIn: 'root'})
export class MapService {
  constructor(private http: HttpClient) {
  }

  /***
   * Get
   */
  fetchData(): Observable<any[]> {
    return this.http.get<any[]>(API_URL);
  }

  addData(newData: FormData): Observable<any[]> {
    return this.http.post<any>(API_URL, newData);
  }

  updateData(updatedData: FormData): Observable<any[]> {
    return this.http.put<any>(API_URL, updatedData);
  }

  deleteData(id: string): Observable<any[]> {
    return this.http.delete<any[]>(`${API_URL}${id}`);
  }
}
