// shared.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  // Observable source
  private methodCallSource = new Subject<any>();
  
  // Observable stream
  methodCalled$ = this.methodCallSource.asObservable();
  
  // Method to call from child component
  disableScroll(data?: boolean) {
    this.methodCallSource.next(data);
  }


}