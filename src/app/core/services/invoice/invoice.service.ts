import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GlobalComponent} from 'src/app/global-component';
import {InvoiceModel} from "../../../store/Invoice/invoice.model";

const API_URL = GlobalComponent.API_URL + 'invoices';

@Injectable({providedIn: 'root'})
export class InvoiceService {
  constructor(private http: HttpClient) {
  }

  /***
   * Get
   */
  fetchData(): Observable<any[]> {
    return this.http.get<any[]>(API_URL);
  }

  fetchDataById(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/${id}`);
  }

  addData(newData: FormData): Observable<any[]> {
    console.log("new invoice", newData);
    return this.http.post<any>(API_URL, newData);
  }

  updateData(id : number, updatedData: any): Observable<any[]> {
    return this.http.put<any[]>(`${API_URL}/${id}`, updatedData);
}

  deleteData(id: string): Observable<any[]> {
    return this.http.delete<any[]>(`${API_URL}/${id}`);
  }
}
