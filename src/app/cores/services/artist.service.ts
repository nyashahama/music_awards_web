import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface Nominee {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  private apiUrl = "https://music-awards-server.onrender.com/api";

  constructor(private http: HttpClient) { }


  listNominees(): Observable<any> {
    return this.http.get(`${this.apiUrl}/nominees`).pipe(
      map((response: any) =>
        response.map((nominee: any) => ({
          id: nominee.nominee_id,
          name: nominee.name,
          description: nominee.description,
          imageUrl: nominee.image_url
        }))
      )
    );
  }

  // Fetch nominee details by ID
  getNomineeDetails(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/nominees/${id}`);
  }
}
