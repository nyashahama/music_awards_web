import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';

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

  // Cache variables (shorter cache for vote-related data since it changes frequently)
  private userVotesCache$: Observable<Vote[]> | null = null;
  private availableVotesCache$: Observable<{ available_votes: number }> | null = null;

  constructor(private http: HttpClient) { }

  getUserVotes(): Observable<Vote[]> {
    if (!this.userVotesCache$) {
      this.userVotesCache$ = this.http.get<Vote[]>(`${this.apiUrl}/votes`).pipe(
        shareReplay(1)
      );
    }
    return this.userVotesCache$;
  }

  getAvailableVotes(): Observable<{ available_votes: number }> {
    if (!this.availableVotesCache$) {
      this.availableVotesCache$ = this.http.get<{ available_votes: number }>(`${this.apiUrl}/votes/available`).pipe(
        shareReplay(1)
      );
    }
    return this.availableVotesCache$;
  }

  castVote(categoryId: string, nomineeId: string): Observable<any> {
    this.clearVoteCache(); // Clear cache when voting
    return this.http.post(`${this.apiUrl}/votes`, {
      category_id: categoryId,
      nominee_id: nomineeId
    });
  }

  changeVote(voteId: string, nomineeId: string): Observable<any> {
    this.clearVoteCache(); // Clear cache when changing vote
    return this.http.put(`${this.apiUrl}/votes/${voteId}`, {
      nominee_id: nomineeId
    });
  }

  deleteVote(voteId: string): Observable<any> {
    this.clearVoteCache(); // Clear cache when deleting vote
    return this.http.delete(`${this.apiUrl}/votes/${voteId}`);
  }

  // Clear cache methods for vote-related data
  clearVoteCache(): void {
    this.userVotesCache$ = null;
    this.availableVotesCache$ = null;
  }
}
