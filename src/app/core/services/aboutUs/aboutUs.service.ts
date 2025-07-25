import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GlobalComponent} from 'src/app/global-component';
import {AboutUsModel} from "../../../store/AboutUs/aboutUs.model";

const API_URL = GlobalComponent.API_URL + 'about-us';

@Injectable({providedIn: 'root'})
export class AboutUsService {
  constructor(private http: HttpClient) {
  }

  /***
   * Get
   */
  fetchData(): Observable<any> {
    return this.http.get<any>(API_URL);
  }

  addData(newData: FormData): Observable<any> {
    console.log("new aboutus", newData);
    return this.http.post<any>(API_URL, newData);
  }

  updateData(id : number, updatedData: any): Observable<any> {
    return this.http.put<any>(`${API_URL}/${id}`, updatedData);
  }

  deleteData(id: string): Observable<any> {
    return this.http.delete<any>(`${API_URL}/${id}`);
  }
}
