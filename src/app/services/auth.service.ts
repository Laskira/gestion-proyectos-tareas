import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authKey = 'authToken';
  
  constructor(private router: Router) {}

  login(email: string, password: string): Observable<boolean> {
    if (email === 'prueba@gmail.com' && password === '12345678') {
      const token = 'fake-jwt-token';
      localStorage.setItem(this.authKey, token);
      return of(true);
    }
    return of(false);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.authKey);
  }

  logout() {
    localStorage.removeItem(this.authKey);
    this.router.navigate(['/login']);
  }
}
