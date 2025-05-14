import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterPayload } from '../models/Register.payload';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'https://music-awards-api.onrender.com/api';

  constructor(private http: HttpClient) {}

  register(payload: RegisterPayload): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, payload);
  }
}
