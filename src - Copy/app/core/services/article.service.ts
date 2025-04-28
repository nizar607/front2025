import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalComponent } from 'src/app/global-component';
import { ArticleModel } from '../store/article/article.model';

const API_URL = GlobalComponent.API_URL + '';

@Injectable({ providedIn: 'root' })
export class ArticleService {
  constructor(private http: HttpClient) {}

  /***
   * Get all article
   */
  fetchData(): Observable<ArticleModel[]> {
    return this.http.get<ArticleModel[]>(API_URL);
  }

  addData(newData: ArticleModel): Observable<any> {
    return this.http.post<any>(API_URL, newData);
  }

  updateData(updatedData: ArticleModel): Observable<any> {
    return this.http.put<any>(API_URL, updatedData);
  }

  deleteData(id: string): Observable<any> {
    return this.http.delete<any>(`${API_URL}${id}`);
  }
}
