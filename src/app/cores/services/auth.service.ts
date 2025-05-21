import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterPayload } from '../../models/Register.payload';
import { Observable,tap } from 'rxjs';
import { LoginPayload } from '../../models/Login.payload';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'https://music-awards-api.onrender.com/api';

  private readonly TOKEN_KEY = "jwt_token";

  constructor(private http: HttpClient) {}

  register(payload: RegisterPayload): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, payload);
  }

 login(payload: LoginPayload): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/login`, payload)
      .pipe(
        tap(response => {
          // save to localStorage (or sessionStorage)
          localStorage.setItem(this.TOKEN_KEY, response.token);
        })
      );
  }

  //Retrieve the JWT from localStorage
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // to check if loggedIn?
  ifLoggedIn(): boolean {
    return  !!this.getToken();
  }

  //logout
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY)
  }

}
