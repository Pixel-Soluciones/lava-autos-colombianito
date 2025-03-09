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
  
  getAll(): Observable<IEntry[]> {
      return this.http.get<IEntry[]>(`${this.url}/vehicle-entry`);
    }
  
}
