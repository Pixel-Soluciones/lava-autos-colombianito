import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@envs/environment';
import { IEmployee } from 'app/shared/interfaces/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private readonly url = environment.API_URL

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(`${this.url}/employees`);
  }

  delete(cedula: number): Observable<any> {
    return this.http.delete(`${this.url}/employees/delete/${cedula}`);
  }

  save(employee: IEmployee): Observable<any> {
    return this.http.post(`${this.url}/employees/create`, employee);
  }

  update(employee: IEmployee): Observable<any> {
    return this.http.put(`${this.url}/employees/update/${employee.cedula}`, employee);
  }
}
