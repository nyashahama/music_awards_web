import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterPayload } from '../../models/Register.payload';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginPayload } from '../../models/Login.payload';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'https://music-awards-server.onrender.com/api';

  private readonly TOKEN_KEY = 'jwt_token';
  private currentUserSubject = new BehaviorSubject<string | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const token = this.getToken();
    console.log('Initial token:', token);
    if (token) {
      const user = this.getCurrentUser();
      console.log('Initial user:', user);
      this.currentUserSubject.next(user);
    }
  }

  register(payload: RegisterPayload): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, payload);
  }

  login(payload: LoginPayload): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/login`, payload)
      .pipe(
        tap((response) => {
          // save to localStorage (or sessionStorage)
          localStorage.setItem(this.TOKEN_KEY, response.token);
          this.currentUserSubject.next(this.getCurrentUser());
        }),
      );
  }

  getCurrentProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`);
  }

  getUserProfile(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile/${id}`);
  }

  listAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile/users`);
  }

  updateUserProfile(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile/${id}`, data);
  }

  deleteUserProfile(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/profile/${id}`);
  }

  promoteUser(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile/${id}`, {});
  }

  //Retrieve the JWT from localStorage
  getToken(): string | null {
    try {
      return localStorage.getItem(this.TOKEN_KEY);
    } catch {
      return null;
    }
  }

  // to check if loggedIn?
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  //logout
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): string | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.username;
    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }
  }
}
