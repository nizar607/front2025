import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalComponent } from 'src/app/global-component';
import { ReviewModel } from "../../../store/Review/review.model";

const API_URL = GlobalComponent.API_URL + 'review';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  constructor(private http: HttpClient) {
  }

  /***
   * Get
   */
  fetchData(): Observable<any[]> {
    return this.http.get<any[]>(API_URL);
  }

  fetchDataByArticle(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/article/${id}`);
  }

  addData(newData: FormData): Observable<any[]> {
    console.log("new review", newData);
    return this.http.post<any>(API_URL, newData);
  }

  updateData(id: number, updatedData: any): Observable<any[]> {
    return this.http.put<any[]>(`${API_URL}/${id}`, updatedData);
  }

  deleteData(id: number): Observable<any[]> {
    return this.http.delete<any[]>(`${API_URL}/${id}`);
  }
}
