import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';

export interface Nominee {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  private apiUrl = 'https://music-awards-server.onrender.com/api';

  // Cache variables
  private nomineesCache$: Observable<any> | null = null;
  private nomineeDetailsCache = new Map<string, Observable<any>>();

  constructor(private http: HttpClient) {}

  listNominees(): Observable<any> {
    if (!this.nomineesCache$) {
      this.nomineesCache$ = this.http.get(`${this.apiUrl}/nominees`).pipe(
        map((response: any) =>
          response.map((nominee: any) => ({
            id: nominee.nominee_id,
            name: nominee.name,
            description: nominee.description,
            imageUrl: nominee.image_url,
          })),
        ),
        shareReplay(1)
      );
    }
    return this.nomineesCache$;
  }

  // Fetch nominee details by ID
  getNomineeDetails(id: string): Observable<any> {
    if (!this.nomineeDetailsCache.has(id)) {
      const nominee$ = this.http.get(`${this.apiUrl}/nominees/${id}`).pipe(
        shareReplay(1)
      );
      this.nomineeDetailsCache.set(id, nominee$);
    }
    return this.nomineeDetailsCache.get(id)!;
  }

  // Clear cache methods
  clearNomineesCache(): void {
    this.nomineesCache$ = null;
  }

  clearNomineeDetailsCache(id: string): void {
    this.nomineeDetailsCache.delete(id);
  }

  clearAllCache(): void {
    this.nomineesCache$ = null;
    this.nomineeDetailsCache.clear();
  }
}
