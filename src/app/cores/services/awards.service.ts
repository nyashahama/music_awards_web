import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AwardsService {
  private readonly apiUrl = 'https://music-awards-api.onrender.com/api';

  constructor(private http: HttpClient) {}

  listCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories`).pipe(
      map((response: any) =>
        response.map((category: any) => ({
          name: category.Name || category.name,
          description: category.Description || category.description,
        }))
      )
    );
  }

  listActivecategories(active: boolean): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories/${active}`);
  }

  getCategories(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories/${id}`);
  }

  createCategory(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/categories`, data);
  }

  updateCategory(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/categories/${id}`, {});
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/categories/${id}`);
  }
}
