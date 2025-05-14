import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterPayload } from '../models/Register.payload';
import { Observable } from 'rxjs';
import { LoginPayload } from '../models/Login.payload';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'https://music-awards-api.onrender.com/api';

  constructor(private http: HttpClient) {}

  register(payload: RegisterPayload): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, payload);
  }

  login(payload: LoginPayload): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, payload);
  }
}
