import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = signal<boolean>(this.checkAuth());

  constructor() { }

  checkAuth(): boolean {
    const token = localStorage.getItem('lavaAutosToken');
    return !!token;
  }

  login(token: string) {
    localStorage.setItem('lavaAutosToken', token);
    this.isAuthenticated.set(true);
  }

  logout() {
    localStorage.removeItem('lavaAutosToken');
    this.isAuthenticated.set(false);
  }

  getAuthStatus() {
    return this.isAuthenticated;
  }
}
