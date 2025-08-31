import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalComponent } from 'src/app/global-component';
// import {UserModel} from "../../../store/User/user.model";

const API_URL = GlobalComponent.API_URL + 'clients/';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {
  }

  /***
   * Get
   */
  fetchData(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}by-company`);
  }

  addData(newData: FormData): Observable<any[]> {
    return this.http.post<any>(API_URL, newData);
  }

  enableData(id: string, enabled: boolean): Observable<any[]> {
    return this.http.put<any>(`${API_URL}enabled/${id}?enabled=${enabled}`,{});
  }

  updateData(updatedData: FormData): Observable<any[]> {
    return this.http.put<any>(API_URL, updatedData);
  }

  deleteData(id: string): Observable<any[]> {
    return this.http.delete<any[]>(`${API_URL}${id}`);
  }

  getUserStats(): Observable<any> {
    return this.http.get<any>(`${API_URL}stats`);
  }
}
