import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalComponent } from 'src/app/global-component';
import { AgentModel } from "../../../store/Agent/agent.model";

const API_URL = GlobalComponent.API_URL + 'court/';

@Injectable({ providedIn: 'root' })
export class CourtService {
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

  updateData(id: string, updatedData: any): Observable<any> {
    console.log("updatedData here ", updatedData);
    return this.http.put<any>(API_URL + updatedData.id, updatedData);
  }

  deleteData(id: string): Observable<any> {
    return this.http.delete<any[]>(`${API_URL}${id}`);
  }

}
