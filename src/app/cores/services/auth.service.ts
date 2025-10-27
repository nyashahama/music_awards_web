import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterPayload } from '../../models/Register.payload';
import { BehaviorSubject, Observable, shareReplay, tap } from 'rxjs';
import { LoginPayload } from '../../models/Login.payload';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'https://music-awards-server.onrender.com/api';

  private readonly TOKEN_KEY = 'jwt_token';
  private currentUserSubject = new BehaviorSubject<string | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  // Cache for user profiles (cache by user ID)
  private userProfileCache = new Map<string, Observable<any>>();
  private allUsersCache$: Observable<any> | null = null;

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
          localStorage.setItem(this.TOKEN_KEY, response.token);
          this.currentUserSubject.next(this.getCurrentUser());
          this.clearUserCache(); // Clear cache on login
        }),
      );
  }

  getCurrentProfile(): Observable<any> {
    const currentUser = this.getCurrentUser();
    if (currentUser && !this.userProfileCache.has('current')) {
      const profile$ = this.http.get(`${this.apiUrl}/profile`).pipe(
        shareReplay(1)
      );
      this.userProfileCache.set('current', profile$);
    }
    return this.userProfileCache.get('current')!;
  }

  getUserProfile(id: string): Observable<any> {
    if (!this.userProfileCache.has(id)) {
      const profile$ = this.http.get(`${this.apiUrl}/profile/${id}`).pipe(
        shareReplay(1)
      );
      this.userProfileCache.set(id, profile$);
    }
    return this.userProfileCache.get(id)!;
  }

  listAllUsers(): Observable<any> {
    if (!this.allUsersCache$) {
      this.allUsersCache$ = this.http.get(`${this.apiUrl}/profile/users`).pipe(
        shareReplay(1)
      );
    }
    return this.allUsersCache$;
  }

  updateUserProfile(id: string, data: any): Observable<any> {
    this.clearUserCache();
    this.userProfileCache.delete(id);
    return this.http.put(`${this.apiUrl}/profile/${id}`, data);
  }

  deleteUserProfile(id: string): Observable<any> {
    this.clearUserCache();
    this.userProfileCache.delete(id);
    return this.http.delete(`${this.apiUrl}/profile/${id}`);
  }

  promoteUser(id: string): Observable<any> {
    this.clearUserCache();
    this.userProfileCache.delete(id);
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
    this.clearUserCache();
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

  // Clear cache methods
  clearUserCache(): void {
    this.userProfileCache.clear();
    this.allUsersCache$ = null;
  }

  clearUserProfileCache(id: string): void {
    this.userProfileCache.delete(id);
  }
}
