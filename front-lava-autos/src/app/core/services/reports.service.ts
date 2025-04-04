import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@envs/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  private readonly url = environment.API_URL;

  constructor(private http: HttpClient) {}

  getDayReport(fecha: Date): Observable<any[]> {
    console.log(fecha);

    // Convertimos la fecha a un formato adecuado
    const formattedDate = fecha.toISOString().split('T')[0]; // Formato 'YYYY-MM-DD'

    // Enviamos la fecha en el body
    return this.http.post<any[]>(`${this.url}/reports/daily`, {
      fecha: formattedDate,
    });
  }
}
