import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalComponent } from 'src/app/global-component';
import { CompanyModel } from "../../../store/Company/company.model";

const API_URL = GlobalComponent.API_URL + 'companies';

@Injectable({ providedIn: 'root' })
export class CompanyService {
  constructor(private http: HttpClient) {
  }

  /***
   * Get
   */
  fetchData(): Observable<any[]> {
    return this.http.get<any[]>(API_URL);
  }

  addData(newData: FormData): Observable<any[]> {
    console.log("new company", newData);
    return this.http.post<any>(API_URL, newData);
  }

  updateData(id: number, updatedData: any): Observable<any[]> {
    return this.http.put<any[]>(`${API_URL}/${id}`, updatedData);
  }

  updateCompanyLogo(id: number, file: FormData): Observable<any[]> {
    return this.http.put<any[]>(`${API_URL}/update-logo/${id}`, file);
  }

  deleteData(id: string): Observable<any[]> {
    return this.http.delete<any[]>(`${API_URL}/${id}`);
  }
}
