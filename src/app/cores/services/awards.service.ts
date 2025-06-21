import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AwardsService {
  private readonly apiUrl = "https://music-awards-server.onrender.com/api";

  constructor(private http: HttpClient) {}

  listCategories(): Observable<any> {
  return this.http.get(`${this.apiUrl}/categories`).pipe(
    map((response: any) =>
      response.map((category: any) => ({
        id: category.category_id || category.id, // Add ID mapping
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

  getCategory(id: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/categories/${id}`).pipe(
    map((category: any) => ({
      id: category.CategoryID || category.id,
      name: category.Name || category.name,
      description: category.Description || category.description
    }))
  );
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
