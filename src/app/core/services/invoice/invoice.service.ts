import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalComponent } from 'src/app/global-component';

const API_URL = GlobalComponent.API_URL + 'invoice/';

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  constructor(private http: HttpClient) {
  }

  fetchData(): Observable<any[]> {
    return this.http.get<any[]>(API_URL);
  }

  addData(newData: FormData): Observable<any[]> {
    return this.http.post<any>(API_URL, newData);
  }

  updateData(updatedData: FormData): Observable<any[]> {
    return this.http.put<any>(API_URL, updatedData);
  }

  deleteData(id: string): Observable<any[]> {
    return this.http.delete<any[]>(`${API_URL}${id}`);
  }


  getSelectedInvoice(id: string): Observable<any[]> {
    return this.http.get<any>(`${API_URL}${id}`);
  }



  getInvoiceByCaseId(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}case/${id}`);

  }

  addInvoiceServices(invoiceServices: any[]): Observable<any[]> {
    return this.http.post<any[]>(`${API_URL}services`, invoiceServices);
  }


  getAlldata(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}data`);
  }


}
