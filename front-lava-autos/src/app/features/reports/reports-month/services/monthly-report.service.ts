import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@envs/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonthlyReportService {

  #http = inject(HttpClient);

  url = environment.API_URL;

  get(date: any): Observable<any[]>{
    return this.#http.post<any[]>(`${this.url}/reports/monthly`, date);
  }
}
