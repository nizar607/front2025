import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalComponent } from 'src/app/global-component';
import { HomepageModel } from '../../../store/Homepage/homepage.model';

const API_URL = GlobalComponent.API_URL + 'homepage';

@Injectable({ providedIn: 'root' })
export class HomepageService {
  constructor(private http: HttpClient) {
  }

  /***
   * Homepage Data Methods
   */
  fetchData(): Observable<any> {
    return this.http.get<any>(API_URL);
  }

  addData(newData: FormData): Observable<any> {
    console.log('new homepage', newData);
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

  updateFeaturedProduct(id: number, updatedItem: any): Observable<any> {
    return this.http.put<any>(`${API_URL}/featured-products/${id}`, updatedItem);
  }

  deleteFeaturedProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${API_URL}/featured-products/${id}`);
  }

  /***
   * Categories Methods
   */
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/categories`);
  }

  addCategory(newCategory: any): Observable<any> {
    return this.http.post<any>(`${API_URL}/categories`, newCategory);
  }

  updateCategory(id: number, updatedCategory: any): Observable<any> {
    return this.http.put<any>(`${API_URL}/categories/${id}`, updatedCategory);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete<any>(`${API_URL}/categories/${id}`);
  }

  /***
   * Experience Cards Methods
   */
  getExperienceCards(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/experience-cards`);
  }

  addExperienceCard(newCard: any): Observable<any> {
    return this.http.post<any>(`${API_URL}/experience-cards`, newCard);
  }

  updateExperienceCard(id: number, updatedCard: any): Observable<any> {
    return this.http.put<any>(`${API_URL}/experience-cards/${id}`, updatedCard);
  }

  deleteExperienceCard(id: number): Observable<any> {
    return this.http.delete<any>(`${API_URL}/experience-cards/${id}`);
  }

  /***
   * Gallery Products Methods
   */
  getGalleryProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/gallery-products`);
  }

  addGalleryProduct(newProduct: any): Observable<any> {
    return this.http.post<any>(`${API_URL}/gallery-products`, newProduct);
  }

  updateGalleryProduct(id: number, updatedProduct: any): Observable<any> {
    return this.http.put<any>(`${API_URL}/gallery-products/${id}`, updatedProduct);
  }

  deleteGalleryProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${API_URL}/gallery-products/${id}`);
  }

  /***
   * Features Methods
   */
  getFeatures(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/features`);
  }

  addFeature(newFeature: any): Observable<any> {
    return this.http.post<any>(`${API_URL}/features`, newFeature);
  }

  updateFeature(id: number, updatedFeature: any): Observable<any> {
    return this.http.put<any>(`${API_URL}/features/${id}`, updatedFeature);
  }

  deleteFeature(id: number): Observable<any> {
    return this.http.delete<any>(`${API_URL}/features/${id}`);
  }

  /***
   * Products Methods
   */
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/products`);
  }

  addProduct(newProduct: any): Observable<any> {
    return this.http.post<any>(`${API_URL}/products`, newProduct);
  }

  updateProduct(id: number, updatedProduct: any): Observable<any> {
    return this.http.put<any>(`${API_URL}/products/${id}`, updatedProduct);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${API_URL}/products/${id}`);
  }

  /***
   * Statistics Methods
   */
  getStatistics(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/statistics`);
  }

  addStatistic(newStatistic: any): Observable<any> {
    return this.http.post<any>(`${API_URL}/statistics`, newStatistic);
  }

  updateStatistic(id: number, updatedStatistic: any): Observable<any> {
    return this.http.put<any>(`${API_URL}/statistics/${id}`, updatedStatistic);
  }

  deleteStatistic(id: number): Observable<any> {
    return this.http.delete<any>(`${API_URL}/statistics/${id}`);
  }
}