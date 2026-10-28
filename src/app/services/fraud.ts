import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FraudService {
  // URL base de tu backend en Render (SIN /predict al final)
  private apiUrl = 'https://fraud-detection-ml-version-100.onrender.com';

  constructor(private http: HttpClient) { }

  // Método para la predicción de fraude
  predecirFraude(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/predict`, data);
  }

  // (Opcional) Método por si implementas el reentrenamiento desde la interfaz
  reentrenarModelo(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/retrain`, {});
  }
}