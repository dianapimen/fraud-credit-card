import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FraudService {
  // Tu API de Render activa
  private apiUrl = 'https://fraud-detection-ml-version-100.onrender.com/predict';

  constructor(private http: HttpClient) { }

  predecirFraude(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}