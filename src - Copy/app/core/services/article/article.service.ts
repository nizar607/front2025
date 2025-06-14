import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalComponent } from 'src/app/global-component';
import { ArticleModel } from "../../../store/Article/article.model";

const API_URL = GlobalComponent.API_URL + 'article';

@Injectable({ providedIn: 'root' })
export class ArticleService {
  constructor(private http: HttpClient) {
  }

  /***
   * Get
   */
  fetchData(): Observable<any[]> {
    return this.http.get<any[]>(API_URL);
  }

  search(searchInput: string, minPrice: number, maxPrice: number,categories:number[]): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/search?searchValue=${searchInput}&minPrice=${minPrice}&maxPrice=${maxPrice}&categories=${categories}`);
  }

  addData(newData: FormData): Observable<any[]> {
    console.log("new article", newData);
    return this.http.post<any>(API_URL, newData);
  }

  updateData(id: number, updatedData: any): Observable<any[]> {
    return this.http.put<any[]>(`${API_URL}/${id}`, updatedData);
  }

  deleteData(id: string): Observable<any[]> {
    return this.http.delete<any[]>(`${API_URL}/${id}`);
  }
}
