import { Password } from 'primeng/password';
import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '@envs/environment.development';
import { User } from 'models/user.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private isAuthenticated = signal<boolean>(this.checkAuth());
  private readonly url = environment.API_URL;

  constructor( private http: HttpClient ) {}

  checkAuth(): boolean {
    const token = localStorage.getItem('lavaAutosToken');
    return !!token;
  }
  
  login(email:string, password: string): Observable<any> {
    return this.http.post<any>(`${this.url}/login`, {email, password }).pipe(
      tap((res) => {
        if (res.token) {
          localStorage.setItem('lavaAutosToken', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
          this.isAuthenticated.set(true);
        }
      })
    );
  }
  
  logout() {
    localStorage.removeItem('lavaAutosToken');
    this.isAuthenticated.set(false);
  }

  getAuthStatus() {
    return this.isAuthenticated;
  }
}
