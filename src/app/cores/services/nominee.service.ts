import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NomineeService {


  private readonly apiUrl = "https://music-awards-server.onrender.com/api";

  constructor(private http: HttpClient) { }

  // getNomineesByCategory(categoryId: string): Observable<any>{
  //  return this.http.get(`${this.apiUrl}/categories/${categoryId}/nominees`);
  // }
  //
getNomineesByCategory(categoryId: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/categories/${categoryId}/nominees`).pipe(
    map((response: any) =>
      response.map((nominee: any) => ({
        id: nominee.nominee_id,
        name: nominee.name,
        imageUrl: nominee.image_url
      }))
    )
  )
}

}
