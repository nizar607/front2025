import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalComponent } from 'src/app/global-component';
import { FavoriteModel } from "../../../store/Favorite/favorite.model";

const API_URL = GlobalComponent.API_URL + 'favorite';

@Injectable({ providedIn: 'root' })
export class FavoriteService {
  constructor(private http: HttpClient) {
  }

  /***
   * Get
   */
  fetchData(): Observable<any[]> {
    return this.http.get<any[]>(API_URL);
  }

  fetchDataByUser(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/user/articles`);
  }

  fetchIsFavorite(articleId: number): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/is-favorite/${articleId}`);
  }

  addData(newData: { articleId: number }): Observable<any[]> {
    console.log("new favorite", newData);
    return this.http.post<any>(API_URL, newData);
  }

  updateData(id: number, updatedData: any): Observable<any[]> {
    return this.http.put<any[]>(`${API_URL}/${id}`, updatedData);
  }


  deleteFavotiteByArticleData(id: string): Observable<any[]> {
    return this.http.delete<any[]>(`${API_URL}/article/${id}`);
  }
}
