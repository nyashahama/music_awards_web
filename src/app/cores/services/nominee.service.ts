import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NomineeService {
  private readonly apiUrl = 'https://music-awards-server.onrender.com/api';

  // Cache variables
  private allNomineesCache$: Observable<any[]> | null = null;
  private nomineesByCategoryCache = new Map<string, Observable<any>>();
  private nomineeDetailsCache = new Map<string, Observable<any>>();

  constructor(private http: HttpClient) {}

  getAllNominees(): Observable<any[]> {
    if (!this.allNomineesCache$) {
      this.allNomineesCache$ = this.http.get<any[]>(`${this.apiUrl}/nominees`).pipe(
        map((response) => {
          const uniqueArtists = new Map<string, any>();
          response.forEach((artist) => {
            if (!uniqueArtists.has(artist.name)) {
              uniqueArtists.set(artist.name, {
                ...artist,
                imageUrl: artist.image_url,
                id: artist.nominee_id,
              });
            }
          });
          return Array.from(uniqueArtists.values());
        }),
        shareReplay(1)
      );
    }
    return this.allNomineesCache$;
  }

  getNomineesByCategory(categoryId: string): Observable<any> {
    if (!this.nomineesByCategoryCache.has(categoryId)) {
      const nominees$ = this.http
        .get(`${this.apiUrl}/categories/${categoryId}/nominees`)
        .pipe(
          map((response: any) =>
            response.map((nominee: any) => ({
              id: nominee.nominee_id,
              name: nominee.name,
              imageUrl: nominee.image_url,
            })),
          ),
          shareReplay(1)
        );
      this.nomineesByCategoryCache.set(categoryId, nominees$);
    }
    return this.nomineesByCategoryCache.get(categoryId)!;
  }

  getNomineeDetails(id: string): Observable<any> {
    if (!this.nomineeDetailsCache.has(id)) {
      const nominee$ = this.http.get(`${this.apiUrl}/nominees/${id}`).pipe(
        map((response: any) => ({
          ...response,
          imageUrl: response.image_url,
          nominations:
            response.categories?.map((cat: any) => ({
              id: cat.category_id,
              category: cat.name,
              song: response.sample_works?.[0] || 'Unknown Track',
              categoryId: cat.category_id,
            })) || [],
        })),
        shareReplay(1)
      );
      this.nomineeDetailsCache.set(id, nominee$);
    }
    return this.nomineeDetailsCache.get(id)!;
  }

  // Clear cache methods
  clearAllNomineesCache(): void {
    this.allNomineesCache$ = null;
  }

  clearNomineesByCategoryCache(categoryId: string): void {
    this.nomineesByCategoryCache.delete(categoryId);
  }

  clearNomineeDetailsCache(id: string): void {
    this.nomineeDetailsCache.delete(id);
  }

  clearAllCache(): void {
    this.allNomineesCache$ = null;
    this.nomineesByCategoryCache.clear();
    this.nomineeDetailsCache.clear();
  }
}
