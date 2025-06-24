import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NomineeService {
  private readonly apiUrl = 'https://music-awards-server.onrender.com/api';

  constructor(private http: HttpClient) {}

  // Added method to get all nominees
  getAllNominees(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/nominees`).pipe(
      map((response) => {
        // Filter unique artists by name
        const uniqueArtists = new Map<string, any>();
        response.forEach(artist => {
          if (!uniqueArtists.has(artist.name)) {
            uniqueArtists.set(artist.name, {
              ...artist,
              imageUrl: artist.image_url,
              id: artist.nominee_id
            });
          }
        });
        return Array.from(uniqueArtists.values());
      })
    );
  }

  getNomineesByCategory(categoryId: string): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/categories/${categoryId}/nominees`)
      .pipe(
        map((response: any) =>
          response.map((nominee: any) => ({
            id: nominee.nominee_id,
            name: nominee.name,
            imageUrl: nominee.image_url, // Fixed property name
          })),
        ),
      );
  }

  getNomineeDetails(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/nominees/${id}`).pipe(
      map((response: any) => ({
        ...response,
        imageUrl: response.image_url, // Map to expected property
        // Transform categories to nominations
        nominations: response.categories?.map((cat: any) => ({
          id: cat.category_id,
          category: cat.name,
          song: response.sample_works?.[0] || 'Unknown Track',
          categoryId: cat.category_id
        })) || []
      }))
    );
  }
}
