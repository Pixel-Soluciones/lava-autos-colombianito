import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@envs/environment.development';
import { Servicio } from 'models/servicio.model';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private readonly url = environment.API_URL

  constructor(
    private http: HttpClient
  ) {}

  private idServicioSource : number | null = null;

  setIdServicio(id_servicio: number | null): void {
    this.idServicioSource = id_servicio;   
  }

  getIdServicio(){
    return this.idServicioSource;
  }

  getAllServices(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${this.url}/services`);
  }

  getOneService(id_servicio: number): Observable<Servicio> {
    return this.http.get<Servicio>(`${this.url}/services/get/${id_servicio}`).pipe(
      map((response: Servicio) => {
        return response;
      })
    );
  }

  saveService(servicio: Servicio): Observable<any> {      
    const response = this.http.post<any>(`${this.url}/services/create`, servicio);
    return response;
  }

  updateService(servicio: Servicio, id_servicio: number): Observable<any> {
    const response = this.http.put<any>(
      `${this.url}/services/update/${id_servicio}`, servicio );
    return response;
  }

  deletService(id_servicio: number): Observable<any> {
    return this.http.delete<any>(
      `${this.url}/services/delete/${id_servicio}`
    );
  }
  
}
