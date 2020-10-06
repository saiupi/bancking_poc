import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  baseUrl = 'http://localhost:3000/transactions';
  
  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(this.baseUrl);
  }

  postCreditTransaction(amount) {
    return this.http.post(this.baseUrl, amount);

  }
  postDebitTransaction(amount) {
    return this.http.post(this.baseUrl, amount);

  }

  getCreditedData(debitOrCredit) {
    return this.http.get(this.baseUrl + debitOrCredit);

  }
}
