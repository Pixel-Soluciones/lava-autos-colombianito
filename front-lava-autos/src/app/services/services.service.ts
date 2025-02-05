import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@envs/environment.development';
import { Servicio } from 'models/servicio.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private readonly url = environment.API_URL

  constructor(
    private http: HttpClient
  ) {}

  getAllServices(): Observable <Servicio>{
    return this.http.get<Servicio>(`${this.url}/loadServices`).pipe(
      map((response: Servicio) => {
        return response;
      })
    );
  }

  saveService(servicio: Servicio): Observable<any> {      
    const response = this.http.post<any>(`${this.url}/saveService`, servicio);
    return response;
  }
}
