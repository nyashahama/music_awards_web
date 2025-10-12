// vote.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Update the Vote interface to match the actual API response
export interface Vote {
  vote_id: string;
  category: {
    id: string;
    name: string;
  };
  nominee: {
    id: string;
    name: string;
  };
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  private readonly apiUrl = 'https://music-awards-server.onrender.com/api';

  constructor(private http: HttpClient) { }

  getUserVotes(): Observable<Vote[]> {
    return this.http.get<Vote[]>(`${this.apiUrl}/votes`);
  }

  getAvailableVotes(): Observable<{ available_votes: number }> {
    return this.http.get<{ available_votes: number }>(`${this.apiUrl}/votes/available`);
  }

  castVote(nomineeId: string, categoryId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/votes`, {
      nominee_id: nomineeId,
      category_id: categoryId
    });
  }

  changeVote(voteId: string, nomineeId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/votes/${voteId}`, {
      nominee_id: nomineeId
    });
  }

  deleteVote(voteId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/votes/${voteId}`);
  }
}
