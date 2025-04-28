import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GlobalComponent} from 'src/app/global-component';

const API_URL = GlobalComponent.API_URL + 'documents/';

@Injectable({providedIn: 'root'})
export class DocumentService {

  constructor(private http: HttpClient) {}

  /***
   * Get
   */

  fetchDataByCase(id:string): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}byCase/${id}`);
  }

  fetchData(): Observable<any[]> {
    return this.http.get<any[]>(API_URL);
  }

  addData(newData: FormData): Observable<any[]> {
    return this.http.post<any>(`${API_URL}upload`, newData);
  }

  updateData(updatedData: FormData): Observable<any[]> {
    return this.http.put<any>(API_URL, updatedData);
  }

  deleteData(id: string): Observable<any[]> {
    return this.http.delete<any[]>(`${API_URL}${id}`);
  }

  uploadImage(newData: FormData): Observable<any[]> {
    return this.http.post<any>(`${API_URL}upload`, newData);
  }
}
