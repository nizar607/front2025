import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalComponent } from 'src/app/global-component';

const API_URL = GlobalComponent.API_URL+'phase/';

@Injectable({ providedIn: 'root' })
export class PhaseService {
    constructor(private http: HttpClient) { }

    /***
     * Get 
     */
    fetchData(id : string): Observable<any[]> {
        return this.http.get<any[]>(API_URL+ "get-contacts-by-case/" + id);
    }

    addData(newData: any): Observable<any[]> {
        return this.http.post<any[]>(API_URL, newData);
    }

    updateData(id : string, updatedData: any): Observable<any[]> {
        return this.http.put<any[]>(API_URL+id, updatedData);
    }
    

    deleteData(id : string): Observable<any[]> {
        return this.http.delete<any[]>(API_URL+id);
    }
    
}