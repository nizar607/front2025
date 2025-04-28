import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {GlobalComponent} from "../../../global-component";


const API_URL = GlobalComponent.API_URL+"meeting/";

@Injectable({ providedIn: 'root' })
export class MeetingService {
    constructor(private http: HttpClient) { }

    /***
     * Get
     ***/

    fetchData(): Observable<any[]> {
      return this.http.get<any[]>(API_URL);
      //return this.http.get<any[]>("http://localhost:8080/api/meeting/test");
    }

    addData(newData: any): Observable<any[]> {
        return this.http.post<any[]>(API_URL, newData);
    }

    updateData(updatedData: any): Observable<any[]> {
        return this.http.put<any[]>(API_URL, updatedData);
    }

    deleteData(id:string): Observable<void> {
        return this.http.delete<void>(API_URL+id);
    }
}
