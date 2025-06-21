import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

 private readonly apiUrl = "https://music-awards-server.onrender.com/api";

  constructor(private http: HttpClient) { }

  castVote(categoryId: string, nomineeId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/votes`, {
      category_id: categoryId,
      nominee_id: nomineeId
    });
  }}
