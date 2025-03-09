import { Vehicle } from './../../shared/models/vehicle';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@envs/environment.development';
import { IVehicle } from 'app/shared/interfaces/vehicle';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
  
  private readonly url = environment.API_URL

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<IVehicle[]> {
      return this.http.get<IVehicle[]>(`${this.url}/vehicles`);
    }

  saveVehicle(vehicle: IVehicle): Observable<any> {      
      const response = this.http.post<any>(`${this.url}/vehicles/create`, vehicle);
      return response;
    }
}
