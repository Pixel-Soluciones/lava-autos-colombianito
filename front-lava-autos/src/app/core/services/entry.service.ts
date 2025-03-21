import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@envs/environment.development';
import { IEntry } from 'app/shared/interfaces/entry';
import { IServicio } from 'app/shared/interfaces/servicio';
import { IVehicle } from 'app/shared/interfaces/vehicle';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  
private readonly url = environment.API_URL

  constructor(
    private http: HttpClient
  ) {}

  private entrySelected : IEntry | null = null;

  setEntry(entry: IEntry | null): void {
    this.entrySelected = entry;   
  }

  getEntrySelected(){
    return this.entrySelected;
  }

  saveEntry(vehicle: IVehicle, services: IServicio[]): Observable<any> {      
        const response = this.http.post<any>(`${this.url}/vehicle-entry/create`, {vehicle, services});
        return response;
      }

  editEntry(vehicle: IVehicle, services: IServicio[], id :number): Observable<any> {      
    const response = this.http.post<any>(`${this.url}/vehicle-entry/update/${id}`, {vehicle, services});
    return response;
  }

  registerCheckout(entry: IEntry): Observable<any> {      
    const response = this.http.post<any>(`${this.url}/vehicle-entry/checkout`, {entry});
    return response;
  }

  cancelEntry(id_ingreso: number): Observable<any> {      
    const response = this.http.delete<any>(`${this.url}/vehicle-entry/cancel/${id_ingreso}`);
    return response;
  }
  
  getAll(): Observable<IEntry[]> {
      return this.http.get<IEntry[]>(`${this.url}/vehicle-entry`);
    }
  
}
