import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GlobalComponent} from 'src/app/global-component';

const API_URL = GlobalComponent.API_URL + 'task/';

@Injectable({providedIn: 'root'})
export class TaskService {
  constructor(private http: HttpClient) {
  }

  /***
   * Get
   ***/
  fetchData(): Observable<any[]> {
    return this.http.get<any[]>(API_URL);
  }

  fetchSelectedData(id:string): Observable<any[]> {
    return this.http.get<any>(`${API_URL}${id}`);
  }

  getTasksByUserId(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}user/${id}`);
  }
  
  getTasksByCaseId(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}case/${id}`);
  }

  getTaskByUserIdAndDueDatePassed(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}dueDate/passed`);
  }

  getTaskByUserIdAndDueDateNotPassed(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}dueDate/notPassed`);
  }

  addData(newData: FormData): Observable<any[]> {
    return this.http.post<any>(API_URL, newData);
  }

  updateData(updatedData: FormData): Observable<any[]> {
    return this.http.put<any>(API_URL, updatedData);
  }

  deleteData(id:string): Observable<any[]> {
    return this.http.delete<any[]>(`${API_URL}${id}`);
  }

  updateTaskStatus(id: string): Observable<any> {
    return this.http.put<any>(`${API_URL}update-status/${id}`, null);
  }


}
