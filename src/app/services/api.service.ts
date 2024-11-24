import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiKey = 'wFIMP75eG1sQEh8vVAdXykgzF4mLhDw3';

  constructor(private http: HttpClient) {}

  // searchMedicines(query: string): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/medicines`, {
  //     headers: { 'API-Key': 'wFIMP75eG1sQEh8vVAdXykgzF4mLhDw3' },
  //     params: { query },
  //   });
  // }

  // placeOrder(orderData: any): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/orders`, orderData, {
  //     headers: { 'API-Key': 'wFIMP75eG1sQEh8vVAdXykgzF4mLhDw3' },
  //   });
  // }

  post(URL: string, data: any): Observable<any> {
    const apiUrl = environment.API_END_POINT + URL;
    const payload = { apikey: this.apiKey, ...data };
    return this.http.post(apiUrl, payload);
  }
}
