import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalComponent } from 'src/app/global-component';


const API_URL = GlobalComponent.API_URL + 'homepage1';

@Injectable({ providedIn: 'root' })
export class Homepage1Service {
  constructor(private http: HttpClient) {
  }

  /***
   * Homepage1 Data Methods
   */
  fetchData(): Observable<any> {
    return this.http.get<any>(API_URL);
  }

  addData(newData: FormData): Observable<any> {
    console.log('new homepage1', newData);
    return this.http.post<any>(API_URL, newData);
  }

  updateData(id: number, updatedData: any): Observable<any> {
    return this.http.put<any>(`${API_URL}/content/${id}`, updatedData);
  }

  updateImages(id: number, imageData: FormData): Observable<any> {
    return this.http.put<any>(`${API_URL}/${id}/images`, imageData);
  }

  uploadImage(imageData: FormData): Observable<any> {
    return this.http.post<any>(`${API_URL}/upload`, imageData);
  }

  deleteData(id: string): Observable<any> {
    return this.http.delete<any>(`${API_URL}/${id}`);
  }

  /***
   * Featured Products Methods
   */
  getFeaturedProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/featured-products`);
  }

  addFeaturedProduct(newItem: any): Observable<any> {
    return this.http.post<any>(`${API_URL}/featured-products`, newItem);
  }

  updateFeaturedProduct(id: string, updatedItem: any): Observable<any> {
    return this.http.put<any>(`${API_URL}/featured-products/${id}`, updatedItem);
  }

  deleteFeaturedProduct(id: string): Observable<any> {
    return this.http.delete<any>(`${API_URL}/featured-products/${id}`);
  }

  /***
   * Categories Methods
   */
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/categories`);
  }

  addCategory(newItem: any): Observable<any> {
    return this.http.post<any>(`${API_URL}/categories`, newItem);
  }

  updateCategory(id: string, updatedItem: any): Observable<any> {
    return this.http.put<any>(`${API_URL}/categories/${id}`, updatedItem);
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete<any>(`${API_URL}/categories/${id}`);
  }

  /***
   * Experience Cards Methods
   */
  getExperienceCards(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/experience-cards`);
  }

  addExperienceCard(newItem: any): Observable<any> {
    return this.http.post<any>(`${API_URL}/experience-cards`, newItem);
  }

  updateExperienceCard(id: string, updatedItem: any): Observable<any> {
    return this.http.put<any>(`${API_URL}/experience-cards/${id}`, updatedItem);
  }

  deleteExperienceCard(id: string): Observable<any> {
    return this.http.delete<any>(`${API_URL}/experience-cards/${id}`);
  }

  /***
   * Gallery Products Methods
   */
  getGalleryProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/gallery-products`);
  }

  addGalleryProduct(newItem: any): Observable<any> {
    return this.http.post<any>(`${API_URL}/gallery-products`, newItem);
  }

  updateGalleryProduct(id: string, updatedItem: any): Observable<any> {
    return this.http.put<any>(`${API_URL}/gallery-products/${id}`, updatedItem);
  }

  deleteGalleryProduct(id: string): Observable<any> {
    return this.http.delete<any>(`${API_URL}/gallery-products/${id}`);
  }

  /***
   * Features Methods
   */
  getFeatures(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/features`);
  }

  addFeature(newItem: any): Observable<any> {
    return this.http.post<any>(`${API_URL}/features`, newItem);
  }

  updateFeature(id: string, updatedItem: any): Observable<any> {
    return this.http.put<any>(`${API_URL}/features/${id}`, updatedItem);
  }

  deleteFeature(id: string): Observable<any> {
    return this.http.delete<any>(`${API_URL}/features/${id}`);
  }

  /***
   * Products Methods
   */
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/products`);
  }

  addProduct(newItem: any): Observable<any> {
    return this.http.post<any>(`${API_URL}/products`, newItem);
  }

  updateProduct(id: string, updatedItem: any): Observable<any> {
    return this.http.put<any>(`${API_URL}/products/${id}`, updatedItem);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete<any>(`${API_URL}/products/${id}`);
  }

  /***
   * Statistics Methods
   */
  getStatistics(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/statistics`);
  }

  addStatistic(newItem: any): Observable<any> {
    return this.http.post<any>(`${API_URL}/statistics`, newItem);
  }

  updateStatistic(id: string, updatedItem: any): Observable<any> {
    return this.http.put<any>(`${API_URL}/statistics/${id}`, updatedItem);
  }

  deleteStatistic(id: string): Observable<any> {
    return this.http.delete<any>(`${API_URL}/statistics/${id}`);
  }
}